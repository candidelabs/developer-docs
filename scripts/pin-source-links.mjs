#!/usr/bin/env node
// One-off: rewrite #L<n> anchors on abstractionkit/blob/v0.3.2 links to point
// to the correct line of each symbol as it exists in the pinned tag.
//
// Strategy:
//   1. Grep MDX files for links matching `[<symbol>](…abstractionkit/blob/v0.3.2/<path>#L<n>)`.
//   2. For each unique <path>, fetch the file at v0.3.2 and parse with the TS
//      compiler. Record line numbers for every MethodDeclaration,
//      FunctionDeclaration, and ConstructorDeclaration, keyed by symbol name.
//      Inside a file, a name may resolve to multiple lines — record them all.
//   3. For each link, pick the correct line:
//      - If the symbol has exactly one definition in the file, use it.
//      - If it has multiple, prefer the one closest to the old line number.
//   4. Print a report (old → new per link) and rewrite the MDX files.
//
// After running, manually eyeball the report before committing.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync, execFileSync } from "node:child_process";
import ts from "typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const TAG = "v0.3.2";
const CACHE = join(repoRoot, ".cache-abstractionkit-v0.3.2");

mkdirSync(CACHE, { recursive: true });

function fetchSource(path) {
	const cachePath = join(CACHE, path.replaceAll("/", "__"));
	if (existsSync(cachePath)) return readFileSync(cachePath, "utf8");
	const raw = execFileSync(
		"gh",
		["api", `repos/candidelabs/abstractionkit/contents/${path}?ref=${TAG}`, "--jq", ".content"],
		{ encoding: "utf8" },
	);
	const decoded = Buffer.from(raw.trim(), "base64").toString("utf8");
	writeFileSync(cachePath, decoded);
	return decoded;
}

function collectSymbolLines(source) {
	// name -> sorted array of 1-based line numbers
	const map = new Map();
	const sf = ts.createSourceFile("x.ts", source, ts.ScriptTarget.Latest, true);

	const record = (name, node) => {
		if (!name) return;
		const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
		const arr = map.get(name) ?? [];
		arr.push(line + 1);
		map.set(name, arr);
	};

	const visit = (node) => {
		if (ts.isMethodDeclaration(node) && node.name) {
			record(node.name.getText(sf), node);
		} else if (ts.isFunctionDeclaration(node) && node.name) {
			record(node.name.getText(sf), node);
		} else if (ts.isConstructorDeclaration(node)) {
			record("constructor", node);
		} else if (ts.isPropertyDeclaration(node) && node.name && node.initializer &&
			(ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))) {
			record(node.name.getText(sf), node);
		} else if (ts.isVariableStatement(node)) {
			for (const decl of node.declarationList.declarations) {
				if (decl.initializer &&
					(ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))) {
					record(decl.name.getText(sf), decl);
				}
			}
		}
		ts.forEachChild(node, visit);
	};
	visit(sf);
	for (const arr of map.values()) arr.sort((a, b) => a - b);
	return map;
}

const LINK_RE =
	/\[([A-Za-z_][\w]*)\]\((https:\/\/github\.com\/candidelabs\/abstractionkit\/blob\/v0\.3\.2\/([^)#\s"]+))#L(\d+)\)/g;

let mdxFiles;
try {
	mdxFiles = execSync(
		`grep -rl "abstractionkit/blob/v0.3.2" --include="*.mdx" --include="*.md" docs/`,
		{ encoding: "utf8", cwd: repoRoot },
	).trim().split("\n").filter(Boolean);
} catch (err) {
	if (err.status === 1) mdxFiles = []; // no matches — release bump no-op
	else throw err;
}

// Pass 1: collect all referenced (path, symbol, oldLine)
const symbolMapByPath = new Map();
const report = []; // {file, symbol, path, oldLine, newLine, note}

for (const rel of mdxFiles) {
	const full = join(repoRoot, rel);
	const text = readFileSync(full, "utf8");
	for (const m of text.matchAll(LINK_RE)) {
		const [, symbol, , path, oldLineStr] = m;
		if (!symbolMapByPath.has(path)) {
			const source = fetchSource(path);
			symbolMapByPath.set(path, collectSymbolLines(source));
		}
	}
}

// Pass 2: rewrite
for (const rel of mdxFiles) {
	const full = join(repoRoot, rel);
	const text = readFileSync(full, "utf8");
	const updated = text.replace(LINK_RE, (match, symbol, urlBase, path, oldLineStr) => {
		const oldLine = Number(oldLineStr);
		const candidates = symbolMapByPath.get(path)?.get(symbol);
		if (!candidates || candidates.length === 0) {
			report.push({ file: rel, symbol, path, oldLine, newLine: null, note: "NOT FOUND" });
			return match;
		}
		let newLine, note;
		if (candidates.length === 1) {
			[newLine] = candidates;
			note = "unique";
		} else {
			newLine = candidates.reduce((best, c) =>
				Math.abs(c - oldLine) < Math.abs(best - oldLine) ? c : best, candidates[0]);
			note = `ambiguous (${candidates.length}): ${candidates.join(",")} → closest to ${oldLine}`;
		}
		report.push({ file: rel, symbol, path, oldLine, newLine, note });
		return `[${symbol}](${urlBase}#L${newLine})`;
	});
	if (updated !== text) writeFileSync(full, updated);
}

// Report
console.log("file\tsymbol\tpath\told→new\tnote");
for (const r of report) {
	console.log(
		`${r.file}\t${r.symbol}\t${r.path}\t${r.oldLine}→${r.newLine ?? "—"}\t${r.note}`,
	);
}
console.log(`\nTotal: ${report.length} links`);
const notFound = report.filter((r) => r.newLine === null);
const ambiguous = report.filter((r) => r.note.startsWith("ambiguous"));
const changed = report.filter((r) => r.newLine !== null && r.newLine !== r.oldLine);
console.log(`  unique matches: ${report.length - notFound.length - ambiguous.length}`);
console.log(`  ambiguous (resolved by proximity): ${ambiguous.length}`);
console.log(`  not found: ${notFound.length}`);
console.log(`  line number changed: ${changed.length}`);

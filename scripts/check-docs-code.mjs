#!/usr/bin/env node
/**
 * Static checker for code blocks in the docs.
 *
 * - ```json blocks must parse with JSON.parse
 * - ```ts / ```typescript / ```tsx blocks must typecheck with tsc --noEmit
 *   against the pinned abstractionkit version in devDependencies
 *
 * Nothing is executed: no network, no keys, no chain. This catches references
 * to renamed SDK methods, wrong field names, syntax errors, and invalid JSON.
 *
 * Escape hatches:
 * - Put `<!-- docs-check: skip -->` on its own line directly above a fence to
 *   exempt that one block (use for intentionally elided snippets).
 * - Pre-existing failures live in scripts/docs-check-baseline.json, keyed by a
 *   hash of the block's content. CI fails only on NEW failures. Fixing a block
 *   changes its hash, so fixed blocks leave the baseline automatically; run
 *   with --update-baseline to rewrite the file (also prunes stale entries).
 */

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(repoRoot, "docs");
const baselinePath = path.join(repoRoot, "scripts", "docs-check-baseline.json");
const tmpDir = path.join(repoRoot, "node_modules", ".cache", "docs-check");
const updateBaseline = process.argv.includes("--update-baseline");

const TS_LANGS = new Set(["ts", "typescript", "tsx"]);
const SKIP_MARKER = /<!--\s*docs-check:\s*skip\s*-->/;

// ---------------------------------------------------------------- extraction

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.mdx?$/.test(entry.name)) yield full;
  }
}

function extractBlocks(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const blocks = [];
  let open = null; // { lang, indent, startLine, content: [] }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (open) {
      if (line.slice(open.indent.length).trimEnd() === "```" || line.trim() === "```") {
        blocks.push({ ...open, content: open.content.join("\n") });
        open = null;
      } else {
        open.content.push(line.startsWith(open.indent) ? line.slice(open.indent.length) : line);
      }
      continue;
    }
    const fence = line.match(/^(\s*)```(\w+)/);
    if (!fence) continue;
    const skip = i > 0 && SKIP_MARKER.test(lines[i - 1]);
    const lang = fence[2].toLowerCase();
    if (!skip && (lang === "json" || TS_LANGS.has(lang))) {
      open = { lang, indent: fence[1], startLine: i + 2, content: [] };
    } else {
      // still consume the fence so nested content is not re-scanned
      open = { lang: null, indent: fence[1], startLine: i + 2, content: [] };
    }
  }
  return blocks.filter((b) => b.lang !== null);
}

function blockHash(lang, content) {
  return createHash("sha256").update(`${lang}\n${content}`).digest("hex").slice(0, 12);
}

// ------------------------------------------------------------------- checks

const failures = []; // { file, line, hash, lang, message }
const tsBlocks = []; // { scratchFile, docFile, startLine, hash }

fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

let total = 0;
for (const file of walk(docsDir)) {
  const rel = path.relative(repoRoot, file);
  for (const block of extractBlocks(file)) {
    total++;
    const hash = blockHash(block.lang, block.content);
    if (block.lang === "json") {
      try {
        JSON.parse(block.content);
      } catch (err) {
        failures.push({ file: rel, line: block.startLine, hash, lang: "json", message: err.message });
      }
    } else {
      const ext = block.lang === "tsx" ? "tsx" : "ts";
      const scratchFile = path.join(tmpDir, `block-${tsBlocks.length}.${ext}`);
      // `export {}` makes the block a module: imports and top-level await work,
      // and declarations cannot collide across blocks.
      fs.writeFileSync(scratchFile, `${block.content}\nexport {};\n`);
      tsBlocks.push({ scratchFile, docFile: rel, startLine: block.startLine, hash });
    }
  }
}

function runTsc(files, configName) {
  const tsconfig = {
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "Bundler",
      jsx: "react-jsx",
      lib: ["ES2022", "DOM"],
      types: ["node"],
      strict: false,
      noEmit: true,
      skipLibCheck: true,
      esModuleInterop: true,
    },
    files,
  };
  const configPath = path.join(tmpDir, configName);
  fs.writeFileSync(configPath, JSON.stringify(tsconfig, null, 2));
  let output = "";
  try {
    execFileSync("npx", ["tsc", "-p", configPath, "--pretty", "false"], {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    output = `${err.stdout ?? ""}${err.stderr ?? ""}`;
  }
  const errors = new Map(); // scratchFile -> [{ line, message }]
  for (const line of output.split("\n")) {
    const m = line.match(/^(.*?)\((\d+),(\d+)\): (error TS\d+: .*)$/);
    if (!m) continue;
    const file = path.resolve(repoRoot, m[1]);
    const entry = errors.get(file) ?? [];
    entry.push({ line: Number(m[2]), message: m[4] });
    errors.set(file, entry);
  }
  return errors;
}

if (tsBlocks.length > 0) {
  // Two passes: when any file in the program has syntax errors, tsc skips
  // semantic checking for the whole program. Pass 1 catches syntax failures;
  // pass 2 re-checks the syntactically clean blocks for semantic errors.
  const pass1 = runTsc(tsBlocks.map((b) => b.scratchFile), "tsconfig.json");
  const cleanFiles = tsBlocks.map((b) => b.scratchFile).filter((f) => !pass1.has(f));
  const pass2 = cleanFiles.length > 0 ? runTsc(cleanFiles, "tsconfig-pass2.json") : new Map();

  for (const block of tsBlocks) {
    const errors = pass1.get(block.scratchFile) ?? pass2.get(block.scratchFile);
    if (!errors) continue;
    failures.push({
      file: block.docFile,
      line: block.startLine + errors[0].line - 1,
      hash: block.hash,
      lang: "ts",
      message: errors
        .map((e) => `L${block.startLine + e.line - 1}: ${e.message}`)
        .join("\n    "),
    });
  }
}

// ----------------------------------------------------------------- baseline

const baseline = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, "utf8")) : {};
const failingHashes = new Set(failures.map((f) => f.hash));
const newFailures = failures.filter((f) => !(f.hash in baseline));
const staleEntries = Object.keys(baseline).filter((h) => !failingHashes.has(h));

if (updateBaseline) {
  const next = {};
  for (const f of failures) next[f.hash] = `${f.file}:${f.line} (${f.lang})`;
  fs.writeFileSync(baselinePath, JSON.stringify(next, null, 2) + "\n");
  console.log(`Baseline rewritten: ${failures.length} known failure(s).`);
  process.exit(0);
}

console.log(`Checked ${total} code block(s): ${total - failures.length} pass, ${failures.length - newFailures.length} baselined, ${newFailures.length} new failure(s).`);
if (staleEntries.length > 0) {
  console.log(`${staleEntries.length} baseline entr(ies) no longer fail; run --update-baseline to prune.`);
}

if (newFailures.length > 0) {
  console.error("\nNew failures (fix the block, or add `<!-- docs-check: skip -->` above the fence for intentional elision):\n");
  for (const f of newFailures) {
    console.error(`  ${f.file}:${f.line} [${f.lang}] (${f.hash})\n    ${f.message}\n`);
  }
  process.exit(1);
}

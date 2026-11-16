#!/usr/bin/env node
// Warn about docs pages too long for AI agents to read in full.
//
// Agents read the Markdown version of each page (build/**/*.md). Claude Code's
// WebFetch returns a page verbatim only up to about 40,000 characters; past
// that it keeps the first 40,000 and replaces the rest with a model-written
// summary, so methods near the end of a long page are paraphrased or lost.
// Keep every page under the limit, and put the recommended path first.
//
// Usage: node scripts/check-page-sizes.js [--strict]
//   --strict  exit with code 1 when any page is over the limit

const fs = require("fs");
const path = require("path");

const LIMIT = 40000;
const BUILD_DIR = path.join(__dirname, "..", "build");
const strict = process.argv.includes("--strict");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

if (!fs.existsSync(BUILD_DIR)) {
  console.error("check-page-sizes: no build directory, run `yarn build` first");
  process.exit(strict ? 1 : 0);
}

const oversized = walk(BUILD_DIR)
  .map((file) => ({
    page: path.relative(BUILD_DIR, file),
    chars: fs.readFileSync(file, "utf8").length,
  }))
  .filter(({ chars }) => chars > LIMIT)
  .sort((a, b) => b.chars - a.chars);

if (oversized.length === 0) {
  console.log(`check-page-sizes: every page is under ${LIMIT} characters`);
  process.exit(0);
}

console.warn(
  `check-page-sizes: ${oversized.length} page(s) over ${LIMIT} characters. ` +
    "AI agents only read the first part of these in full:",
);
for (const { page, chars } of oversized) {
  console.warn(`  ${String(chars).padStart(7)}  ${page}`);
}
process.exit(strict ? 1 : 0);

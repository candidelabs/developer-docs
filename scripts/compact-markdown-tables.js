#!/usr/bin/env node

/**
 * Remove the padding from tables in the generated Markdown files.
 *
 * @signalwire/docusaurus-plugin-llms-txt pads every table cell with spaces to
 * the width of the widest cell in its column. A cell holding a nested type
 * definition can be thousands of characters wide, so every row of that table,
 * header and separator included, becomes thousands of characters of spaces.
 * On the larger reference pages most of the file is padding.
 *
 * AI agents read these files, and their fetch tools only return the start of
 * a long page verbatim, so the padding pushes real content past the cut. This
 * script trims each cell and shortens separator rows. Wording is unchanged.
 * Lines inside fenced code blocks are left alone.
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../build');

// Split a table row on pipes that are not escaped (`\|` stays inside a cell).
function splitCells(row) {
  return row.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '').split(/(?<!\\)\|/);
}

function compactRow(row) {
  const cells = splitCells(row);
  const isSeparator = cells.every((cell) => /^\s*:?-+:?\s*$/.test(cell));
  const compacted = cells.map((cell) =>
    isSeparator ? cell.trim().replace(/-+/, '---') : cell.trim(),
  );
  return `| ${compacted.join(' | ')} |`;
}

function compactTables(content) {
  let inFence = false;
  let fenceMarker = '';
  return content
    .split('\n')
    .map((line) => {
      const fence = line.match(/^\s*(`{3,}|~{3,})/);
      if (fence) {
        if (!inFence) {
          inFence = true;
          fenceMarker = fence[1][0];
        } else if (fence[1][0] === fenceMarker) {
          inFence = false;
        }
        return line;
      }
      if (inFence) return line;
      const trimmed = line.trim();
      if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 1) {
        return compactRow(line);
      }
      return line;
    })
    .join('\n');
}

function compactFile(filePath) {
  const before = fs.readFileSync(filePath, 'utf8');
  const after = compactTables(before);
  if (after === before) return 0;
  fs.writeFileSync(filePath, after, 'utf8');
  return before.length - after.length;
}

function findMarkdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return findMarkdownFiles(full);
    return entry.name.endsWith('.md') || entry.name === 'llms-full.txt' ? [full] : [];
  });
}

function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('compact-markdown-tables: no build directory, run `yarn build` first');
    process.exit(1);
  }
  let files = 0;
  let saved = 0;
  for (const file of findMarkdownFiles(BUILD_DIR)) {
    const removed = compactFile(file);
    if (removed > 0) {
      files += 1;
      saved += removed;
    }
  }
  console.log(`compact-markdown-tables: removed ${saved} padding characters from ${files} file(s)`);
}

if (require.main === module) {
  main();
}

module.exports = { compactTables, compactRow };

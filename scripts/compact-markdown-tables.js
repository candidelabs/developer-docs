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

// `isDelimiterRow` is true only for the row right after a table's header, so a
// body row whose cells happen to be dashes keeps its content.
function compactRow(row, isDelimiterRow) {
  const indent = row.match(/^\s*/)[0];
  const cells = splitCells(row);
  const isSeparator =
    isDelimiterRow && cells.every((cell) => /^\s*:?-+:?\s*$/.test(cell));
  const compacted = cells.map((cell) =>
    isSeparator ? cell.trim().replace(/-+/, '---') : cell.trim(),
  );
  // Keep the leading indentation so tables nested in list items stay nested.
  return `${indent}| ${compacted.join(' | ')} |`;
}

// Width of leading whitespace, with tabs counted to the next multiple of 4.
function indentWidth(line) {
  let width = 0;
  for (const ch of line) {
    if (ch === ' ') width += 1;
    else if (ch === '\t') width += 4 - (width % 4);
    else break;
  }
  return width;
}

function compactTables(content) {
  // { char, length, column } while inside a fenced code block. `column` is
  // where the fence starts, which is past the marker for a fence that opens
  // on a list item line ("- ```ts").
  let fence = null;
  let tableRow = 0; // position of the current line in a run of table rows
  return content
    .split('\n')
    .map((line) => {
      if (fence) {
        // A closing fence uses the same character, is at least as long as the
        // opening fence, starts at most 3 columns past the opening fence's
        // column and has nothing after it.
        const close = line.match(/^(\s*)(`+|~+)\s*$/);
        if (
          close &&
          close[2][0] === fence.char &&
          close[2].length >= fence.length &&
          indentWidth(close[1]) <= fence.column + 3
        ) {
          fence = null;
        }
        return line;
      }
      // An opening fence, optionally after a list marker on the same line.
      const open = line.match(/^(\s*(?:[-*+]|\d{1,9}[.)])[ \t]+)?( {0,3})(`{3,}|~{3,})/);
      if (open && (open[1] !== undefined || indentWidth(line) <= 3)) {
        fence = {
          char: open[3][0],
          length: open[3].length,
          column: indentWidth((open[1] || '').replace(/[^\s]/g, ' ') + open[2]),
        };
        tableRow = 0;
        return line;
      }
      const trimmed = line.trim();
      const isTableRow =
        trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 1;
      // Four or more columns of indentation can be an indented code block, so
      // leave those lines exactly as they are.
      if (!isTableRow || indentWidth(line) >= 4) {
        tableRow = 0;
        return line;
      }
      const result = compactRow(line, tableRow === 1);
      tableRow += 1;
      return result;
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

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { compactTables } = require('./compact-markdown-tables');

test('trims padded cells and shortens the separator row', () => {
  const input = [
    '| Param Name   | Param Type     |',
    '| :----------- | :------------- |',
    '| nonce        | bigint         |',
  ].join('\n');
  assert.equal(
    compactTables(input),
    ['| Param Name | Param Type |', '| :--- | :--- |', '| nonce | bigint |'].join('\n'),
  );
});

test('keeps escaped pipes inside a cell', () => {
  const input = '| rpc    | string \\| Transport    |';
  assert.equal(compactTables(input), '| rpc | string \\| Transport |');
});

test('leaves lines inside fenced code blocks alone', () => {
  const input = ['```', '| not   | a table |', '```', '| a   | b |'].join('\n');
  assert.equal(
    compactTables(input),
    ['```', '| not   | a table |', '```', '| a | b |'].join('\n'),
  );
});

test('leaves text that is not a table unchanged', () => {
  const input = 'A line with a | pipe in it\n\n|';
  assert.equal(compactTables(input), input);
});

test('shortens only the delimiter row, not body rows made of dashes', () => {
  const input = ['| A   | B   |', '| --- | --- |', '| -   | -   |'].join('\n');
  assert.equal(
    compactTables(input),
    ['| A | B |', '| --- | --- |', '| - | - |'].join('\n'),
  );
});

test('leaves indented code blocks alone', () => {
  const input = ['Example:', '', '    | not  | a table |', '    | ---- | ------- |'].join('\n');
  assert.equal(compactTables(input), input);
});

test('keeps the indentation of a table inside a list item', () => {
  const input = ['- item', '', '  | A   | B   |', '  | --- | --- |'].join('\n');
  assert.equal(
    compactTables(input),
    ['- item', '', '  | A | B |', '  | --- | --- |'].join('\n'),
  );
});

test('a shorter fence inside a longer one does not close it', () => {
  const input = ['````md', '```', '| x   | y |', '```', '````', '| a   | b |'].join('\n');
  assert.equal(
    compactTables(input),
    ['````md', '```', '| x   | y |', '```', '````', '| a | b |'].join('\n'),
  );
});

test('a fence line with text after it does not close the block', () => {
  const input = ['```', '``` not a close', '| x   | y |', '```', '| a   | b |'].join('\n');
  assert.equal(
    compactTables(input),
    ['```', '``` not a close', '| x   | y |', '```', '| a | b |'].join('\n'),
  );
});

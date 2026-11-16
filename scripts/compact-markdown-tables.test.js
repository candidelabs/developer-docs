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

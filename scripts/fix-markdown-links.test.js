const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const { fixMarkdownLinks } = require('./fix-markdown-links');

test('fixes a fragment link that ends at EOF', (t) => {
  const testDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'fix-markdown-links-'),
  );
  const filePath = path.join(testDir, 'llms-full.txt');

  t.after(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  fs.writeFileSync(
    filePath,
    'https://docs.candide.dev/path/.md#section',
  );

  assert.equal(fixMarkdownLinks(filePath), 1);
  assert.equal(
    fs.readFileSync(filePath, 'utf8'),
    'https://docs.candide.dev/path.md#section',
  );
});

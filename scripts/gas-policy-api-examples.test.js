const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const pagePath = path.join(__dirname, "..", "docs", "platform", "gas-policy-api.mdx");
const page = fs.readFileSync(pagePath, "utf8");

function replaceTransactionsBody() {
  const section = page.match(
    /### Replace all transactions([\s\S]*?)(?=\n### )/,
  );
  assert.ok(section, "Replace all transactions section is missing");

  const data = section[1].match(/--data '(\{[\s\S]*\})'\n```/);
  assert.ok(data, "PUT example request body is missing");
  return JSON.parse(data[1]);
}

test("published PUT transaction example uses the API's accepted formats", () => {
  const body = replaceTransactionsBody();
  assert.equal(body.transactions.length, 1);

  const transaction = body.transactions[0];
  const abi = JSON.parse(transaction.abi);

  assert.ok(Array.isArray(abi), "abi must be a JSON-stringified array");
  assert.equal(abi.length, 1);
  assert.deepEqual(abi[0], {
    type: "function",
    name: "transfer",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "to" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [{ type: "bool", name: "" }],
  });
  assert.equal(transaction.selector, "0xa9059cbb");

  assert.deepEqual(transaction.parameters, [
    {
      index: "1",
      operator: "$lte",
      value: "0x0f4240",
    },
  ]);
  assert.match(transaction.parameters[0].value, /^0x[0-9a-f]+$/i);
});

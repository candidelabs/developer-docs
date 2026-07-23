const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const managementKey = process.env.CANDIDE_MANAGEMENT_KEY;
const testPolicyId = process.env.CANDIDE_GAS_POLICY_TEST_POLICY_ID;
const baseUrl = process.env.CANDIDE_PLATFORM_API_URL ?? "https://platform-api.candide.dev";

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

test(
  "published PUT transaction example is accepted by the Platform API",
  {
    skip:
      !managementKey || !testPolicyId
        ? "requires CANDIDE_MANAGEMENT_KEY and CANDIDE_GAS_POLICY_TEST_POLICY_ID"
        : false,
  },
  async () => {
    const url = `${baseUrl}/v1/gas-policies/${encodeURIComponent(testPolicyId)}`;
    const headers = {
      Authorization: `Bearer ${managementKey}`,
      "Content-Type": "application/json",
    };

    const currentResponse = await fetch(url, { headers });
    assert.equal(
      currentResponse.status,
      200,
      `failed to read test policy: ${await currentResponse.text()}`,
    );
    const currentPolicy = await currentResponse.json();
    assert.equal(
      currentPolicy.general.enabled,
      false,
      "integration test policy must be disabled before replacing transactions",
    );

    const originalTransactions = currentPolicy.transactions.map(
      ({ to, abi, selector, parameters }) => ({ to, abi, selector, parameters }),
    );

    try {
      const response = await fetch(`${url}/transactions`, {
        method: "PUT",
        headers,
        body: JSON.stringify(replaceTransactionsBody()),
      });
      const responseBody = await response.text();
      assert.equal(
        response.status,
        200,
        `published PUT example was rejected: ${responseBody}`,
      );
    } finally {
      const restoreResponse = await fetch(`${url}/transactions`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ transactions: originalTransactions }),
      });
      const restoreBody = await restoreResponse.text();
      assert.equal(
        restoreResponse.status,
        200,
        `failed to restore test policy transactions: ${restoreBody}`,
      );
    }
  },
);

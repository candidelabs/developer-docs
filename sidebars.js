/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure

  // But you can create a sidebar manually
  aaSideBar: ["account-abstraction/intro"],
  dappsSideBar: [
    "dapps/getting-started",
    {
      type: "category",
      collapsed: false,
      label: "Guides",
      items: [
        "dapps/guides/sponsor-gas",
        "dapps/guides/batch-transactions",
        "dapps/guides/verify-signatures",
      ],
    },
  ],
  infraSideBar: [
    {
      type: "category",
      label: "Bundler",
      className: "category-not-collapsible",
      collapsible: false,
      collapsed: false,
      items: [
        "wallet/bundler/rpc-endpoints",
        "wallet/bundler/rpc-methods",
        {
          type: "category",
          label: "Error Codes",
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Bundler API",
              collapsed: true,
              link: {
                type: "doc",
                id: "wallet/technical-reference/bundler-error-codes",
              },
              items: [
                "wallet/technical-reference/-32500-transaction-rejected-by-entrypoint-simulation",
                "wallet/technical-reference/-32501-transaction-rejected-by-paymaster",
                "wallet/technical-reference/-32502-transaction-rejected-by-opcode-validation",
                "wallet/technical-reference/-32503-useroperation-out-of-time-range",
                "wallet/technical-reference/-32504-paymaster-or-aggregator-throttled-or-banned",
                "wallet/technical-reference/-32505-stake-or-delay-too-low",
                "wallet/technical-reference/-32506-unsupported-aggregator",
                "wallet/technical-reference/-32507-invalid-siganture",
                "wallet/technical-reference/-32521-transaction-reverted",
                "wallet/technical-reference/-32602-invalid-useroperation",
              ],
            },
            {
              type: "category",
              label: "Entrypoint",
              collapsed: true,
              link: {
                type: "doc",
                id: "wallet/technical-reference/entrypoint-error-codes",
              },
              items: [
                "wallet/technical-reference/aa10-sender-already-constructed",
                "wallet/technical-reference/aa13-initCode-failed-or-oog",
                "wallet/technical-reference/aa14-initcode-must-return-sender",
                "wallet/technical-reference/aa15-initcode-must-create-sender",
                "wallet/technical-reference/aa20-account-not-deployed",
                "wallet/technical-reference/aa22-expired-or-not-due",
                "wallet/technical-reference/aa21-didnt-pay-prefund",
                "wallet/technical-reference/aa23-reverted-or-oog",
                "wallet/technical-reference/aa24-signature-error",
                "wallet/technical-reference/aa25-invalid-account-nonce",
                "wallet/technical-reference/aa30-paymaster-not-deployed",
                "wallet/technical-reference/aa31-paymaster-deposit-too-low",
                "wallet/technical-reference/aa32-paymaster-expired-or-not-due",
                "wallet/technical-reference/aa33-reverted-or-oog",
                "wallet/technical-reference/aa34-signature-error",
                "wallet/technical-reference/aa40-over-verificationgaslimit",
                "wallet/technical-reference/aa41-too-little-verificationgas",
                "wallet/technical-reference/aa50-postop-reverted",
                "wallet/technical-reference/aa51-prefund-below-actualgascost",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Paymaster",
      className: "category-not-collapsible",
      collapsible: false,
      items: [
        "wallet/paymaster/rpc-methods",
        "wallet/paymaster/tokens-supported",
      ],
    },
    {
      type: "category",
      label: "Safe Recovery Service",
      className: "category-not-collapsible",
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "wallet/recovery/overview",
          label: "Overview"
        },
        {
          type: "doc",
          id: "wallet/recovery/ux-api",
          label: "Recovery UX API"
        },
        {
          type: "doc",
          id: "wallet/recovery/auth-api",
          label: "Email/SMS Recovery API"
        },
      ],
    },
    {
      type: "category",
      label: "Bundler (self-host)",
      collapsed: true,
      items: ["wallet/bundler/erc-4337-intro", "wallet/bundler/installation"],
    },
  ],
  walletSideBar: [
    "wallet/atelier-intro",
    {
      type: "category",
      label: "Guides",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        "wallet/guides/getting-started",
        "wallet/guides/send-gasless-tx",
        "wallet/guides/pay-gas-in-erc20",
        "wallet/guides/authentication",
        "wallet/guides/multisig",
        "wallet/guides/signing",
        "wallet/guides/onchain-identifiers",
      ],
    },
    {
      type: "category",
      label: "EIP-7702",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        {
          type: "doc",
          id: "wallet/guides/getting-started-eip-7702",
          label: "EIP-7702 Quickstart"
        },
      ],
    },
    {
      type: "category",
      label: "Plugins",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        "wallet/plugins/passkeys",
        "wallet/plugins/recovery-with-guardians",
        "wallet/plugins/allowance",
      ],
    },
    {
      type: "category",
      label: "SDK Reference",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        "wallet/abstractionkit/introduction",
        {
          type: "category",
          label: "Safe Account",
          collapsed: true,
          link: { type: "doc", id: "wallet/abstractionkit/safe-account" },
          items: [
            "wallet/abstractionkit/safe-account-v3",
            "wallet/abstractionkit/safe-account-v2",
          ],
        },
        "wallet/abstractionkit/simple-7702-account",
        "wallet/abstractionkit/bundler",
        "wallet/abstractionkit/paymaster",
        "wallet/abstractionkit/utilities",
      ],
    },
    {
      type: "category",
      collapsible: false,
      className: "category-not-collapsible",
      label: "Technical Reference",
      items: [
        "wallet/technical-reference/chain-nuances",
        "wallet/technical-reference/deployments",
      ],
    },
  ],
  experimentalSideBar: [
    {
      type: "category",
      collapsible: false,
      className: "category-not-collapsible",
      label: "EIP-7702",
      items: [
        {
          type: "doc",
          id: "account-abstraction/7702/overview",
          label: "Overview"
        },
        {
          type: "doc",
          id: "account-abstraction/7702/delegation",
          label: "Delegation"
        },
      ],
    }
  ],
  instaGasSidebar: [
    {
      type: "category",
      collapsible: false,
      className: "category-not-collapsible",
      label: "Quickstart",
      items: [
        {
          type: "doc",
          id: "instagas/overview",
          label: "Overview"
        },
        {
          type: "doc",
          id: "instagas/gas-policies",
          label: "Gas Policies"
        },
      ],
    },
    {
      type: "category",
      collapsible: false,
      className: "category-not-collapsible",
      label: "Explainer",
      items: [
        {
          type: "doc",
          id: "instagas/introduction",
          label: "Introduction"
        },
        {
          type: "doc",
          id: "instagas/usecases",
          label: "Usecases"
        },
        {
          type: "doc",
          id: "instagas/architecture",
          label: "Architecture"
        },
      ],
    }
  ]
};

module.exports = sidebars;

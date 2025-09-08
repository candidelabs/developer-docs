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
  infraSideBar: [
    {
      type: "category",
      label: "Bundler",
      className: "category-not-collapsible",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "wallet/bundler/rpc-methods",
          label: "Bundler API"
        },
        {
          type: "doc",
          id: "wallet/bundler/rpc-endpoints",
          label: "Supported Networks"
        },
        {
          type: "doc",
          id: "wallet/bundler/public-endpoints",
          label: "Public Endpoints"
        },
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
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32500-transaction-rejected-by-entrypoint-simulation",
                  label: "-32500"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32501-transaction-rejected-by-paymaster",
                  label: "-32501"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32502-transaction-rejected-by-opcode-validation",
                  label: "-32502"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32503-useroperation-out-of-time-range",
                  label: "-32503"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32504-paymaster-or-aggregator-throttled-or-banned",
                  label: "-32504"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32505-stake-or-delay-too-low",
                  label: "-32505"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32506-unsupported-aggregator",
                  label: "-32506"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32507-invalid-siganture",
                  label: "-32507"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32521-transaction-reverted",
                  label: "-32521"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/-32602-invalid-useroperation",
                  label: "-32602"
                },
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
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa10-sender-already-constructed",
                  label: "AA10"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa13-initCode-failed-or-oog",
                  label: "AA13"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa14-initcode-must-return-sender",
                  label: "AA14"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa15-initcode-must-create-sender",
                  label: "AA15"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa20-account-not-deployed",
                  label: "AA20"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa21-didnt-pay-prefund",
                  label: "AA21"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa22-expired-or-not-due",
                  label: "AA22"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa23-reverted-or-oog",
                  label: "AA23"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa24-signature-error",
                  label: "AA24"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa25-invalid-account-nonce",
                  label: "AA25"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa30-paymaster-not-deployed",
                  label: "AA30"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa31-paymaster-deposit-too-low",
                  label: "AA31"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa32-paymaster-expired-or-not-due",
                  label: "AA32"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa33-reverted-or-oog",
                  label: "AA33"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa34-signature-error",
                  label: "AA34"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa40-over-verificationgaslimit",
                  label: "AA40"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa41-too-little-verificationgas",
                  label: "AA41"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa50-postop-reverted",
                  label: "AA50"
                },
                {
                  type: "doc",
                  id: "wallet/technical-reference/aa51-prefund-below-actualgascost",
                  label: "AA51"
                },
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
        {
          type: "doc",
          id: "wallet/paymaster/rpc-methods",
          label: "Paymaster API"
        },
        {
          type: "doc",
          id: "wallet/paymaster/tokens-supported",
          label: "ERC-20 Tokens Supported"
        },
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
      items: [
        {
          type: "doc",
          id: "wallet/bundler/erc-4337-intro",
          label: "Intro"
        },
        {
          type: "doc",
          id: "wallet/bundler/installation",
          label: "Install & Self-host"
        }
      ]
    },
  ],
  walletSideBar: [
    {
      type: "doc",
      id: "wallet/atelier-intro",
      label: "Intro to Candide"
    },
    {
      type: "category",
      label: "Starter Guides",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        {
          type: "doc",
          id: "wallet/guides/getting-started",
          label: "Send Your First Transaction"
        },
        {
          type: "doc",
          id: "wallet/guides/send-gasless-tx",
          label: "Gas Sponsorship"
        },
        {
          type: "doc",
          id: "wallet/guides/pay-gas-in-erc20",
          label: "Pay Gas in ERC-20"
        },
      ],
    },
    {
      type: "category",
      label: "Safe Plugins",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        {
          type: "doc",
          id: "wallet/plugins/passkeys",
          label: "Passkeys"
        },
        {
          type: "category",
          label: "Account Recovery",
          collapsed: true,
          link: { type: "doc", id: "wallet/plugins/recovery-with-guardians" },
          items: [
            {
              type: "doc",
              id: "wallet/plugins/how-to-add-a-guardian",
              label: "How to add a Guardian"
            },
            {
              type: "doc",
              id: "wallet/plugins/recovery-flow-guide",
              label: "How to Recover an Account"
            },
            {
              type: "doc",
              id: "wallet/plugins/recovery-alerts-guide",
              label: "How to Activate Recovery Alerts"
            },
            {
              type: "doc",
              id: "wallet/plugins/add-candide-guardian",
              label: "Add Candide Guardian"
            },
            {
              type: "doc",
              id: "wallet/plugins/recover-account-candide-guardian",
              label: "Recover with Candide Guardian"
            },
          ],
        },
        {
          type: "doc",
          id: "wallet/plugins/allowance",
          label: "Allowance"
        },
      ],
    },
    {
      type: "category",
      label: "Advanced Guides",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        {
          type: "doc",
          id: "wallet/guides/authentication",

          label: "Authentication"
        },
        {
          type: "doc",
          id: "wallet/guides/multisig",
          label: "Multisig"
        },
        {
          type: "doc",
          id: "wallet/guides/signing",
          label: "Signing Messages"
        },
        {
          type: "doc",
          id: "wallet/guides/onchain-identifiers",
          label: "Onchain Tracking"
        },
        {
          type: "doc",
          id: "wallet/guides/simulate-transaction",
          label: "Simulate Transaction"
        },
      ],
    },
    {
      type: "category",
      label: "EIP-7702 (EOA Upgrades)",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        {
          type: "doc",
          id: "wallet/guides/getting-started-eip-7702",
          label: "EIP-7702 Quickstart"
        },
        {
          type: "doc",
          id: "wallet/guides/send-galess-eip-7702",
          label: "Gasless Transactions"
        },
        {
          type: "doc",
          id: "wallet/guides/pay-gas-in-erc20-eip-7702",
          label: "Gas in ERC-20"
        },
      ]
    },
    {
      type: "category",
      label: "SDK Reference",
      collapsible: false,
      className: "category-not-collapsible",
      items: [
        {
          type: "doc",
          id: "wallet/abstractionkit/introduction",
          label: "Why AbstractionKit"
        },
        {
          type: "category",
          label: "Safe Account",
          collapsed: true,
          link: { type: "doc", id: "wallet/abstractionkit/safe-account" },
          items: [
            {
              type: "doc",
              id: "wallet/abstractionkit/safe-account-v3",
              label: "Safe Account V3"
            },
            {
              type: "doc",
              id: "wallet/abstractionkit/safe-account-v2",
              label: "Safe Account V2"
            },
          ],
        },
        {
          type: "doc",
          id: "wallet/abstractionkit/simple-7702-account",
          label: "Simple 7702 Account"
        },
        {
          type: "doc",
          id: "wallet/abstractionkit/bundler",
          label: "Bundler"
        },
        {
          type: "doc",
          id: "wallet/abstractionkit/paymaster",
          label: "Paymaster"
        },
        {
          type: "doc",
          id: "wallet/abstractionkit/utilities",
          label: "Utilities"
        },
      ],
    },
    {
      type: "category",
      collapsible: false,
      className: "category-not-collapsible",
      label: "Technical Reference",
      items: [
        {
          type: "doc",
          id: "wallet/technical-reference/chain-nuances",
          label: "EVM Chain Nuances"
        },
        {
          type: "doc",
          id: "wallet/technical-reference/deployments",
          label: "Deployment Addresses"
        },
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
      label: "Guides",
      items: [{
        type: "doc",
        id: "instagas/batch-sponsor-transactions",
        label: "Batch & Sponsor",
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

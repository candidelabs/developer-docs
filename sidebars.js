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
  aaSideBar: [
    'account-abstraction/intro'
  ],
  dappsSideBar: [
    'dapps/getting-started',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'dapps/guides/batch-transactions',
        'dapps/guides/verify-signatures',
      ],
    },
  ],
  walletSideBar: [
    'wallet/atelier-intro',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'wallet/guides/getting-started',
        'wallet/guides/send-gasless-tx',
        'wallet/guides/pay-gas-in-erc20',
      ],
    },
    {
      type: 'category',
      label: 'SDK',
      items: [
        'wallet/abstractionkit/introduction',
        'wallet/abstractionkit/accounts',
        'wallet/abstractionkit/bundler',
      ],
    },
    {
      type: 'category',
      label: 'Paymaster',
      items: [
        'wallet/paymaster/rpc-methods',
      ],
    },
    {
      type: 'category',
      label: 'Voltaire Bundler',
      items: [
        'wallet/bundler/erc-4337-intro',
        'wallet/bundler/installation',
        'wallet/bundler/rpc-methods',
        'wallet/bundler/rpc-endpoints',
      ],
    },
  ]
};

module.exports = sidebars;

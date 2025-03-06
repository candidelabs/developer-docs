export default [
  {
    title: 'AbstractionKit',
    rows: [
      {
        title: 'SDK Guides',
        description: 'Step by step guides on how to create, customize and offer Smart Wallets for your users',
        to: './wallet/atelier-intro'
      },
      {
        title: 'Plugins',
        description: "Safe modules including Passkeys, Account Recovery and Allowances",
        to: './wallet/plugins/passkeys/',
      },
    ],
  },
  {
    title: 'InstaGas',
    rows: [
      {
        title: 'Gas Policies Guides',
        description: 'No-Code Gas Sponsorship for Dapps on over 10+ chains with a setup time in minutes',
        to: './instagas/overview',
      },
    ],
  },
  {
    title: 'Infra API',
    rows: [
      {
        title: 'Paymaster',
        description: 'Get gas sponsorship from hundreds of dApps and allow for gas payments in popular ERC-20 tokens',
        to: './wallet/paymaster/rpc-methods',
      },
      {
        title: 'Bundler',
        description: 'Connect to the Unified Bundler Mempool to send ERC-4337 AA UserOperations',
        to: './wallet/bundler/rpc-methods',
      },
    ],
  }
];
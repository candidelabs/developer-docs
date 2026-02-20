export default [
  {
    title: 'AbstractionKit SDK',
    iconName: 'code',
    rows: [
      {
        iconName: 'bookOpen',
        title: 'Guides',
        description: 'Step-by-step guides to create smart accounts, batch transactions, and deliver gasless UX to your users',
        to: './wallet/atelier-intro'
      },
      {
        iconName: 'squares',
        title: 'Plugins',
        description: 'Extend accounts with Safe modules: Passkeys for biometric login, Account Recovery, and Spending Limits',
        to: './wallet/plugins/passkeys/',
      },
    ],
  },
  {
    title: 'Gas Sponsorship',
    iconName: 'bolt',
    rows: [
      {
        iconName: 'bolt',
        title: 'InstaGas',
        description: 'No-code gas sponsorship policies for dapps on 10+ chains. Spending limits and contract whitelisting with zero Solidity required',
        to: './instagas/overview',
      },
      {
        iconName: 'creditCard',
        title: 'Paymaster API',
        description: 'Programmatic gas sponsorship and ERC-20 gas payments. Build custom policies and per-app spending rules via API',
        to: './wallet/paymaster/rpc-methods',
      },
    ],
  },
  {
    title: 'Infrastructure',
    iconName: 'circleStack',
    rows: [
      {
        iconName: 'cube',
        title: 'Bundler',
        description: 'ERC-4337 compliant bundler nodes for submitting UserOperations across all major EVM networks',
        to: './wallet/bundler/rpc-methods',
      },
      {
        iconName: 'key',
        title: 'Account Recovery Service',
        description: 'Email and SMS-based recovery with an alert system and automatic on-chain execution for Safe accounts',
        to: './wallet/recovery/overview/',
      },
    ],
  }
];

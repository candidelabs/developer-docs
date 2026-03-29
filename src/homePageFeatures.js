export default [
  {
    iconName: 'bookOpen',
    title: 'Guides',
    description: 'Create smart accounts, batch transactions, and deliver gasless UX to your users',
    to: './wallet/guides/getting-started'
  },
  {
    iconName: 'bolt',
    title: 'Gas Sponsorship',
    description: 'Sponsor gas for your users with no-code policies or programmatic paymaster API',
    to: './wallet/guides/send-gasless-tx',
  },
  {
    iconName: 'key',
    title: 'Passkeys',
    description: 'Biometric login with WebAuthn. Sign transactions with Face ID or fingerprint, no seed phrases',
    to: './wallet/plugins/passkeys/',
  },
  {
    iconName: 'shieldCheck',
    title: 'Recovery',
    description: 'Social recovery with personal guardians or email and SMS backup with automatic on-chain execution',
    to: './wallet/plugins/recovery-with-guardians/',
  },
  {
    iconName: 'cube',
    title: 'EIP-7702 Upgrades',
    description: 'Upgrade EOAs to smart accounts with gas sponsorship and ERC-20 gas payments',
    to: './wallet/guides/getting-started-eip-7702',
  },
  {
    iconName: 'squares',
    title: 'Multisig',
    description: 'Multi-signature confirmation for transactions. Add 2FA or shared custody to any smart account',
    to: './wallet/guides/multisig',
  },
];

---
slug: wdk-smart-deposit-address
title: "Forwarding Address for Tether WDK"
description: Give WDK wallets one deposit address across supported EVM chains, with funds forwarded to the recipient on the chain your wallet uses.
authors: [marc]
tags: [forwarding-address, wdk, smart-deposit-address, cross-chain, usdt]
---

# Forwarding Address for Tether WDK

Candide's [Forwarding Address](/forwarding-address/overview/) now works with Tether's [Wallet Development Kit (WDK)](https://docs.wdk.tether.io). The module, `@candidelabs/wdk-protocol-sda-candide`, lets wallets offer the same deposit address across supported EVM chains and receive the funds on a chosen destination chain.

<!-- truncate -->

A user withdrawing USDT from an exchange can send it over any supported EVM chain to the same address. The funds are forwarded to their account on the destination chain. Deposits can also come from the destination chain itself, and each supported token arrives as its equivalent there.

The address is a self-custodial contract. The relayer can only forward funds to the configured recipient; it has no withdrawal rights. The recipient can withdraw directly at any time. You can also configure a company recovery wallet to recover stuck funds after a timelock. This is useful when a user deposits from an exchange and has no key on the source chain.

## Using the module

Version `1.0.0-beta.1` is available on npm. It implements WDK's Smart Deposit Address (SDA) interface, `ISdaProtocol` from `@tetherto/wdk-wallet`. The module runs on Node.js 20+ and includes a [Bare](https://bare.pears.com) entry point.

```bash
npm install @candidelabs/wdk-protocol-sda-candide
```

```javascript
import CandideForwardingProtocol from '@candidelabs/wdk-protocol-sda-candide'

const sda = new CandideForwardingProtocol(undefined, {
  apiUrl: process.env.CANDIDE_FORWARDING_API_URL,             // from the Candide dashboard
  policySecret: process.env.CANDIDE_FORWARDING_POLICY_SECRET, // only needed to activate; server-side only
  recoveryWithdrawer: '0xYourCompanyRecoveryWallet'          // optional
})

// Accept deposits on Ethereum, Arbitrum, and Base; deliver to Arbitrum
const [deposit] = await sda.createDepositAddress({
  sourceChains: [1, 42161, 8453],
  destinationChain: 42161,
  destinationAddress: '0xRecipientOnArbitrum'
})

// Read transfer history for this address
const transfers = await sda.getTransfers(deposit.address)
```

Keep the policy secret on your backend, where you activate monitoring for the address. The wallet client can fetch routes, quotes, minimum amounts, and transfer history, and derive addresses without a secret.

## Address verification

The SDK derives each deposit address locally using CREATE2. It uses pinned factory and beacon addresses and proxy bytecode, together with the recipient, recovery withdrawer, destination chain, and salt. It then checks the result against the address returned by the API and throws if they differ. You can also derive addresses offline with `deriveDepositAddress`.

## Monitoring, routes, and fees

Monitoring expires, so show the `expiry` alongside the deposit address and call `renewDepositAddress` whenever the user opens the deposit screen. Funds deposited after expiry remain at the address until monitoring is renewed, then forwarding resumes.

Available routes depend on the source chain. Use `getSupportedRoutes` to fetch the chains and tokens your wallet can accept. Quotes include the fees; if your policy covers them, the quote returns `sponsored: true` and the user receives the full deposit amount.

You can get your API URL and policy secret from the [Candide dashboard](https://dashboard.candide.dev). For the full integration details:

- [Package on npm](https://www.npmjs.com/package/@candidelabs/wdk-protocol-sda-candide) and [source on GitHub](https://github.com/candidelabs/wdk-protocol-sda-candide)
- [Forwarding Address overview](/forwarding-address/overview/) and [integration guide](/forwarding-address/integration-guide/)

~ Marc

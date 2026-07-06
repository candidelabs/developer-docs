---
slug: solana-paymaster
title: "Solana Paymaster: Pay Gas in USDT"
description: Candide now supports Solana. Send SPL transfers from accounts that hold zero SOL, with fees paid in USDT, through a paymaster built on Kora.
authors: [marc]
tags: [solana, paymaster, kora, usdt, gasless, wdk]
---

# Solana Paymaster: Pay Gas in USDT

We just shipped our first product outside the EVM. The Solana Paymaster lets accounts that hold zero SOL send SPL token transfers, with the network fee paid in USDT inside the same transaction.

<!-- truncate -->

## The same problem, one more chain

We've spent years on this problem for EVM chains: users hold stablecoins, not gas tokens. On Solana it's the same story with different names. An account holding USDT but no SOL can't move its own money, and asking a stablecoin user to go buy SOL first is where most wallets lose them.

Our EVM answer is the ERC-4337 token paymaster. Our Solana answer is a paymaster built on [Kora](https://solana.com/docs/tools/kora), Solana Foundation's open fee payer standard. The paymaster cosigns each transaction as its fee payer, fronts the SOL for fees and rent, and collects the equivalent in USDT within the same transaction. Because it speaks Kora's JSON-RPC protocol, any Kora client works with it. No proprietary SDK required. 

## One config object, one call  

The paymaster works with any Kora client. If you're using [Wallet Development Kit (WDK)](https://docs.wallet.tether.io) by Tether, the whole flow is one config object and one call:

```ts
import { WalletAccountSolanaGasless } from '@tetherto/wdk-wallet-solana-gasless'

const wallet = new WalletManagerSolanaGasless(seedPhrase, {
    provider: rpcUrl,
    paymasterUrl,                                // your Candide Solana Paymaster endpoint
    paymasterAddress,
    paymasterToken: { address: USDT_MINT },
    transferMaxFee: 1_000000n,                   // abort if the fee exceeds 1 USDT
})

const account = await wallet.getAccount(0)
await account.transfer({ token: USDT_MINT, recipient, amount: 100000n })
```

## Try it

- [Guide: Pay Gas in USDT on Solana](/wallet/guides/pay-gas-in-usdt-solana/)
- [Runnable example](https://github.com/candidelabs/tether-wdk-candide/tree/main/solana-gasless/01-usdt-gas)
- Get your Solana Paymaster endpoint at [dashboard.candide.dev](https://dashboard.candide.dev)

## Where this is going

Mainnet USDT is the only fee token today. Sponsored transactions, where you cover fees for your users the way InstaGas does on EVM chains, are next.

If you're building a stablecoin product on Solana, try it and tell us what breaks.

~ Marc

---

*P.S. If you want to see the whole flow including fee quoting and confirmation, it's on [GitHub](https://github.com/candidelabs/tether-wdk-candide/tree/main/solana-gasless/01-usdt-gas).*

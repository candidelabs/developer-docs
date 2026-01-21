---
title: "Ethereum Interoperability Layer (EIL)"
description: "Trustless cross-chain token movements without custody risks or trust assumptions, powered by Ethereum's native interoperability infrastructure."
keywords:
  - EIL
  - interoperability
  - cross-chain
  - trustless
  - XLP
  - multichain
  - ethereum-foundation
---

# Ethereum Interoperability Layer (EIL): What It Means for Wallets

*Trustless cross-chain token movements without custody risks or trust assumptions.*

## The Cross-Chain Challenge

Users operate across multiple chains. They hold assets on Ethereum, Arbitrum, Base, Optimism, and more. Moving tokens between chains, coordinating operations across networks, and receiving funds from different ecosystems are daily requirements for wallet users.

For wallet developers, this creates integration complexity. Each cross-chain solution comes with its own trust model, integration requirements, and user experience trade-offs. Users expect seamless multichain experiences, but delivering that means making decisions about which infrastructure to rely on and what trust assumptions to pass along to users.

The Ethereum Foundation is building a different approach: native interoperability at the protocol level, where cross-chain token movements require no external trust assumptions.

## What is EIL?

The Ethereum Interoperability Layer (EIL) is Ethereum's native infrastructure for cross-chain operations. Rather than relying on external bridges or relayer networks, EIL enables trustless token movements through cryptographically enforced intents and a competitive liquidity provider network.

The core principle: users express what they want to happen across chains, and the network fulfills it without ever taking custody of user funds. The entire flow is verifiable onchain, atomic, and requires no trust in any intermediary.

EIL is part of Ethereum's long-term roadmap for L2 interoperability, designed to make cross-chain operations as secure and seamless as single-chain transactions.

For detailed technical specifications, see the [Ethereum Foundation's EIL announcement](https://blog.ethereum.org/2025/11/18/eil) and the official [EIL Github](https://github.com/eth-infinitism/eil-contracts).

## How It Works

EIL introduces Trustless Liquidity Providers (XLPs) who fulfill cross-chain intents without custodying user funds.

When a user wants to move tokens from one chain to another, they express an intent: "I have 100 USDC on Arbitrum, I want 100 USDC on Base." This intent is registered onchain. XLPs observe the intent and compete to fulfill it by releasing funds to the user on Base. Once the user receives funds on the destination chain, the XLP claims the locked funds on the source chain.

The critical property is atomicity. The XLP's fulfillment on the destination chain and their claim on the source chain are cryptographically linked. Either both happen or neither does. The XLP never holds user funds in custody—they provide liquidity, and the protocol ensures correctness.

Verification happens through Merkle proofs that span chains, allowing contracts on one chain to verify state on another without trusting any external party. This is the same cryptographic foundation that secures Ethereum itself.

## What EIL Enables for Wallets

### Trustless Token Transfers

A user holds 1,000 USDC on Arbitrum but needs it on Base. With EIL, they sign an intent expressing this transfer. An XLP fulfills it by releasing 1,000 USDC to the user on Base, then claims the Arbitrum funds. The user's tokens move between chains without any intermediary taking custody. No bridge operator, no relayer trust, just cryptographically enforced atomic execution.

### Cross-Chain DeFi

A user has ETH on Optimism but wants to deposit into a yield vault on Base. With EIL, this becomes a single signed intent: "swap ETH for USDC on Optimism, move USDC to Base, deposit into vault." The entire sequence executes atomically. If any step fails, everything reverts. Users access the best yields across chains without manually bridging, swapping, and depositing in separate transactions.

### Seamless Cross-Chain Receiving

A user's wallet is on Base, but they're receiving a payment from someone on Polygon. With EIL, the recipient shares one address. The sender pays on Polygon, and the funds automatically appear on Base. No coordination about which chain to use, no manual bridging after receiving. The routing happens trustlessly through EIL's XLP network.

### Developer Benefits

Wallet developers integrating EIL-based infrastructure don't inherit external trust assumptions. When a user asks "is this safe?", the answer is straightforward: EIL uses Ethereum's security model. There's no bridge operator to evaluate, no relayer network to trust, no custody risk to explain. Cross-chain becomes as trustworthy as single-chain.

## Candide's EIL Integration

Candide is building EIL native infrastructure for wallets, abstracting the protocol complexity into simple SDK integrations, and helper developer utilities around user UX. Some products like Safe Unified Account are designed specifically for Safe accounts, while others like Forwarding Address work with any wallet.

### Safe Unified Account

One signature authorizes operations across all chains. Users sign once, and coordinated transactions execute across every network where they have a Safe. EIL enables the trustless cross-chain execution that makes this possible.

[Learn more about Safe Unified Account →](/account-abstraction/research/safe-unified-account)

### Forwarding Address

A single address that works on every chain. Users share one address, receive funds from any network, and assets automatically route to their preferred destination. EIL powers the trustless routing without any custody intermediaries.

[Learn more about Forwarding Address →](/account-abstraction/research/multichain-deposit-address)

### SDK Integration

Developers won't need to understand EIL internals to use these capabilities. Candide's SDK will abstract the complexity into straightforward function calls—express what you want to happen, and the SDK handles cross-chain coordination through EIL.

## Current Status

EIL is under active development by the Ethereum Foundation. Candide's EIL-native products are being built alongside the protocol's development, with production releases planned following EIL's mainnet launch.

For the latest on EIL development:
- [Ethereum Foundation Blog](https://blog.ethereum.org/2025/11/18/eil)
- [EIL Github](https://github.com/eth-infinitism/eil-contracts)

## Build With Us

We're looking for wallet teams interested in EIL-native cross-chain capabilities. If you're building multichain experiences and want trustless infrastructure without custody trade-offs, we want to talk.

We're also looking for liquidity providers interested in becoming XLPs for stablecoin liquidity. If you're operating liquidity infrastructure and want to participate in EIL's trustless cross-chain network, reach out.

Early partners will get access to our EIL integration as it develops, direct support, and the opportunity to shape how these capabilities work in production environments.

Reach out directly on Telegram: **[@heymarcopolo](https://t.me/heymarcopolo)**

---

*Technical questions? Reach out on [Discord](https://discord.gg/MfbK7aNWsY) or [GitHub](https://github.com/candidelabs)*

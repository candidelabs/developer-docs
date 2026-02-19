---
slug: safe-unified-account
title: "Safe Unified Account: One Signature, Every Chain"
description: Manage signers and guardians across Ethereum, Optimism, Arbitrum, and other networks with a single signature. Pure cryptographic verification via Merkle proofs.
authors: [marc]
tags: [safe-unified-account, cross-chain, multichain, eil, interoperability]
---

# Safe Unified Account: One Signature, Every Chain

We just released Safe Unified Account. You can now manage signers and guardians across Ethereum, Optimism, Arbitrum, and other networks, all with a single signature.

<!-- truncate -->

## What makes this different

- **No relayers. No bridges.** Pure cryptographic verification via Merkle proofs
- **User initiated.** They control when each chain executes

We stayed out of the chain abstraction hype last year because every solution required trusted infrastructure. Ethereum Interoperability Layer (EIL) changes that: L1 as the source of truth finally makes trustless crosschain token transfer possible.

The first version of the unified account solves a specific problem. Teams building onchain neobanks and treasury platforms across 5+ L2s told us the same thing: coordinating multiple signing ceremonies for every configuration change is exhausting. Rotating a key shouldn't require five separate transactions across five different UIs. Adding recovery methods on each chain is impossible for end users to manage.

## Try it yourself

[Demo on Sepolia networks](https://unified.candide.dev)

## Heads Up: This is an early release

Safe Unified Account is in early release and unaudited. We're sharing it now with builders who want to experiment and give feedback. If you're managing real funds, wait for the audit.

We'd love your take. If you're building multichain products, try the demo and tell us what you think. Find us on Discord.

~ Marc

---

*P.S. Safe Unified Account is open source. If you want to dig into the Merkle proof implementation or see how EIL integration works, the code is on [GitHub](#).*

---
title: "Forwarding Address"
description: "A forwarding address that works across all blockchains, enabling instant cross-chain asset routing"
keywords:
  - cross-chain
  - forwarding
  - user-experience
  - concept
  - interoperability
  - routing
  - multichain
---

# Forwarding Address: One Address for Every Chain

*A single address that receives assets from any chain and automatically routes them to your destination.*

<img src="/img/posters/forwarding-address.png" alt="Forwarding-Address" width="500" />

## The Cross-Chain Receiving Problem

Users hold assets across multiple chains. When they need to consolidate funds or receive a payment, the sender's chain rarely matches the recipient's preferred chain. Today, handling this requires the recipient to share a chain-specific address, then manually bridge assets afterward, or ask the sender to bridge first. Neither option is practical.

For wallet providers, this creates friction at a critical moment. A user wants to receive USDT, but the sender is on Arbitrum while the user operates primarily on Base. The choices are: reject the payment, explain bridging to the sender, or accept funds on the wrong chain and deal with it later. All of these degrade the experience.

The problem compounds as users spread across more L2s. Managing receiving addresses per chain, or explaining to senders which chain to use, doesn't scale.

## The Solution: Forwarding Address

A Forwarding Address is a single address that works on any supported chain. Assets sent to this address are automatically routed to the user's destination chain. The sender doesn't need to know or care which chain the recipient uses.

The mechanism is straightforward: when funds arrive on the source chain, a smart contract deploys instantly and routes them to the destination. The sender sends to one address, the recipient receives on their preferred chain, and the routing happens automatically.

Consider a concrete example. A user's primary wallet is on Base, but they need to receive 100 USDT from someone on Arbitrum. Instead of coordinating chains or bridging manually, the sender simply sends to the user's Forwarding Address on Arbitrum. The funds are automatically routed to Base and appear in the user's wallet moments later.

For wallet providers, this simplifies the UX considerably. Users get one address to share regardless of context. Incoming funds from any chain consolidate automatically. There's no need to explain bridging or manage per-chain addresses.

| Manual Bridging | Forwarding Address |
| :--- | :--- |
| Recipient shares chain-specific address | Recipient shares one address |
| Sender must use the correct chain or bridge first | Sender uses any supported chain |
| Recipient bridges funds manually after receiving | Funds route automatically to destination |
| Multiple steps, gas on multiple chains | Single send, routing handled automatically |

## Use Cases

### Funding from Exchanges and On Ramps

Users onboarding through fiat on-ramps or funding from exchanges face chain mismatch friction. An on-ramp provider might only support deposits on Ethereum or Polygon, but the user's primary wallet operates on Base or Arbitrum. Similarly, transferring funds from a CEX that only supports Ethereum mainnet withdrawals to a wallet on an L2 requires manual bridging. With a Forwarding Address, users fund their address on whichever chain the provider supports, and funds automatically appear on their preferred chain. The same address works for CEX withdrawals, on-ramp deposits, and transfers from other wallets regardless of source chain.

### Cross-Chain Payments

Organizations and individuals making payments across different ecosystems encounter coordination overhead. A company operates on Polygon but needs to pay contractors who prefer Optimism or Arbitrum. Each payment requires either asking recipients which chain they want or forcing everyone onto the same chain. Forwarding Addresses eliminate this coordination. Recipients share one address, and payments automatically route to their preferred chain regardless of where the sender's funds originate. This works for payroll, vendor payments, peer-to-peer transfers, or any scenario where sender and recipient operate on different chains.

## How It Works

The Forwarding Address uses CREATE2 to generate a deterministic address that exists identically across all supported chains. When a user creates their Forwarding Address, the system computes an address that can be deployed on any chain at the same location. The sender can send funds to this address on any chain, even though the contract doesn't exist there yet.

When funds arrive on the source chain, the receiving transaction triggers contract deployment at the predetermined address. The deployed contract is a lightweight forwarder that immediately initiates cross-chain routing to the user's destination chain. This deployment happens atomically with the incoming transfer, requiring no manual intervention.

The routing mechanism leverages the Ethereum Interoperability Layer's trustless liquidity provider network. The forwarder contract signals a cross-chain intent: "send X USDT from Arbitrum, receive X USDT on Base." Trustless liquidity providers (XLPs) observe this intent and fulfill it by releasing funds to the user on Base while claiming the locked funds on Arbitrum. 

From the user's perspective, they share one address, someone sends funds to it on any chain, and moments later the funds appear on their destination chain. The deployment, routing coordination, and XLP fulfillment all happen automatically.

## EIL Integration

The Forwarding Address is designed around the Ethereum Foundation's [Interoperability Layer (EIL)](https://blog.ethereum.org/2025/11/18/eil), making cross-chain routing trustless and self-custodial.

Traditional bridges require trusting a bridge operator or multi-party relayer network. The Forwarding Address eliminates this trust assumption by using EIL's XLP network. XLPs are trustless liquidity providers who fulfill cross-chain transfers without ever custodying user funds. They operate under cryptographically enforced rules where fulfillment on the destination chain is atomically linked to claiming funds on the source chain.

When funds arrive at a Forwarding Address, the deployed contract creates a verifiable cross-chain intent. XLPs compete to fulfill this intent, providing the user with funds on their destination chain in exchange for claiming the source chain funds. The entire flow executes through onchain contracts with no trusted intermediaries.

This matters because cross-chain UX improvements often come at the cost of security. Users gain convenience but hand custody to a bridge or relayer. The Forwarding Address delivers seamless cross-chain receiving while preserving the security guarantees users expect from Ethereum itself. Your funds remain under your control throughout, and the routing happens through provably correct onchain execution.

## Current Status

| Component | Status |
|-----------|--------|
| Forwarder contract | In Progress |
| EIL integration | Planned |
| XLP coordination | Planned |
| SDK integration | Planned |
| Audit | Planned |
| Production release | After audit |

## Build With Us

We're looking for wallet teams who want to offer seamless cross-chain receiving to their users. If you're building a wallet where users need to consolidate funds from multiple chains or receive assets regardless of which chain the sender is on, we want to talk.

Early partners will get direct integration support and the opportunity to shape the product based on real user needs. In return, we're looking for teams who can commit engineering resources and provide concrete feedback on how the Forwarding Address fits their UX.

Reach out directly on Telegram: **[@heymarcopolo](https://t.me/heymarcopolo)**

If you're still evaluating whether this fits your roadmap, we're happy to walk through the technical details and discuss how it would work in your specific context.

---

*Technical questions? Reach out on [Discord](https://discord.gg/MfbK7aNWsY) or [GitHub](https://github.com/candidelabs)*

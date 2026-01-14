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

## The Cross-Chain Receiving Problem

Users hold assets across multiple chains. When they need to consolidate funds or receive a payment, the sender's chain rarely matches the recipient's preferred chain. Today, handling this requires the recipient to share a chain-specific address, then manually bridge assets afterward, or ask the sender to bridge first. Neither option is practical.

For wallet providers, this creates friction at a critical moment. A user wants to receive USDC, but the sender is on Arbitrum while the user operates primarily on Base. The choices are: reject the payment, explain bridging to the sender, or accept funds on the wrong chain and deal with it later. All of these degrade the experience.

The problem compounds as users spread across more L2s. Managing receiving addresses per chain, or explaining to senders which chain to use, doesn't scale.

## The Solution: Forwarding Address

A Forwarding Address is a single address that works on any supported chain. Assets sent to this address are automatically routed to the user's destination chain. The sender doesn't need to know or care which chain the recipient uses.

The mechanism is straightforward: when funds arrive on the source chain, a smart contract deploys instantly and routes them to the destination. The sender sends to one address, the recipient receives on their preferred chain, and the routing happens automatically.

Consider a concrete example. A user's primary wallet is on Base, but they need to receive 100 USDC from someone on Arbitrum. Instead of coordinating chains or bridging manually, the sender simply sends to the user's Forwarding Address on Arbitrum. The funds are automatically routed to Base and appear in the user's wallet moments later.

![Forwarding-Address](multichain-deposit-address.png)

For wallet providers, this simplifies the UX considerably. Users get one address to share regardless of context. Incoming funds from any chain consolidate automatically. There's no need to explain bridging or manage per-chain addresses.

| Manual Bridging | Forwarding Address |
| :--- | :--- |
| Recipient shares chain-specific address | Recipient shares one address |
| Sender must use the correct chain or bridge first | Sender uses any supported chain |
| Recipient bridges funds manually after receiving | Funds route automatically to destination |
| Multiple steps, gas on multiple chains | Single send, routing handled automatically |

## Trustless and Self-Custodial with EIL

The Forwarding Address isn't just about convenience. We're designing it to be fully trustless and self-custodial, aligned with the Ethereum Foundation's [Interoperability Layer (EIL)](https://blog.ethereum.org/2025/11/18/eil).

With EIL, the routing no longer requires trusting a bridge operator or third-party relayer. Trustless liquidity providers fulfill the transfer without ever custodying your funds, and the entire flow executes through onchain contracts under verifiable rules. The user remains in control of their assets throughout.

This matters because cross-chain UX improvements often come at the cost of trust assumptions. Users gain convenience but hand custody to a bridge or relayer. With EIL, the Forwarding Address delivers the same seamless experience while preserving the security guarantees users expect from Ethereum itself.

## Build With Us

We're looking for wallet teams who want to offer seamless cross-chain receiving to their users. If you're building a wallet where users need to consolidate funds from multiple chains or receive assets regardless of which chain the sender is on, we want to talk.

Early partners will get direct integration support and the opportunity to shape the product based on real user needs. In return, we're looking for teams who can commit engineering resources and provide concrete feedback on how the Forwarding Address fits their UX.

Reach out directly on Telegram: **[@heymarcopolo](https://t.me/heymarcopolo)**

If you're still evaluating whether this fits your roadmap, we're happy to walk through the technical details and discuss how it would work in your specific context.

---

*Technical questions? Reach out on [Discord](https://discord.gg/MfbK7aNWsY) or [GitHub](https://github.com/candidelabs)*

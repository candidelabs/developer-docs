---
title: Introduction to ERC-4337 Bundlers
description: A new modular, developer-friendly and lightning-fast Python Bundler for Ethereum EIP-4337 Account Abstraction
image: /img/posters/voltaire-meta.png
---

# Introduction To Candide's Voltaire

Voltaire is a modular, developer-friendly, and lightning-fast Python Bundler for Ethereum EIP-4337 Account Abstraction.

:::info
Looking for a quick bundler instance? Use one of our [public hosted endpoints](./3-rpc-endpoints.mdx) for development.
:::

Voltaire is a fully open-source project designed to operate within the peer-to-peer mempool of UserOperations, enabling faster and more efficient on-chain transaction inclusion.

The code is freely available on [GitHub](https://github.com/candidelabs/voltaire) under a permissive license. We encourage the community to fork, contribute documentation, submit issues and pull requests, ask questions, or stress-test the implementation.

## ERC-4337 Account Abstraction

ERC-4337 enables account abstraction without compromising decentralization or censorship resistance. It maintains the same level of decentralization as the underlying chain's block production. Practically, this means providing access to smart contract wallets without relying on centralized relayers controlled by a single entity.

Centralized relayers are replaced with a peer-to-peer network of **Bundlers**.

## How Bundlers Work

A Bundler operating in a public mempool functions as a block builder or MEV searcher. As Account Abstraction adoption grows, an increasing share of user transactions will flow through bundles, shifting MEV opportunities from blocks to bundles. Block builders that don't partner with or operate bundlers will miss out on this growing MEV share. Bundlers will optimize for MEV extraction to maximize profits.

### Bundler Role

- Users propagate `UserOperations` to a network where any bundler can process them
- Bundlers receive and submit `UserOperations` to the EntryPoint contract without modifying them

### UserOperation Flow

From a Bundler's perspective, the UserOperation flow works as follows:

1. Wallet clients send individual `UserOperations` to Bundlers
2. Bundlers maintain pending UserOps in memory and propagate them to other mempool nodes
3. Bundlers broadcast peer-to-peer messages for each incoming UserOp
4. For efficiency, the P2P protocol supports batching multiple UserOps in a single message—primarily for syncing new bundlers joining the network
5. When creating a bundle, each bundler can freely choose the size and order—from empty to the entire mempool (within transaction and block gas limits). This is where flashbots-style APIs for searchers integrate
6. Larger bundles reduce overhead: the fixed 21,000 gas cost, EntryPoint contract overhead, and variable costs through "warm" address reuse across operations

## Voltaire

Voltaire currently maintains complete test suite coverage. While the ERC-4337 specification continues to evolve, all updates will maintain full compliance coverage.

As open-source developers, we evaluated every Ethereum client implementation and considered various architectures and languages. We built Voltaire from scratch optimizing for: performance, modularity, developer-friendly language, and open licensing.

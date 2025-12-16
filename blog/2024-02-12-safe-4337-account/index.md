---
slug: safe-erc4337
title: Candide & Safe - Introducing the V2 Canonical 4337 Safe Account to AbstractionKit
description: AbstractionKit is a Typescript Library to easily build and send ERC-4337 UserOperations, with first class support for Safe Accounts.
image: "/img/posters/abstracitonkit-blog-poster.png"
authors: [sherif]
tags: [sdk]
---

![abstractionkit_poster](/img/posters/abstracitonkit-blog-poster.png)

Candide released AbstractionKit v0.1.x, adding first-class support for the fully audited [ERC-4337 Safe canonical module](https://github.com/safe-global/safe-modules/tree/main/modules/4337), audited by OpenZeppelin and Ackee. AbstractionKit empowers developers to build Smart Wallets using Safe Contracts and the ERC-4337 standard, unlocking new possibilities:

<!-- truncate -->

**Enhanced Account Security:** Leverage battle-tested Safe Contracts to seamlessly integrate various authentication methods, ensuring robust account security with features designed for easy login and recovery.

**Gas Fee Abstraction:** AbstractionKit simplifies gas management for users, providing options to completely abstract gas concerns or allow users to pay fees in different ERC-20 tokens such as stablecoins.

**One-Click Interfaces:** Simplify transaction workflows by enabling batched transactions or automated execution of multiple transactions atomically.

AbstractionKit features a lightweight design minimizing external library dependencies. It natively interacts with Safe Contracts without external wrappers. The interface balances intuition and flexibility, empowering developers to override gas estimates and state. The library provides two method sets catering to different developer preferences:

- The Essentials method provides comprehensive functionality with override support for a simplified, efficient approach
- The Advanced method provides intricate control and customization options for developers requiring detailed configurations

AbstractionKit includes Candide infrastructure with hosted Bundlers and a Paymaster API, ready for immediate use. It's Ethereum interface library-agnostic, working with ethers, viem, or web3.js. It also works with any Bundler client through ERC-4337 standardization across platforms like LlamaNodes, BlockPi, and other Account Abstraction providers.

Thanks to support from the [Safe Grants Program](https://grants.safe.global), Candide secured funding to develop [The Reference SDK for ERC-4337 Safe](https://twitter.com/candidelabs/status/1719039290842239225). While ERC-4337 introduces a novel paradigm for account abstraction, its practical application has been limited by the adoption of battle-tested smart contract-based accounts, particularly Safe-based accounts.

The integration of Safe contracts into AbstractionKit paves the way for Safe Account adoption. This integration streamlines Smart Wallet development while ensuring wallets operate cohesively within the ecosystem, allowing applications to expand their user bases with the battle-tested Safe smart account standard.

To begin using AbstractionKit, visit the [getting started](https://docs.candide.dev/wallet/atelier-intro/) tutorial and install with `npm i abstractionkit`.

If you're building on account abstraction, reach out on [Twitter](https://twitter.com/@candidelabs), Discord, or email us at team@candidelabs.com.

*Special thanks to Andre Thiessen, John Guilding, Thomas Wiesner, Shareef Hadid, Bertrand Juglas, Nicholas Rodrigues Lordello, and SungEun Choi for early feedback on pre-release versions of AbstractionKit.*

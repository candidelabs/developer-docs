---
slug: safe-erc4337
title: Candide & Safe - Introducing the V2 Canonical 4337 Safe Account to AbstractionKit
description: AbstractionKit is a Typescript Library to easily build and send ERC-4337 UserOperations, with first class support for Safe Accounts.
image: "/img/posters/abstracitonkit-blog-poster.png"
authors: [sherif]
tags: [sdk]
---

![abstractionkit_poster](/img/posters/abstracitonkit-blog-poster.png)

Candide released AbstractionKit v0.1.x, adding first-class support for the new fully audited [ERC-4337 Safe canonical module](https://github.com/safe-global/safe-modules/tree/main/modules/4337). Audits by Open Zepplin and Ackee. At its core, AbstractionKit empowers developers to build Smart Wallets using Safe Contracts and the ERC-4337 standard, ushering in a new era of possibilities:

<!-- truncate -->

**Enhanced Account Security:** Leveraging battle-tested Safe Contracts, developers can seamlessly integrate various authentication methods, ensuring robust account security with features designed for easy login and recovery.

**Gas Fee Abstraction:** AbstractionKit takes the hassle out of gas management for users, providing the option to completely abstract gas concerns or allowing users to pay fees in different ERC-20s tokens such as stablecoins.

**One-click Interfaces:** AbstractionKit simplifies transaction workflows by enabling batched transactions or the automated execution of multiple transactions in a single one.

AbstractionKit embodies a lightweight design to minimize dependencies on external libraries. It natively interacts with Safe Contracts, without any external wrapping to other libraries. The interface strikes a balance between intuition and flexibility, empowering developers with the ability to make overrides, such as gas estimates and state overrides. The library provides two distinct sets of methods, catering to developers who prefer minimal abstraction and a high-level library approach:

- The Essentials method provides a comprehensive set of functionalities with support for overrides, delivering a simplified and efficient approach.
- The Advanced method provides intricate control and customization options, specifically tailored for developers seeking detailed configurations.

AbstractionKit comes equipped with a suite of infrastructure with Candide, including hosted Bundlers and a Paymaster API, ready for developers to use right out of the box. It is Ethereum interface library-agnostic; it can be used with ethers, viem, or web3js. Furthermore, it can be used with any Bundler client, thanks to ERC-4337 standardization across different platforms like LlamaNodes, BlockPi, or other Account Abstraction Providers.

Thanks to the support from the [Safe Grants Program](https://grants.safe.global), Candide secured funding for the development of [The Reference SDK for ERC-4337 Safe](https://twitter.com/candidelabs/status/1719039290842239225). While ERC-4337 introduces a novel paradigm for account abstraction, its practical application has been hindered by the so far limited adoption of battle tested smart-contract based accounts, in particularly Safe based accounts.

The introduction of Safe contracts to AbstractionKit paves the way for the adoption of Safe Accounts. This integration not only aims to streamline the development of Smart Wallets, but also ensures that these wallets operate cohesively within the ecosystem. It allows applications and their user bases to be expanded with the most battle tested Safe smart account standard.

To begin using AbstractionKit, visit the [getting started](https://docs.candide.dev/wallet/atelier-intro/) tutorial starting with `npm i abstractionkit`.

If you are building on account abstraction, reach out on [twitter](https://twitter.com/@candidelabs), Discord or come say hello at team@candidelabs.com

*Special thanks to Andre Thiessen, John Guilding, Thomas Wiesner, Shareef Hadid, Bertrand Juglas, Nicholas Rodrigues Lordello and SungEun Choi for the early feedback on pre-releases versions for AbstractionKit.*

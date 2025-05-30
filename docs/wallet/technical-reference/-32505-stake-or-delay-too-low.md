---
title: "Bundler Error -32505 Paymaster or Aggregator stake or unstake-delay is too low" 
description: Transaction rejected because paymaster (or signature aggregator) stake or unstake-delay is too low
keywords: ['-32505', error, entrypoint, erc-4337]
---

# -32505 Paymaster or Aggregator stake or unstake-delay is too low  

This error code indicates that the paymaster or aggregator used in the user operation lacks the required stake with the EntryPoint.

While user operations are designed to not interfere with each other, certain "global" entities like paymasters, factories, and aggregators can be accessed by multiple user operations, potentially invalidating multiple previously valid ones.

To prevent misuse, ERC-4337 bundlers employ throttling or temporary bans on entities causing widespread invalidations in the mempool. To deter potential "sybil-attacks," these entities are obliged to stake with the EntryPoint, making Denial-of-Service (DoS) attacks financially impractical. It's important to note that this stake is never subject to reduction and can be withdrawn at any time, following a specified unstake delay.
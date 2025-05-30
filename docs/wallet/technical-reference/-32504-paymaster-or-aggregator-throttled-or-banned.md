---
title: "Bundler Error -32504 Paymaster or Aggregator Throttled or Banned"
description: Transaction rejected because paymaster (or signature aggregator) is throttled or banned
keywords: ['-32504', error, entrypoint, erc-4337]
---

# -32504 Paymaster or Aggregator Throttled or Banned

This error code signifies that the user operation has been declined due to the throttling or banning of the associated paymaster or aggregator.

To safeguard the bundler network from potential abuse, bundlers enforce measures that limit the actions of entities violating certain rules. If you encounter this error unexpectedly, it's crucial to investigate why the bundler has taken such action.

While user operations are designed not to interfere with one another, "global" entities like paymasters, factories, and aggregators can be accessed by multiple user operations, potentially invalidating previously valid ones.

To prevent misuse, ERC-4337 bundlers implement throttling, reducing the rate at which entities can submit user operations, or even temporarily banning them if they disrupt the mempool with invalidations. To deter "sybil-attacks," these entities are required to stake with the EntryPoint, making DoS attacks economically unviable. Importantly, this stake is never forfeited and can be withdrawn after a set unstake delay.
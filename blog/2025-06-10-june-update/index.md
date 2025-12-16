---
slug: june-updates
title: "June Updates: Transaction Previews, Debugging"
description: Candide releases Transaction Previews with Tenderly, Worldchain support, and 3x improvement to API speed and performance.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [userop-debugging,worldchain-support,transaction preview]
---

Our latest updates focus on new network support, developer experience, security, and performance.

<!-- truncate -->

## Transaction Previews
Show end users a preview of their transactions before signing. Explore the new [Tenderly integration](/wallet/guides/simulate-transaction/).

## Debugging Made Easier
Simulate UserOps directly on Candide's Dashboard to verify outcomes and state changes—useful for execution and calldata errors. Visit the new [dev-tools](https://dashboard.candide.dev/dev-tools) tab.

## Worldchain Support
We've rolled out Worldchain support for our Bundler and Paymaster APIs:
- InstaGas now supports sponsored transactions on Worldchain
- Gas payments in USDC and WDL are available on Worldchain. See the full list of [supported ERC-20 gas payments](/wallet/paymaster/tokens-supported/)

## 3x Faster API Performance
We've significantly improved our paymaster infrastructure, delivering better speed and performance on every sponsorship request. 

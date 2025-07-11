---
slug: june-updates
title: "June Updates: Transaction Previews, Debugging"
description: Candide releases Transaction Previews with Tenderly, Worldchain support and 3x improvement to its API speak and performence.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [userop-debugging,worldchain-support,transaction preview]
---

Our latest updates focused on new network support, developer experience, security and performance. What's newly released today

<!-- truncate -->

## Transaction Previews
Show end-users a preview of what their transaction will look before they sign. Explore the new [Tenderly integration](/wallet/guides/simulate-transaction/). 

## Debugging made easier
- Simulate userops directly on Candide's Dashboard to verify outcomes and state changes. Useful when you have execution/calldata errors. Visit the new [dev-tools](https://dashboard.candide.dev/dev-tools) tab. 

## Worldchain
We've rolled out Worldchain support on our Bundler and Paymaster API. 
- InstaGas now support sponsored transactions on Worldchain.  
- Gas Payments in USDC and WDL is now available on Worldchain. See the full supported list of [gas payments in erc20](/wallet/paymaster/tokens-supported/).

## 3x Faster API Performance
We've drastically improved our paymaster infrastructure to deliver better speed and performance on every sponsorship request. 

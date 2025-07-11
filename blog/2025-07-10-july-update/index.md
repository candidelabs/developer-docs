---
slug: july-update
title: "July Updates: Unified API, P2P Mempool Access"
description: Candide unifies its API endpoints for both the Bundler and the Paymaster, and opens access to the Unified mempool on Ethereum, Arbitrum and Optimism.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [unified-api,bundler,paymaster]
---

# July Updates: Unified API, P2P Mempool Access & More 

We've been shipping some big updates this month, all designed to streamline the developer experience and give you more power. Here’s the latest

<!-- truncate -->
## One API to Rule Them All

We've combined our Bundler and Paymaster endpoints into a single URL to make your life easier. We're also swapping out the chain prefix for the more standard chain id. The dashboard will be updated soon, but you can start using the new endpoint right away.

Before:

- **Bundler**: `https://api.candide.dev/bundler/v3/chain-name/API_KEY`

- **Paymaster**: `https://api.candide.dev/paymaster/v3/chain-name/API_KEY`

After:

- **Bundler & Paymaster**: `https://api.candide.dev/api/v3/CHAIN_ID/API_KEY`

No rush to switch over—the old endpoints will keep working just fine.
## More Stablecoins as Gas

You can now offer USDS and EURe as gas payments for your users. Check out the full list of [supported tokens](/wallet/paymaster/tokens-supported/).

## EIP-7702 is now live on Arbitrum and Polygon

Our Bundler and Paymaster now support EIP-7702 on Arbitrum and Polygon, on top of the existing live networks: Ethereum, Optimism, and Base. EIP-7702 lets regular EOA accounts upgrade to smart accounts. Get started here: [Check out the guide here](/wallet/guides/getting-started-eip-7702/).

## P2P Mempool Access is Coming Soon

We're getting ready to switch to the unified P2P mempool by default for our Bundler on Ethereum, Arbitrum, and Optimism. You don't have to do a thing, but your users will get better execution and pricing, faster transactions, and—most importantly—the censorship resistance that makes ERC-4337 account abstraction so powerful.

Curious about the Unified Shared Mempool? [Learn more about it here](/blog/account-abstractionkit-unified-mempool). 

Want early access? Just reach out.

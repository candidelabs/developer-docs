---
slug: july-update
title: "July Updates: Unified API, P2P Mempool Access"
description: Candide unifies its API endpoints for both the Bundler and the Paymaster, and opens access to the Unified mempool on Ethereum, Arbitrum and Optimism.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [unified-api,bundler,paymaster]
---

# July Updates: Unified API, P2P Mempool Access & More

We've shipped significant updates this month to streamline developer experience and enhance capabilities.

<!-- truncate -->
## Unified API Endpoint

We've unified our Bundler and Paymaster endpoints into a single URL for simplified integration. We're also standardizing from chain names to chain IDs. The dashboard will be updated soon, but you can start using the new endpoint now.

**Before:**

- **Bundler**: `https://api.candide.dev/bundler/v3/chain-name/API_KEY`
- **Paymaster**: `https://api.candide.dev/paymaster/v3/chain-name/API_KEY`

**After:**

- **Bundler & Paymaster**: `https://api.candide.dev/api/v3/CHAIN_ID/API_KEY`

The old endpoints remain fully supported—no rush to migrate.

## Additional Stablecoin Gas Payments

USDS and EURe are now available as gas payment options for your users. View the complete list of [supported tokens](/wallet/paymaster/tokens-supported/).

## EIP-7702 Support on Arbitrum and Polygon

Our Bundler and Paymaster now support EIP-7702 on Arbitrum and Polygon, expanding on existing support for Ethereum, Optimism, and Base. EIP-7702 enables regular EOA accounts to upgrade to smart accounts. [Get started with our guide](/wallet/guides/getting-started-eip-7702/).

## P2P Mempool Access Coming Soon

We're preparing to switch to the unified P2P mempool by default for our Bundler on Ethereum, Arbitrum, and Optimism. This transition is seamless on your end, while your users gain better execution and pricing, faster transactions, and the censorship resistance that makes ERC-4337 account abstraction powerful.

Learn more about the [Unified Shared Mempool](/blog/account-abstractionkit-unified-mempool).

Want early access? Reach out to us.

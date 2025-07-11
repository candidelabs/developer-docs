---
slug: public-endpoints
title: Public Endpoints 
description: Candide provides public endpoints for our Bundler and Paymaster. No API required. Available on mainnets and testnets
image: /img/posters/voltaire-meta.png
authors: [sherif]
---

Candide provides public endpoints for our **Bundler** and **Paymaster**. No API required. Available on mainnets and testnets.

## Endpoint URL Format

All our public endpoints use the same simple URL format. Just add the **chain ID** for the network you want to use.

**Base URL:**

```
https://api.candide.dev/public/v3/
```

**Example (Sepolia Testnet - Chain ID 11155111):**

```
https://api.candide.dev/public/v3/11155111
```

## Supported Networks

See the list of [supported networks](/wallet/bundler/rpc-endpoints/).

## Supported Methods

See the list of the [Bundler API](wallet/bundler/rpc-methods/) and [Paymaster API](/wallet/paymaster/rpc-methods/).

## Rate Limit

To keep things running smoothly for everyone, we limit the number of requests you can make from a single IP address. If you send too many requests, you'll get a `Too Many Requests` error.

:::info
Need Higher Limits? For production use or higher rate limits, signup on [Candide's Dashboard](https://dashboard.candide.dev) to get your own Bundler and Paymaster URLs.
:::
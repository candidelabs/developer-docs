---
slug: authenticated-endpoints
title: API Keys & Endpoints
description: Authenticated Bundler and Paymaster endpoints for production. URL format, API key setup, and rate limits.
image: /img/posters/voltaire-meta.png
keywords: [api key, bundler endpoint, paymaster endpoint, authentication, rate limits]
---

Production integrations use authenticated endpoints with an API key. Get yours from [Candide's Dashboard](https://dashboard.candide.dev). No sales call required.

## Endpoint URL Format

One URL serves both the **Bundler** and **Paymaster** APIs. Add the chain ID and your API key:

```
https://api.candide.dev/api/v3/{CHAIN_ID}/{API_KEY}
```

**Example (Sepolia Testnet - Chain ID 11155111):**

```
https://api.candide.dev/api/v3/11155111/YOUR_API_KEY
```

The API key is a path segment: there are no separate auth headers. Treat the full URL as a secret.

:::caution
The older per-service URL formats (`/bundler/v3/` and `/paymaster/v3/` with chain names) are deprecated. Use the unified format above.
:::

## Example Request

```bash
curl https://api.candide.dev/api/v3/11155111/YOUR_API_KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "eth_supportedEntryPoints", "params": []}'
```

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x433709009B8330FDa32311DF1C2AFA402eD8D009",
    "0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108",
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032"
  ]
}
```

## Using with AbstractionKit

Pass the same URL wherever the SDK expects a bundler or paymaster endpoint:

```typescript
import { Bundler, CandidePaymaster } from "abstractionkit";

const endpoint = `https://api.candide.dev/api/v3/${chainId}/${apiKey}`;

const bundler = new Bundler(endpoint);
const paymaster = new CandidePaymaster(endpoint);
```

## Supported Methods & Networks

The full [Bundler API](/wallet/bundler/rpc-methods/) and [Paymaster API](/wallet/paymaster/rpc-methods/) are available on every [supported network](/wallet/api/supported-networks/).

## Rate Limits

Authenticated endpoints have higher rate limits than the [public endpoints](/wallet/api/public-endpoints/), scaled to your plan. UserOperation allotments per tier are listed on the [pricing page](/wallet/pricing/). If you hit a `Too Many Requests` error in production, [reach out](https://t.me/heymarcopolo) and we will look at your usage pattern together.

## Key Safety

- Keep keys out of client-side code where possible. For frontend paymaster flows, scope what a key can sponsor with [gas policies](/instagas/gas-policies/) so a leaked key cannot drain your gas tank.
- The repository holding your key config should never commit the full endpoint URL.
- If a key leaks, issue a new one from the [dashboard](https://dashboard.candide.dev), update your deployments, and remove the old key.

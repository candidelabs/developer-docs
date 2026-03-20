# Forwarding Address Integration Skill

You are integrating the Forwarding Address API: a JSON-RPC service that generates deterministic deposit addresses for cross-chain asset routing. Users send tokens to a forwarding address on any supported source chain, and the tokens are automatically bridged to the recipient's destination chain.

## Phase 1: Understand the Integration

Before writing any code, ask the developer:

1. **What are you building?** (wallet, exchange, payment app, bot, other)
2. **Tech stack?** (TypeScript/Node.js, Python, Go, etc.)
3. **Does your platform have a recovery address?** Determines how `custodialWithdrawer` is set. See "custodialWithdrawer" section below.
4. **One address per user, or one per transaction?** Determines whether to use the `salt` parameter.
5. **Long-lived or short-lived addresses?** Determines TTL management strategy.

Do not proceed until you have clear answers. These choices shape the entire integration.

## Phase 2: Plan the Integration

Based on their answers, propose an approach before writing code. Cover:

- Where the API calls happen (backend service, frontend, serverless function)
- How forwarding addresses are generated and stored
- TTL renewal strategy (if long-lived)
- How deposit arrival is detected (polling recipient balance on destination chain)
- Error handling and edge cases

Get the developer's approval before proceeding to implementation.

## Phase 3: Implement

Use the API reference below to build the integration. Follow this order:

1. Set up the JSON-RPC client
2. Query `forwarding_getRoutes` to discover supported routes
3. Implement address generation (`forwarding_getAddress` + `forwarding_activate`)
4. Add fee estimation if needed (`forwarding_estimateOutput`)
5. Add TTL renewal logic if long-lived addresses
6. Add deposit arrival detection (poll recipient balance on destination chain)
7. Add emergency recovery path if needed (`forwarding_deploy` + on-chain withdrawal)

---

## API Reference

### Protocol

JSON-RPC 2.0 over HTTP POST. Parameters are a single object inside a one-element array.

```
POST {FORWARDING_API_URL}
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "<method>",
  "params": [{ <params_object> }]
}
```

Successful responses have a `result` field. Errors have an `error` field with a `message` string.

### `forwarding_getRoutes`

Returns all supported source-to-destination chain pairs with accepted tokens, minimum amounts, and fees. Always call this first. It is the single source of truth for what is supported.

| Name | Type | Required | Description |
|---|---|---|---|
| `sourceChainId` | number | No | Filter by source chain |
| `destinationChainId` | number | No | Filter by destination chain |

Response:

```json
{
  "routes": [
    {
      "sourceChainId": 1,
      "sourceChainName": "Ethereum",
      "destinationChainId": 42161,
      "destinationChainName": "Arbitrum One",
      "tokens": [
        {
          "address": "0x0000000000000000000000000000000000000000",
          "symbol": "ETH",
          "decimals": 18,
          "destinationAddress": "0x0000000000000000000000000000000000000000",
          "minAmount": "10000000000000000",
          "feeBps": 50
        }
      ]
    }
  ]
}
```

Key fields:
- `tokens[].minAmount`: minimum deposit in smallest unit. Deposits below this are NOT forwarded.
- `tokens[].feeBps`: service fee in basis points (50 = 0.5%).
- `tokens[].address`: `0x0000000000000000000000000000000000000000` means native ETH.
- `tokens[].destinationAddress`: token address on the destination chain.

### `forwarding_getAddress`

Computes a deterministic CREATE2 proxy address. Pure computation, no side effects. Same inputs always return the same address.

| Name | Type | Required | Description |
|---|---|---|---|
| `recipient` | address | Yes | Destination address that receives forwarded tokens |
| `custodialWithdrawer` | address | Yes | Emergency recovery address that can withdraw stuck funds after a timelock. For most integrations, use the platform's address. See "custodialWithdrawer" section |
| `destinationChainId` | number | Yes | Chain ID where tokens are delivered |
| `salt` | bytes32 | No | Use different salts for multiple addresses per recipient |

Response: `{ "address": "0x..." }`

### `forwarding_activate`

Activates deposit monitoring on specified source chains with a TTL. Idempotent: calling again resets the TTL.

| Name | Type | Required | Description |
|---|---|---|---|
| `recipient` | address | Yes | Destination recipient |
| `custodialWithdrawer` | address | Yes | Same value used in getAddress |
| `destinationChainId` | number | Yes | Same value used in getAddress |
| `sourceChainIds` | number[] | Yes | Source chains to monitor |
| `salt` | bytes32 | No | Must match salt used in getAddress if one was used |

Response: `{ "address": "0x...", "active": true, "expiresAt": 1741132800 }`

- `expiresAt` is a Unix timestamp (seconds). The relayer stops monitoring after this time.
- Call activate again before expiry to keep the address alive.

### `forwarding_getActivation`

Checks whether the relayer is currently monitoring a forwarding address. Does NOT track deposit completion, only activation status.

| Name | Type | Required | Description |
|---|---|---|---|
| `address` | address | Yes | The forwarding address |

Response:

```json
{
  "address": "0x...",
  "sourceChains": [
    { "sourceChainId": 1, "status": "active", "expiresAt": 1741132800 },
    { "sourceChainId": 42161, "status": "expired", "expiredAt": 1740528000 }
  ]
}
```

### `forwarding_estimateOutput`

Estimates what the recipient receives after fees. Does not require an activated address.

| Name | Type | Required | Description |
|---|---|---|---|
| `sourceChainId` | number | Yes | Source chain |
| `destinationChainId` | number | Yes | Destination chain |
| `token` | address | Yes | Token address on source chain |
| `amount` | string | Yes | Input amount in smallest unit (decimal string) |
| `mode` | string | No | `"fast"` (default) or `"slow"`. Selects bridge routing strategy |

Response:

```json
{
  "destinationChainId": 42161,
  "outputToken": "0x...",
  "outputTokenSymbol": "ETH",
  "outputAmount": "990000000000000000",
  "relayerBotFee": "5000000000000000",
  "bridgeProtocolFee": "5000000000000000"
}
```

- Output = input minus relayerBotFee minus bridgeProtocolFee

### `forwarding_setMode`

Sets the bridging mode for a monitored forwarding address.

| Name | Type | Required | Description |
|---|---|---|---|
| `address` | address | Yes | The forwarding proxy address |
| `mode` | string | Yes | `"fast"` or `"slow"` |
| `sourceChainIds` | number[] | No | Specific source chains to update (all if omitted) |

Response: `{ "address": "0x...", "mode": "fast", "updated": 2 }`

### `forwarding_deploy`

Deploys the proxy contract on source chains for manual fund recovery. Not needed in normal flow. The relayer auto-deploys on first deposit. Only use this if funds are stuck.

| Name | Type | Required | Description |
|---|---|---|---|
| `recipient` | address | Yes | Destination recipient |
| `custodialWithdrawer` | address | Yes | Withdrawal-authorized address |
| `destinationChainId` | number | Yes | Target chain ID |
| `sourceChainIds` | number[] | No | Chains to deploy on (default: all) |
| `salt` | bytes32 | No | Must match salt used in getAddress if one was used |

Response: `{ "1": "0x...txhash" }` (map of chainId to tx hash)

---

## custodialWithdrawer

The `custodialWithdrawer` is the emergency recovery address for stuck funds. Both the `recipient` and the `custodialWithdrawer` can withdraw from the deployed contract on the source chain. The recipient can always withdraw immediately. The `custodialWithdrawer` can withdraw after a timelock.

This is critical: if a user funds their forwarding address from an exchange or any wallet they don't control on the source chain, and funds get stuck, they cannot send a withdrawal transaction on that chain. Without a separate `custodialWithdrawer`, those funds are permanently unrecoverable.

**For most integrations, set `custodialWithdrawer` to the platform's address, not the recipient.**

| Scenario | `custodialWithdrawer` | Risk |
|---|---|---|
| Wallet or dapp (recommended) | Platform's address | Platform can recover stuck funds after timelock. User can always withdraw immediately |
| Fully self-managed | Same as `recipient` | Only the user can recover. If they can't transact on the source chain, funds are lost |
| Custodial (exchanges) | Platform's address | Platform recovers on behalf of user after timelock |

When the developer says "non-custodial", still recommend setting `custodialWithdrawer` to their platform address. Explain the exchange funding risk. Only use `recipient` if the developer explicitly understands and accepts the tradeoff.

---

## Hard Rules

Do not skip these.

1. Always call `forwarding_getRoutes` before any other call to verify the route exists. Never assume chain IDs, tokens, or fees.
2. Never suggest sending unsupported tokens. Only tokens from the route's `tokens` array will be forwarded. Anything else gets stuck.
3. Never suggest sending below `minAmount`. These deposits are not forwarded. Convert `minAmount` to human-readable using the token's `decimals` when presenting to users.
4. Never suggest sending on the destination chain. The forwarding address receives on source chains only.
5. Activation is required. An address that is not activated (or has expired) will not have deposits forwarded. Always activate after computing the address.
6. There is no webhook for deposit completion. `forwarding_getActivation` checks if monitoring is active, not if a deposit was forwarded. To confirm arrival, poll the recipient's balance on the destination chain. Typical latency is 10 to 20 seconds.
7. Amounts are always in smallest unit. 1 ETH = `"1000000000000000000"` (18 decimals). 1 USDT = `"1000000"` (6 decimals). Use the token's `decimals` field for conversion.

## Validation Rules

Apply before making API calls:

1. Addresses must match `^0x[0-9a-fA-F]{40}$`
2. Chain IDs must appear in `forwarding_getRoutes` results. Do not guess or hardcode.
3. Token addresses must come from the route's `tokens` array for the chosen source-to-destination pair.
4. Amounts must be decimal strings in smallest unit (no floating point). Must be >= `minAmount` from routes.
5. `custodialWithdrawer`: see the "custodialWithdrawer" section below. For most integrations, this should be the platform's address, not the recipient.
6. `salt`: only use if the developer needs multiple addresses for the same recipient + destination.

## TypeScript Types

```typescript
interface RouteToken {
  address: string;
  symbol: string;
  decimals: number;
  destinationAddress: string;
  minAmount: string;
  feeBps: number;
}

interface Route {
  sourceChainId: number;
  sourceChainName: string;
  destinationChainId: number;
  destinationChainName: string;
  tokens: RouteToken[];
}

interface RoutesResult {
  routes: Route[];
}

interface AddressResult {
  address: string;
}

interface ActivationResult {
  address: string;
  active: boolean;
  expiresAt: number;
}

interface SourceChainActivation {
  sourceChainId: number;
  status: "active" | "expired";
  expiresAt?: number;
  expiredAt?: number;
}

interface ActivationStatus {
  address: string;
  sourceChains: SourceChainActivation[];
}

interface EstimateResult {
  destinationChainId: number;
  outputToken: string;
  outputTokenSymbol: string;
  outputAmount: string;
  relayerBotFee: string;
  bridgeProtocolFee: string;
}

interface SetModeResult {
  address: string;
  mode: "fast" | "slow";
  updated: number;
}

interface DeployResult {
  [sourceChainId: string]: string;
}
```

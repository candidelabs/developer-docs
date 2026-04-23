---
slug: abstractionkit-v0-3-3-release
title: "AbstractionKit v0.3.3"
description: Paymaster methods now return objects with tokenQuote/sponsorMetadata. CandidePaymasterContext moves back to its own argument. skipGasEstimation flag lets you bypass bundler gas estimation when the paymaster returns its own limits.
image: "/img/posters/abstractionkit-meta.png"
authors: [marc]
tags: [sdk, paymaster]
---

# AbstractionKit v0.3.3

![abstractionkit_poster](/img/posters/abstractionkit-poster.png)

Paymaster methods now return a named-field object instead of a tuple or raw UserOperation, and they surface the token quote the paymaster actually applied. `CandidePaymasterContext` is back as its own argument. A new `skipGasEstimation` flag lets `createUserOperation` bypass the bundler round trip when the paymaster is the source of truth for gas.

<!-- truncate -->

## Paymaster methods return objects, with a token quote

Three paymaster methods changed return shape. All now return `{ userOperation, tokenQuote? | sponsorMetadata? }`:

- `CandidePaymaster.createSponsorPaymasterUserOperation` returns `{ userOperation, sponsorMetadata? }`.
- `CandidePaymaster.createTokenPaymasterUserOperation` returns `{ userOperation, tokenQuote? }`.
- `Erc7677Paymaster.createPaymasterUserOperation` returns `{ userOperation, tokenQuote? }`.

The new `TokenQuote` type is exported from the package root:

```ts
type TokenQuote = {
  token: string         // ERC-20 token contract address used to pay gas
  exchangeRate: bigint  // scaled by 10^18 (1 ETH expressed in the token's smallest unit)
  tokenCost: bigint     // maximum token cost for this UserOperation
}
```

The exchange rate and max token cost were previously computed internally and discarded. Consumers had to fetch them again with `fetchTokenPaymasterExchangeRate` and `calculateUserOperationErc20TokenMaxGasCost` to show the user the charge. Now both are surfaced from a single call:

```ts
const { userOperation, tokenQuote } = await paymaster.createTokenPaymasterUserOperation(
  smartAccount, userOp, usdcAddress, bundlerRpc,
)

console.log(`User will pay up to ${tokenQuote.tokenCost} of USDC`)
```

`tokenQuote` is absent on sponsored flows and on the `signingPhase: "finalize"` path (no gas estimation, so nothing to recompute).

**Migration:**

```ts
// Before
const [sponsoredOp, sponsorMetadata] = await paymaster.createSponsorPaymasterUserOperation(...)
const tokenOp                        = await paymaster.createTokenPaymasterUserOperation(...)
const userOp                         = await erc7677.createPaymasterUserOperation(...)

// After
const { userOperation: sponsoredOp, sponsorMetadata } = await paymaster.createSponsorPaymasterUserOperation(...)
const { userOperation: tokenOp, tokenQuote }          = await paymaster.createTokenPaymasterUserOperation(...)
const { userOperation, tokenQuote }                   = await erc7677.createPaymasterUserOperation(...)
```

## CandidePaymasterContext is its own argument again

We tried folding `CandidePaymasterContext` into `overrides.context` in v0.3.0. It read worse than expected, especially with the two-phase `signingPhase` flow, so `context` is a dedicated argument again: it's the second-to-last positional on both `createSponsorPaymasterUserOperation` and `createTokenPaymasterUserOperation`, with `overrides` last.

```ts
// Before (0.3.0–0.3.2)
await paymaster.createSponsorPaymasterUserOperation(
  smartAccount, userOp, bundlerRpc, sponsorshipPolicyId,
  { context: { signingPhase: "commit" }, preVerificationGasPercentageMultiplier: 20 },
)

// After (0.3.3)
await paymaster.createSponsorPaymasterUserOperation(
  smartAccount, userOp, bundlerRpc, sponsorshipPolicyId,
  { signingPhase: "commit" },                                // context
  { preVerificationGasPercentageMultiplier: 20 },            // overrides
)
```

For `createTokenPaymasterUserOperation`, `context.token` is always derived from the `tokenAddress` argument, so pass `undefined` for context unless you need another field like `signingPhase`.

## skipGasEstimation on createUserOperation

`CreateUserOperationOverrides` (Safe accounts, `Simple7702Account`, and `Calibur7702Account`) now takes a `skipGasEstimation?: boolean` flag. When set, the SDK skips the bundler's `eth_estimateUserOperationGas` call; gas limits fall back to any overrides you pass, or `0n`.

```ts
const userOp = await smartAccount.createUserOperation(
  [tx], nodeUrl, bundlerUrl,
  { skipGasEstimation: true },
)
```

The returned UserOperation is always populated with a dummy signature, whether or not estimation ran. Previously the signature stayed `"0x"` when all three gas fields were overridden, which broke downstream paymaster calls that require a valid placeholder signature.

Useful when gas estimation is run separately: a paymaster sponsorship call that returns its own gas limits, or an ERC-7677 provider that estimates as part of `pm_getPaymasterStubData`.

## Also in this release

- **`CandidePaymaster` now parses sponsor info per ERC-7677.** The paymaster returns sponsor info under `sponsor: { name, icon? }` (singular `icon`) per [ERC-7677](https://eips.ethereum.org/EIPS/eip-7677). The previous code read a non-standard `sponsorMetadata` key and always returned `undefined`, so sponsor logos rendered as a broken `<img>`. The raw response is now normalized into the public `SponsorMetadata` shape (`{ name, description, url, icons[] }`).
- **`SponsorInfo` type exported** from the package root. Represents the raw ERC-7677 `{ name, icon? }` shape, for consumers who want to work with the pre-normalization response.

## Start building

Upgrade with `yarn add abstractionkit@0.3.3`. If you hit anything, find us on [Discord](https://discord.gg/8q2H6BEJuf).

## Resources

- [Examples repo](https://github.com/candidelabs/abstractionkit-examples)
- [AbstractionKit on GitHub](https://github.com/candidelabs/abstractionkit)
- [Changelog](https://github.com/candidelabs/abstractionkit/blob/v0.3.3/CHANGELOG.md)
- [Documentation](https://docs.candide.dev/wallet/abstractionkit/introduction/)

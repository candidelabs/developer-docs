---
slug: abstractionkit-v0-4-0-release
title: "AbstractionKit v0.4.0"
description: ethers is gone from the runtime, shrinking the install. The SDK now runs in browsers and React Native out of the box. New Safe v0.7 to v0.9 module migration helpers, revert-reason decoding, and stable AA-code parsing. Two breaking changes to read before upgrading.
image: "/img/posters/abstractionkit-meta.png"
authors: [marc]
tags: [sdk, react-native, paymaster, entrypoint-v09]
---

# AbstractionKit v0.4.0

![abstractionkit_poster](/img/posters/abstractionkit-poster.png)

`ethers` is no longer a runtime dependency, so the install footprint is smaller. The SDK now runs in browsers and React Native out of the box. Safe accounts get v0.7 to v0.9 module migration helpers, and error handling gets revert-reason decoding plus stable AA-code parsing. There are two breaking changes worth reading before you upgrade.

<!-- truncate -->

## ethers removed from the runtime

AbstractionKit no longer ships `ethers` as a runtime dependency. Account, paymaster, transport, signer, and utility surfaces now use an internal `ethereUtils` module for ABI encoding and decoding, keccak and hashing, typed-data, and `BigInt`-safe helpers.

Public API shapes are unchanged. This is a free win on upgrade: the install footprint shrinks and nothing in your integration needs to change.

A reminder worth repeating: AbstractionKit still does not lock your app into a specific web3 library. Use viem or ethers in your own code, your own RPC, any ERC-4337 bundler, and any ERC-7677 paymaster. Removing the internal dependency does not change that.

## Browser and React Native support, fixed

Two code paths used to throw `ReferenceError` outside of Node. `generateOnChainIdentifier` relied on `Buffer`, and ABI `string` decoding relied on `TextDecoder`, both undefined in browsers without a polyfill and in React Native and Hermes.

Both now use internal pure-JS UTF-8 helpers, so the SDK runs in browsers (Vite, webpack, esbuild) and React Native without extra setup.

Two details to note:

- UTF-8 decoding throws an `invalid UTF-8` error on malformed input (overlong, surrogate-range, out-of-range, or truncated sequences) rather than silently producing U+FFFD replacement characters. Do not expect replacement characters on bad input.
- The Calibur, Safe, and Simple7702 executor-calldata decode paths now hex-encode the inner `bytes` payload instead of UTF-8-decoding it. The old behavior corrupted the selector and arguments.

## Breaking changes

Two changes need attention before upgrading.

**1. Receipt `logs` are now structured.** `UserOperationReceipt.logs` and `UserOperationReceiptResult.logs` are a structured `Log[]` instead of a JSON-encoded string. Drop the parse and read the array directly:

```ts
// Before
const logs = JSON.parse(receipt.logs)

// After
const logs = receipt.logs
```

**2. The IIFE / UMD (`unpkg`) browser build is removed.** `dist/index.iife.js` and the `unpkg` field in `package.json` are gone. The `<script>` / CDN build was effectively unusable on its own: it externalized its runtime deps as page globals, so loading it without first providing those globals threw `ReferenceError`. Install via npm and use a bundler. The ESM (`dist/index.mjs`) and CJS (`dist/index.cjs`) entries are unchanged.

## Migrate a Safe from EntryPoint v0.7 to v0.9

We [announced EntryPoint v0.9 support in February](/blog/entrypoint-v09-support). This release adds the helper that migrates an already-deployed Safe from the v0.7 module to the v0.9 `Safe4337MultiChainSignatureModule`.

`createMigrateToSafeMultiChainSigAccountV1MetaTransactions` builds the `disableModule` + `enableModule` + `setFallbackHandler` batch. Both modules are stateless, so no storage clearing is required.

```ts
import { SafeAccountV0_3_0 as SafeAccount } from "abstractionkit"

const smartAccount = new SafeAccount(accountAddress)

const migrationBatch = await smartAccount.createMigrateToSafeMultiChainSigAccountV1MetaTransactions(
  nodeRpcUrl,
)
```

Unless you pass `{ skipPreflight: true }`, it first verifies on-chain that the account really is a Safe running the old module (the module is enabled **and** is the current fallback handler) on a Safe version `>= 1.4.1`. That turns a would-be cryptic on-chain `AA23` / `AA24` into a clear up-front error.

New readers back this up: `SafeAccount.getFallbackHandler(nodeRpcUrl)` returns the active 4337 module, `SafeAccount.getSafeVersion(nodeRpcUrl)` reads `VERSION()`, `JsonRpcNode.getStorageAt(address, slot, blockTag?)` reads raw storage, and the `SAFE_FALLBACK_HANDLER_STORAGE_SLOT` constant is exported.

## Decode revert reasons and AA codes

Two additions make failed UserOperations easier to debug.

`decodeUserOperationRevertReason(receipt)` reads the EntryPoint `UserOperationRevertReason` log directly from a mined receipt and returns the decoded reason (Error string, Panic code, or empty for likely out-of-gas), with no extra RPC call. It matches the receipt's `userOpHash`, so multi-op bundles return the right entry.

```ts
import { decodeUserOperationRevertReason } from "abstractionkit"

const revert = decodeUserOperationRevertReason(receipt)
```

EntryPoint `AAxx` revert codes (for example `AA21`) are now parsed into `AbstractionKitError.aaCode`, so you can branch on a stable contract-defined code instead of matching message text:

```ts
try {
  await smartAccount.sendUserOperation(userOp, bundlerUrl)
} catch (error) {
  if (error.aaCode === "AA21") {
    // account did not pay the prefund
  }
}
```

The `UserOperationRevert` type and the `parseAaCode` helper are exported.

## Also in this release

- **Signer functions may return synchronously.** `SignHashFn` and `SignTypedDataFn` return types widen to `Hex | Promise<Hex>`, so a local-key signer can return a signature without wrapping it in a `Promise`. Existing async signers are unaffected.
- **`SafeMultiChainSigAccount.estimateUserOperationGas`.** A new instance method estimates gas for a multi-chain-signature UserOperation against a bundler, matching the estimation surface already on the other account classes.
- **Instance-level manual signing helpers.** `SafeAccount` and `SafeMultiChainSigAccount` expose instance-level manual signing helpers that match the existing static EIP-712 helper API, so apps that already hold an account instance can sign without re-deriving the static call surface.
- **Paymaster `tokenCost` no longer rounds to zero on cheap-gas chains.** When `exchangeRate * maxGasCostWei < 10^18`, floor division collapsed `tokenCost` to `0n` and the prepended ERC-20 approval was also `0n`, causing reverts or the paymaster absorbing the full cost. The `Erc7677Paymaster` and `CandidePaymaster` cost paths and `calculateUserOperationErc20TokenMaxGasCost` now floor to a minimum of 1 token smallest-unit. Quote responses with a non-positive `exchangeRate` now throw `PAYMASTER_ERROR` instead of silently feeding a zero rate into the math.
- **v0.6 `verificationGasLimit` multiplier fixed.** The paymaster multiplier in `calculateUserOperationMaxGasCost` was applied to the wrong factor on v0.6 UserOperations, undercounting the maximum gas cost.
- **`createDisableModuleMetaTransaction` now paginates.** The predecessor lookup read a single `getModulesPaginated` page, so a Safe with more enabled modules than the page size could miss the target or compute the wrong linked-list predecessor. It now walks every page.
- **Tenderly API key masked.** `callTenderlySimulateBundle` errors no longer surface the raw access key in their context payload.

## Start building

Upgrade with `yarn add abstractionkit@0.4.0`. Read the two breaking changes above first, then enjoy the smaller install and the out-of-the-box browser and React Native support.

If you hit anything or want to talk through a design, find us on [Discord](https://discord.gg/8q2H6BEJuf).

## Resources

- [Examples repo](https://github.com/candidelabs/abstractionkit-examples)
- [AbstractionKit on GitHub](https://github.com/candidelabs/abstractionkit)
- [Full changelog (v0.3.8 to v0.4.0)](https://github.com/candidelabs/abstractionkit/compare/v0.3.8...v0.4.0)
- [Documentation](https://docs.candide.dev/wallet/abstractionkit/introduction/)

---
slug: abstractionkit-v0-3-0-release
title: "AbstractionKit v0.3.0"
description: SafeMultiChainSigAccountV1 is audited by Nethermind. Calibur joins Simple7702Account as a second EIP-7702 option. CandidePaymaster adds parallelizable signing on EntryPoint v0.9, cutting latency between tap and confirmation.
image: "/img/posters/abstractionkit-meta.png"
authors: [marc]
tags: [sdk, chain-abstraction, eip-7702, entrypoint-v09]
---

# AbstractionKit v0.3.0

![abstractionkit_poster](/img/posters/abstractionkit-poster.png)

Safe Unified Account is audited by Nethermind. Calibur joins `Simple7702Account` as a second EIP-7702 account design. And `CandidePaymaster` now does parallelizable paymaster signing on EntryPoint v0.9.

<!-- truncate -->

## Safe Unified Account, audited

Safe Unified Account is now audited by Nethermind. If you were waiting for the audit before building on it, this is the release. We [first shipped it in February](./safe-unified-account).

The API is unchanged. Sign once, execute anywhere. Key rotations, guardian updates, account configuration: one signing session covers every chain. Each leaf in the Merkle tree is a UserOperation hash. You sign the root, each chain receives the signature plus a Merkle proof, and verification happens independently onchain. No relayers. No bridges.

```typescript
import { SafeMultiChainSigAccountV1 as SafeAccount } from "abstractionkit"

const signatures = smartAccount.signUserOperations(
  [
    { userOperation: userOp1, chainId: chainId1 },
    { userOperation: userOp2, chainId: chainId2 },
  ],
  [ownerPrivateKey],
)
```

**Breaking change:** `ExperimentalSafeMultiChainSigAccount` is now `SafeMultiChainSigAccountV1`. Update imports.

[Chain Abstraction quickstart](/wallet/guides/chain-abstraction-getting-started/) · [SDK reference](/wallet/abstractionkit/safe-unified-account)

## Calibur: EIP-7702 with real key management

Calibur is the EIP-7702 account built by the Uniswap team for the Uniswap Wallet. It is audited by Cantina and OpenZeppelin. We added support because Calibur is one of the few EIP-7702 implementations designed for EOA upgrades from the ground up, not retrofitted from an existing account.

It complements `Simple7702Account`. Reach for Simple when you want batching and sponsorship on top of an EOA with minimal surface area. Reach for Calibur when you want real key management: passkeys, multikey, per-key hooks, revocable delegation.

What you get:
- Same address after delegation. No migration.
- Batching and gas sponsorship on EntryPoint v0.8.
- Passkey authentication via the EIP-7951 P256 precompile.
- Multikey management with per-key hooks. Register, revoke, and configure keys directly on the account.
- Delegation revocation via `createRevokeDelegationRawTransaction` if the user wants to return to a plain EOA.

```typescript
import { Calibur7702Account } from "abstractionkit"

const smartAccount = new Calibur7702Account(eoaAddress)

let userOperation = await smartAccount.createUserOperation(
  [tx1, tx2],
  nodeUrl,
  bundlerUrl,
)

userOperation.signature = smartAccount.signUserOperation(
  userOperation, privateKey, chainId
)
```

`Calibur7702Account` auto-checks delegation state inside `createUserOperation`, so upgrading an EOA for the first time just works.

[Calibur quickstart](/wallet/guides/getting-started-calibur/) · [SDK reference](/wallet/abstractionkit/calibur-account)

## Parallelizable paymaster signing

We [announced EntryPoint v0.9 support in February](./entrypoint-v09-support) through the Voltaire Bundler and `Simple7702AccountV09`. This release wires the new v0.9 paymaster flow into `CandidePaymaster` so apps can use it end to end.

Why it matters: under v0.8, the paymaster had to sign **before** the user, because the paymaster signature was part of what the user was signing over. That meant a paymaster round trip sitting between "user taps send" and the wallet's confirmation UI. On v0.9, a dedicated `paymasterSignature` field lets the paymaster sign **after** the user. The paymaster round trip can run in parallel with the user signing ceremony, and the confirmation UI shows up sooner.

`CandidePaymaster` exposes this through a two-phase `signingPhase` context. **Commit** requests sponsorship before the user signs. **Finalize** attaches the paymaster signature afterwards:

```typescript
const commitOverrides   = { context: { signingPhase: "commit"   as const } }
const finalizeOverrides = { context: { signingPhase: "finalize" as const } }
```

`CandidePaymaster` is unified around `pm_getPaymasterData` and is [ERC-7677](https://eips.ethereum.org/EIPS/eip-7677) compliant. Any wallet or dapp that speaks the Paymaster Web Service Capability standard can talk to it directly. Token paymaster flows run on v0.9, and `Simple7702AccountV09` supports the two-phase flow alongside Safe Unified Account. AbstractionKit continues to support v0.7 and v0.8 in the same build.

## Also in this release

- **Delegation introspection.** `getDelegatedAddress` and `isDelegated` let you check EIP-7702 delegation state before sending a UserOperation.
- **Safe Allowance Module v1.0.0.** The v0.1.0 address is kept as a legacy constant for migrations.
- **USDT-safe approvals.** SafeAccount multisend now prepends `approve(0)` for ERC-20s that require an allowance reset, so batched approvals no longer silently revert.
- **Agent skill for Safe Unified Account.** A single markdown file a coding agent can read to integrate the account end to end:
  ```bash
  claude "Read https://docs.candide.dev/safe-unified-account-agent-skill.md and integrate the Safe Unified Account"
  ```

A reminder worth repeating: AbstractionKit does not lock your app into a specific web3 library, node provider, bundler, or paymaster. Use viem or ethers, your own RPC, any ERC-4337 bundler, and any ERC-7677 paymaster. No vendor lock-in.

## Start building

Safe Unified Account is audited. Calibur is in the SDK. `CandidePaymaster` is faster. Pick whichever fits what you're building.

If you run into something or want to talk through a design, find us on [Discord](https://discord.gg/8q2H6BEJuf).

## Resources

- [Examples repo](https://github.com/candidelabs/abstractionkit-examples)
- [AbstractionKit on GitHub](https://github.com/candidelabs/abstractionkit)
- [Documentation](https://docs.candide.dev/wallet/abstractionkit/introduction/)

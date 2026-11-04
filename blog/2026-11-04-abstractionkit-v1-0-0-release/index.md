---
slug: abstractionkit-v1-0-0-release
title: "AbstractionKit v1.0.0"
description: Social Recovery Module v0.2.0 with Certora audit fixes, SafeMultiChainSigAccountV2 for Safe v1.5.0 on EntryPoint v0.9, and Uniswap Calibur v1.1.0 as the default EIP-7702 delegatee. Four breaking changes to read before upgrading.
image: "/img/posters/abstractionkit-meta.png"
authors: [marc]
tags: [sdk, recovery, safe, eip-7702, entrypoint-v09]
---

# AbstractionKit v1.0.0

![abstractionkit_poster](/img/posters/abstractionkit-poster.png)

AbstractionKit reaches 1.0. This release adds support for Social Recovery Module v0.2.0, which fixes the findings of Certora's audit, a new `SafeMultiChainSigAccountV2` that deploys Safe v1.5.0 on EntryPoint v0.9, and makes Uniswap Calibur v1.1.0 the default delegatee for EIP-7702 accounts. There are four breaking changes worth reading before you upgrade.

<!-- truncate -->

## Social Recovery Module v0.2.0

Social Recovery Module v0.2.0 fixes the findings of [Certora's audit](https://github.com/candidelabs/candide-contracts/releases/tag/recovery%2Fv0.2.0). It is a new deployment with new [addresses](/wallet/technical-reference/deployments/#social-recovery-module). v0.1.0 stays deployed and keeps working.

The SDK now ships one class per module version:

| Module | Class | Grace period selector | Request type |
| --- | --- | --- | --- |
| v0.2.0 | `SocialRecoveryModuleV2` | `SocialRecoveryModuleGracePeriodSelectorV2` | `RecoveryRequestV2` |
| v0.1.0 | `SocialRecoveryModuleV1` | `SocialRecoveryModuleGracePeriodSelectorV1` | `RecoveryRequestV1` |

`SocialRecoveryModuleV1` is what `SocialRecoveryModule` used to be, with the same addresses. Methods shared by both versions live on `SocialRecoveryModuleBase`, for code that accepts either.

:::warning
**If your users enabled the v0.1.0 module, use `SocialRecoveryModuleV1`.** Pointed at a v0.2.0 address, an account that enabled v0.1.0 has no guardians, and its recovery calls fail.
:::

New integrations should use v0.2.0.

What changes with v0.2.0:

- **Confirmations name the recovery nonce.** `createConfirmRecoveryMetaTransaction` takes the `nonce` before `execute`, and `createMultiConfirmRecoveryMetaTransaction` takes it before the signatures. Pass the nonce the guardians signed (`messageValue.nonce` from `getRecoveryRequestEip712Data`). The module reverts if the nonce changed before the transaction is included.
- **New EIP-712 domain version.** Guardian signatures use domain version `"0.2.0"`. Signatures made for v0.1.0 are not valid on v0.2.0.
- **`getRecoveryRequest` returns the nonce.** `executeAfter` is renamed `executableAt`.
- **Configuration changes cancel a pending recovery.** Adding or revoking a guardian, changing the threshold, and `cancelRecovery` all cancel the recovery in progress and invalidate the confirmations collected so far. `cancelRecovery` also works when no recovery is in progress.

```ts
import {
  SocialRecoveryModuleV2,
  SocialRecoveryModuleGracePeriodSelectorV2,
} from "abstractionkit"

const recoveryModule = new SocialRecoveryModuleV2(
  SocialRecoveryModuleGracePeriodSelectorV2.After3Days,
)

// The data each guardian signs, including the current recovery nonce
const { messageValue } = await recoveryModule.getRecoveryRequestEip712Data(
  nodeRpcUrl,
  chainId,
  accountAddress,
  [newOwnerAddress],
  1n, // new threshold
)

const confirmRecovery = recoveryModule.createConfirmRecoveryMetaTransaction(
  accountAddress,
  [newOwnerAddress],
  1, // new threshold
  messageValue.nonce,
  true, // execute
)
```

The full v0.1.0 versus v0.2.0 comparison is in the [Recovery Module reference](/wallet/plugins/recovery-module-reference/).

## SafeMultiChainSigAccountV2

`SafeMultiChainSigAccountV2` runs the same multi-chain signature module on EntryPoint v0.9 as `SafeMultiChainSigAccountV1`, but new accounts deploy the Safe L2 v1.5.0 singleton instead of v1.4.1. Signing, the EIP-712 helpers, and the Safe Passkey module v0.2.1 WebAuthn defaults are identical. Only the counterfactual address differs.

```ts
import { SafeMultiChainSigAccountV2 } from "abstractionkit"

const smartAccount = SafeMultiChainSigAccountV2.initializeNewAccount([ownerAddress])
```

Because the singleton only matters for address derivation and deployment, a deployed account can be attached with either class. `Safe_L2_V1_4_1` and `Safe_L2_V1_5_0` (singleton address and init hash) are now exported for the `safeAccountSingleton` override.

`SafeMultiChainSigAccountV1.initializeNewAccount` is now polymorphic, so subclasses get their own type back.

## Breaking changes

**1. Social Recovery classes are versioned.** `SocialRecoveryModule`, `SocialRecoveryModuleGracePeriodSelector`, and `RecoveryRequest` are replaced by the versioned names above. To keep your current behavior, rename to the `V1` classes:

```ts
// Before
import { SocialRecoveryModule, SocialRecoveryModuleGracePeriodSelector } from "abstractionkit"

// After, for accounts that enabled v0.1.0
import { SocialRecoveryModuleV1, SocialRecoveryModuleGracePeriodSelectorV1 } from "abstractionkit"
```

**2. `SafeAccountV1_5_0_M_0_3_0` is removed.** It ran Safe v1.5.0 on EntryPoint v0.7. For new Safe v1.5.0 accounts, use `SafeMultiChainSigAccountV2`.

**3. The Safe migration helper is renamed.** `SafeAccountV0_3_0.createMigrateToSafeMultiChainSigAccountV1MetaTransactions` is now `createMigrateToSafeMultiChainSigAccountMetaTransactions`. The batch enables the `Safe4337MultiChainSignatureModule` that V1 and V2 share, so a migrated account can be attached with either class (V2 for Safe v1.5.0). The old name still works as a deprecated alias and will be removed in the next release.

**4. `Calibur7702Account` delegates to Uniswap Calibur v1.1.0 by default.** `CALIBUR_UNISWAP_V1_0_0_SINGLETON_ADDRESS` is replaced by `CALIBUR_UNISWAP_V1_1_0_SINGLETON_ADDRESS` (`0x000000005c84F8Fd50b21CAC312528A64437030e`), the new default `delegateeAddress`. v1.1.0 keeps the EIP-712 domain, every selector the SDK uses, and the storage layout, so registered keys survive a re-delegation from v1.0.0. An EOA that stays on v1.0.0 passes `0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00` as `delegateeAddress`.

## Start building

Upgrade with `yarn add abstractionkit@1.0.0`. Read the four breaking changes above first. If you use social recovery, check which module version your accounts enabled before renaming.

If you hit anything or want to talk through a design, [contact us](https://www.candide.dev/contact).

## Resources

- [Examples repo](https://github.com/candidelabs/abstractionkit-examples)
- [AbstractionKit on GitHub](https://github.com/candidelabs/abstractionkit)
- [Full changelog (v0.4.0 to v1.0.0)](https://github.com/candidelabs/abstractionkit/compare/v0.4.0...v1.0.0)
- [Documentation](https://docs.candide.dev/wallet/abstractionkit/introduction/)

---
title: "Chain Abstraction with Safe Unified Account"
description: "Sign once, execute on every chain. Chain abstraction for Safe Accounts using multichain signatures for seamless account sync across chains."
keywords:
  - chain-abstraction
  - multichain
  - unified-account
  - cross-chain
  - account-sync
  - safe-module
---

# Chain Abstraction with Safe Unified Account

*Sign once, execute on every chain.*

Safe Unified Account is a Safe module that enables chain abstraction. Instead of signing separately on each chain, you sign once and that single signature authorizes execution across every chain you target. This works across any EVM chain where Safe is deployed: L2 rollups, sidechains like Gnosis Chain, and other L1s.

## Demo

Try the live demo at **[unified.candide.dev](https://unified.candide.dev)**

## What You Can Do

| Action | Without Chain Abstraction | With Safe Unified Account |
|--------|---------------------------|---------------------------|
| Replace owner on 5 chains | 5 signing sessions | 1 signature |
| Add recovery guardian on 5 chains | 5 signing sessions | 1 signature |
| Update multisig threshold on 5 chains | 5 signing sessions | 1 signature |
| Deploy consistent config to new chains | Manual per-chain setup | 1 signature |
| Consolidate USDC/USDT to one chain | Bridge from each chain separately | 1 signature triggers transfers via CCTP or LayerZero from all source chains |

## Audits

- [NM-0874 Audit Report](https://github.com/candidelabs/safe-4337-multi-chain-signature-module/blob/main/audit/NM_0874_Candide_safe.pdf)
- [Safe 4337 Multi-Chain Signature Module repository](https://github.com/candidelabs/safe-4337-multi-chain-signature-module)

## Examples

| Example | Description | Code |
|---------|-------------|------|
| Add Owner | Add an owner across chains with one signature | [add-owner.ts](https://github.com/candidelabs/abstractionkit-examples/blob/main/chain-abstraction/add-owner.ts) |
| Add Guardian | Sync recovery guardians across chains | [add-guardian.ts](https://github.com/candidelabs/abstractionkit-examples/blob/main/chain-abstraction/add-guardian.ts) |
| Passkey Signing | Use WebAuthn/passkeys for multichain signing | [add-owner-passkey.ts](https://github.com/candidelabs/abstractionkit-examples/blob/main/chain-abstraction/add-owner-passkey.ts) |
| EIP-712 Signing | Wallet-compatible signing for browser and hardware wallets | [add-owner-eip712-signed.ts](https://github.com/candidelabs/abstractionkit-examples/blob/main/chain-abstraction/add-owner-eip712-signed.ts) |

## Get Started

Follow the [Getting Started guide](/wallet/guides/chain-abstraction-getting-started) to add an owner across multiple chains with a single signature.

For the full SDK method reference, see [Safe Unified Account SDK Reference](/wallet/abstractionkit/safe-unified-account).

---

*Technical questions? Reach out on [Discord](https://discord.gg/MfbK7aNWsY) or [GitHub](https://github.com/candidelabs)*.

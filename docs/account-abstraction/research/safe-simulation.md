---
title: "Safe Simulation"
description: "Transaction simulation for Safe accounts that detects security-critical operations and verifies results cryptographically."
keywords:
  - simulation
  - transaction-preview
  - safe-operations
  - modules
  - delegate-calls
  - state-proofs
  - verification
---

# Safe Simulation: See What Transactions Actually Do

*Transaction simulation for Safe accounts that detects security-critical operations and verifies results cryptographically.*

<img src="/img/posters/safe-simulation.png" alt="Safe Simulation Transaction Preview" width="500" />

## The Problem: What Am I Actually Signing?

You're about to sign a Safe transaction. Your wallet shows some contract interaction, maybe a token approval, function calls with hex data. What is this transaction actually going to do to your Safe?

Safe accounts have security-critical operations that generic wallets don't understand. You might be adding a module that can execute transactions without your signature, changing owners, modifying your multisig threshold, or executing a delegate call that runs arbitrary code with your Safe's full authority. Standard wallet interfaces show token movements and contract calls, but they don't reveal what's changing in your Safe's security model.

Consider a transaction that appears to interact with a DeFi protocol. You see "approve 1000 USDC" and function calls you don't fully understand. Buried in that transaction is a call to `enableModule()` that grants a new contract permission to execute transactions from your Safe without additional signatures. If that module is malicious, your treasury is compromised the moment you sign. The approval was real, but it wasn't the dangerous part.

Existing simulation tools are built for EOA wallets. They don't understand Safe's module system, owner management, or threshold changes. Teams need to see "this transaction adds module X with these permissions" or "this changes your signing threshold from 2-of-3 to 1-of-3" before they sign. Without this visibility, every signature is a trust exercise.

## The Solution: Safe-Aware Simulation

Safe Simulation understands Safe account architecture and detects security-critical operations, presenting them in clear language before you sign.

The system identifies module operations, owner management changes, threshold modifications, delegate calls, and guard changes. Instead of "Call enableModule(0x1234...5678) on 0xabcd...ef00," you see "Enable new module: 0x1234...5678 (Unrecognized contract). This module will be able to execute transactions from your Safe without requiring additional signatures." Known modules like Social Recovery or Allowance are identified with context, while unknown contracts are flagged for scrutiny.

Detection alone isn't sufficient. Safe Simulation uses cryptographic state proofs and multi-node consensus to verify accuracy. The state your transaction executes against is proven to match onchain reality, and multiple independent nodes must agree on the result before anything is shown to you.

## Use Cases

### Treasury Operations

A DAO treasury executing DeFi strategies sees proposals that look like standard protocol interactions. Safe Simulation shows exactly what's happening: "Withdraw 50,000 USDC from Aave, deposit to Compound" and critically, what's NOT happening—no new modules, no owner changes, no delegate calls to unknown contracts. When a legitimate protocol upgrade requires approving a new contract, the simulation shows "Enable module: CompoundV3Strategy (matches known deployment)." When a phishing attack tries the same pattern, it shows "Enable module: 0xmalicious... (unrecognized contract, created 2 days ago)."

### Operational Roles

Teams delegating operational authority through modules need to see exactly what power they're granting. A finance lead getting a spending module sees "Enable AllowanceModule for owner 0xfinance...lead with 10,000 USDC daily limit" and can verify parameters match policy before signing. When someone attempts to modify permissions, the simulation shows "Increase AllowanceModule limit from 10,000 USDC to 100,000 USDC daily"—whether legitimate or malicious, you have the information to decide.

### Individual Account Security

Even individual Safe users benefit from operation visibility. When you interact with a new dApp or sign a gasless transaction from a third-party interface, you see exactly what permissions you're granting. Adding a recovery guardian shows as "Enable SocialRecoveryModule with guardians: [addresses] and 48-hour timelock." You can verify the guardian addresses are correct before enabling recovery.

## How It Works

State discovery begins by calling trace functions on RPC nodes to identify which accounts and storage slots the transaction will touch. Consensus is then established across multiple independent RPC providers, each queried for the state root at the simulation block. Unanimous agreement is required. Every provider must return an identical state root, or the simulation fails entirely. A single disagreement signals potential manipulation and halts the process.

For each discovered account and storage slot, Merkle Patricia Trie proofs are retrieved from the RPC providers. These proofs cryptographically bind state data to the consensus state root. Verification happens locally on your device, computing hashes and confirming they match the agreed-upon state root. Only when every proof validates does execution proceed.

With cryptographically verified state in hand, the transaction executes locally using revm, an auditable Rust EVM implementation running in your wallet's environment. This produces execution traces and state changes generated entirely on your device, eliminating reliance on remote execution services. The execution results are then analyzed against Safe's contract architecture, identifying calls to `enableModule()`, `addOwnerWithThreshold()`, `removeOwner()`, `changeThreshold()`, delegate calls, and guard modifications. Detected modules are matched against a registry of known Safe modules, surfacing context for recognized deployments while flagging unknown contracts with available metadata.

*This verification approach is detailed in [Trust-Minimized Transaction Simulation Using State Proofs](https://ethresear.ch/t/trust-minimized-transaction-simulation-using-state-proofs/23857) on Ethereum Research.*

## Limitations

Simulations assume your transaction executes in isolation at the current block. Actual onchain execution could have MEV, transaction reordering, or state changes from other transactions executing first. While every piece of state used in simulation is proven accurate through Merkle proofs, a malicious provider could theoretically hide storage slots by manipulating the initial trace call. Safe Simulation shows what operations are happening to your Safe's configuration, but it can't guarantee those operations are safe in every context or detect protocol-specific vulnerabilities.

For protection against these inherent limitations, [Safe Policies](/account-abstraction/research/safe-policies) provides complementary security. While simulation shows you what a transaction will do, policies enforce rules at execution time regardless of what the simulation showed. If state changes between simulation and execution, policy constraints still apply.

## Integration

Wallet developers integrate Safe Simulation through an SDK that handles detection and verification automatically. Simulation becomes a function call that takes a Safe transaction and returns detected operations with verification status. The response shows module changes, owner changes, threshold modifications, and delegate calls, along with metadata about consensus participation and proof validation.

## Current Status

| Component | Status |
|-----------|--------|
| State proof verification | Complete |
| Multi-node consensus | Complete |
| Rust EVM Simulation | Complete |
| SDK integration | Planned |

The core simulation and verification is production ready. Safe specific detection logic for modules, owners, delegates, and threshold changes is complete. We're building the SDK to make integration straightforward for wallet developers.

## Build With Us

We're looking for wallet teams building on Safe who want to show users what transactions actually do before they sign. If you're working on treasury management, multisig interfaces, or any application where users need clarity about Safe operations, we want to talk.

Early partners will get SDK access before public release, direct integration support, and the opportunity to shape which Safe operations we prioritize for detection. In return, we're looking for teams who can commit engineering resources to integration and provide concrete feedback on real-world usage.

Reach out directly on Telegram: **[@heymarcopolo](https://t.me/heymarcopolo)**

Once you message us, we'll get you set up with SDK access and work with your team on integration. If you're still evaluating whether this fits your roadmap, we're happy to walk through the technical details first.

---

*Technical questions? Reach out on [Discord](https://discord.gg/MfbK7aNWsY) or [GitHub](https://github.com/candidelabs)*

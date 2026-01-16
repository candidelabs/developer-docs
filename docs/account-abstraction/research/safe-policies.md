---
title: "Safe Policies"
description: "Composable security policies for Safe accounts enabling role-based permissions, spending controls, and automated transaction validation."
keywords:
  - policies
  - security
  - permissions
  - guards
  - roles
  - transaction-validation
  - cosigning
---

# Safe Policies: Composable Security for Safe Accounts

*Define granular security policies that validate transactions, enforce permissions, and protect against threats through onchain rules and offchain intelligence.*

## Beyond Signatures

Safe accounts require multiple signatures for transactions, protecting against single points of failure. But signatures alone don't solve all security problems.

A compromised key can still sign malicious transactions if it meets the threshold. Legitimate signers can make mistakes or approve dangerous operations without realizing it. Multisig coordination creates operational friction where routine treasury operations require the same ceremony as critical decisions. The signature requirement validates identity, not whether the action being authorized is safe or within policy bounds.

Organizations work around this by keeping operational funds in hot wallets controlled by individuals, defeating the purpose of the multisig. Teams need a way to delegate specific responsibilities without opening up full account access, while maintaining security constraints that apply regardless of who signs.

## The Solution: Safe Policies

Safe Policies provides composable transaction validation built on Safe's Policy Engine framework. Instead of one monolithic security check, you define multiple specialized policies that work together. Each policy focuses on a specific concern: role-based permissions, spending limits, address restrictions, delegate call protection, or offchain validation.

The system routes each transaction to appropriate policies based on what the transaction is trying to do. Policies validate independently and can block execution if checks fail. This creates a defense-in-depth model where multiple security layers protect the account, and all constraints must be satisfied before execution proceeds.

Policies can enforce positive permissions defining what's allowed, or negative restrictions defining what's blocked. A DeFi Manager role might have a policy authorizing specific protocol interactions, while a spending velocity policy blocks any transaction that would exceed daily limits regardless of who signs. Together, these create a complete security model that enables delegation while maintaining control.

## Policy Types

| Policy Type | What It Does | Example Use |
|-------------|--------------|-------------|
| **Role Permissions** | Authorize specific functions on specific contracts | DeFi Manager can call `deposit()` and `withdraw()` on Aave and Compound, but nothing else |
| **Spending Limits** | Cap amounts per time period | Max 10,000 USDC per day, max 50,000 USDC per month |
| **Velocity Limits** | Restrict transaction frequency | Max 5 transactions per hour, max 10 rebalancing operations per day |
| **Address Allowlists** | Only permit transfers to approved addresses | Treasury can only pay these 15 vendor addresses |
| **Address Blocklists** | Block known malicious addresses | Automatically block addresses flagged by security services |
| **Position Limits** | Cap exposure to protocols or assets | Max 100,000 USD per DeFi protocol, 250,000 USD total exposure |
| **Delegate Call Protection** | Time-locked allowlist or complete block | New delegates require 48-hour waiting period, or block entirely |
| **Function Restrictions** | Control which functions can be called | Can interact with lending protocols but not arbitrary contracts |
| **Cosigner Validation** | Offchain analysis with onchain enforcement | Transaction simulation, pattern analysis, address verification before signing |

Policies are modular and composable. You select the ones relevant to your security requirements and configure them with specific parameters. Multiple policies can apply to the same Safe, creating layered protection where different concerns are validated independently.

## Use Cases

### Team Treasury with DeFi Manager

Consider a company managing significant treasury assets with a DeFi Manager role responsible for yield optimization. The DeFi Manager needs to respond to market conditions quickly, rebalancing positions between protocols and claiming rewards without coordination overhead. But they shouldn't be able to drain the treasury or take excessive risks.

**Policies configured for the DeFi Manager:**
- **Function Permission Policy**: Authorized to call `deposit()`, `withdraw()`, `stake()`, `unstake()` on approved protocols (Aave, Compound, Curve). Any other function gets blocked.
- **Protocol Allowlist Policy**: Can interact only with vetted protocols. Attempting to interact with unapproved contracts gets blocked with notification that new protocols require 48-hour approval.
- **Position Limit Policy**: Maximum 100,000 USD exposure per protocol. Transactions that would exceed this limit get blocked.
- **Daily Movement Policy**: Maximum 50,000 USD in operations per 24 hours. Once reached, further movements blocked until the window resets.

**What this enables:** The DeFi Manager rebalances positions between Aave and Compound, moves 25,000 USDC from one to the other. All policy checks pass: functions are allowed, protocols are approved, position limits aren't exceeded, daily movement is within bounds. The transaction executes immediately without requiring signatures from other owners.

If the DeFi Manager attempts to transfer funds to an external address, the function permission policy blocks it since `transfer()` isn't authorized. If they try to interact with a new protocol, the allowlist policy blocks it and requires the 48-hour time-locked approval process. If they attempt to move 60,000 USDC after already moving 25,000 that day, the daily movement policy blocks it.

Even if the DeFi Manager role is completely compromised, an attacker cannot drain the treasury. They're constrained to legitimate operations within policy bounds, and any attempt to escalate privileges requires time delays that give the team opportunity to detect and respond.

### Individual User Protection

Individual users benefit from policies as protection layers beyond their signing key. A user sets a 1,000 USDC daily spending limit as a security measure. Even if their key is compromised through phishing or malware, the attacker cannot drain the account instantly.

Combined with a velocity policy limiting transactions to 5 per hour and a cosigner policy that simulates transactions before signing, the user gets comprehensive protection. The daily limit caps total damage. The velocity limit slows down automated attacks. The cosigner blocks suspicious transactions like transfers to known scam addresses or contract interactions that would drain the wallet.

These policies buy time for detection and response. A compromised key becomes much less valuable to an attacker when they can only extract 1,000 USDC per day at a constrained rate. The user likely notices the unauthorized transactions before significant loss occurs.

### Finance Operations

Teams need to execute routine payments without multisig coordination overhead. A Finance role with policies for vendor payments can handle payroll and expenses directly while maintaining security constraints.

**Configured policies:**
- Vendor allowlist: can transfer only to approved addresses
- Monthly budget: maximum 75,000 USDC across all payments
- Transaction size limit: individual payments capped at 10,000 USDC
- Token restriction: can transfer only stablecoins

The Finance role executes vendor payments within these bounds. They cannot pay unauthorized recipients, exceed budget allocations, make oversized payments, or move other treasury assets. Monthly budget tracking provides automatic spending control without manual oversight.

## How It Works

Safe Policies is built on Safe's Policy Engine framework. At the core is `SafePolicyGuard`, a contract that implements Safe's guard hooks. When a transaction attempts to execute, Safe calls the guard's `checkTransaction()` function before execution proceeds. The guard cannot be bypassed.

SafePolicyGuard acts as a router, computing an access selector from the transaction's target address, function selector, and operation type. This selector maps to specific policy contracts. The guard calls `checkTransaction()` on the appropriate policy, passing the full transaction data.

Each policy is an independent contract implementing the `IPolicy` interface. Policies maintain their own state for tracking limits, storing allowlists, or managing approvals. When called, a policy validates the transaction against its rules and either returns an approval signal or reverts with an error message explaining why the transaction was blocked.

### Cosigner Architecture

The cosigner implementation has two components. The offchain service monitors pending transactions, runs validation logic including transaction simulation and pattern analysis, and signs transactions that pass all checks. The onchain cosigner policy verifies that the cosigner's signature is included with the transaction and checks it's cryptographically valid.

This separation keeps complex validation logic offchain where it's flexible and cost-effective, while mandatory enforcement happens onchain where it cannot be circumvented. Users get sophisticated security checks without paying gas costs for complex onchain computation.

### Integration with Safe Unified Account

Policies work alongside [Safe Unified Account](/account-abstraction/research/safe-unified-account) for multichain deployment. When configuring a Safe across multiple chains, policies can be deployed and configured on all chains with a single signature using the Merkle-rooted signature scheme. This enables consistent security posture where a DeFi Manager has the same permissions on Base, Arbitrum, and Optimism, and spending policies maintain the same caps across networks.

## Current Status

| Component | Status |
|-----------|--------|
| Policy Engine framework | Safe research (exists) |
| Guardrail (delegate call policy) | Safe research (exists) |
| Custom policy development | Planned |
| Hosted cosigner service | Planned |
| AbstractionKit integration | Planned |
| Policy templates and dashboard | Planned |

Safe Policies packages Safe's Policy Engine framework for production use. We're building common policy implementations, hosting the cosigner service, providing SDK integration through AbstractionKit, and creating developer-friendly templates and documentation.

## Build With Us

We're looking for wallet teams who want to offer granular security controls to their users. If you're building wallets where teams need role-based treasury operations, or individual users need protection beyond their signing key, we want to talk.

Early partners will get direct integration support through AbstractionKit, access to the hosted cosigner service, and the opportunity to shape which policies we prioritize based on real needs. In return, we're looking for teams who can commit engineering resources and provide concrete feedback on which security concerns matter most to their users.

Reach out directly on Telegram: **[@heymarcopolo](https://t.me/heymarcopolo)**

Once you message us, we'll discuss your specific security requirements and work with your team on integration. If you're still evaluating whether Safe Policies fits your roadmap, we're happy to walk through the technical details and show how policies would work in your specific context.

---

*Technical questions? Reach out on [Discord](https://discord.gg/MfbK7aNWsY) or [GitHub](https://github.com/candidelabs)*

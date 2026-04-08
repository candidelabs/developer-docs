---
title: "Getting Started"
description: "Add a new owner to your Safe on multiple chains with a single signature using chain abstraction"
keywords:
  - chain-abstraction
  - multichain
  - unified-account
  - getting-started
  - tutorial
  - add-owner
---

# Getting Started with Chain Abstraction

**Add a new owner to your Safe on multiple chains with a single signature.**

This guide walks you through the core value proposition of chain abstraction: instead of signing N times for N chains, you sign once.

#### What You'll Build

By the end of this tutorial, you'll have:
- Created a Safe that exists on two chains with the same address
- Added a new owner to both Safes simultaneously
- Signed only once for both operations

#### Traditional vs Unified Approach

| Approach | Chains | Signatures Required |
|----------|--------|---------------------|
| Traditional | 5 | 5 signing sessions |
| Unified Account | 5 | 1 signing session |

## Prerequisites

Before starting, make sure you have:

- **Node.js 18+** and npm/yarn
- **Basic TypeScript knowledge**

:::tip Complete Example
You can [fork the complete code](https://github.com/candidelabs/abstractionkit-examples/tree/main/chain-abstraction) and follow along.
:::

## Step 1: Project Setup

#### Create Project Directory

```bash
mkdir chain-abstraction-demo
cd chain-abstraction-demo
npx tsc --init
```

#### Install Dependencies

```bash
npm install typescript ts-node --save-dev
npm install abstractionkit@0.2.41 dotenv viem
```

**What each package does:**
- `abstractionkit` - Candide's SDK with multi-chain signature support
- `dotenv` - Loads environment variables
- `viem` - Account utilities for key generation

#### Configure Environment Variables

Create a `.env` file in your project root:

```bash title=".env"
# Chain 1 (Sepolia)
CHAIN_ID1=11155111
BUNDLER_URL1=https://api.candide.dev/public/v3/sepolia
NODE_URL1=https://ethereum-sepolia-rpc.publicnode.com
PAYMASTER_URL1=https://api.candide.dev/public/v3/sepolia

# Chain 2 (Optimism Sepolia)
CHAIN_ID2=11155420
BUNDLER_URL2=https://api.candide.dev/public/v3/optimism-sepolia
NODE_URL2=https://sepolia.optimism.io
PAYMASTER_URL2=https://api.candide.dev/public/v3/optimism-sepolia

# Your keys (auto-generated if not provided)
PRIVATE_KEY=
PUBLIC_ADDRESS=
```

#### Create Main Script

Create an `index.ts` file:

```ts title="index.ts"
import * as dotenv from 'dotenv'

async function main(): Promise<void> {
    dotenv.config()
    // We'll build our multi-chain logic here
}

main().catch(console.error)
```

## Step 2: Initialize the Multi-Chain Safe Account

`SafeMultiChainSigAccountV1` extends the standard Safe account with multi-chain signature capabilities. It uses a Merkle tree to batch multiple UserOperations across chains into a single signable root.

```ts title="index.ts"
import * as dotenv from 'dotenv'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { SafeMultiChainSigAccountV1 as SafeAccount } from "abstractionkit"

async function main(): Promise<void> {
    dotenv.config()

    // Auto-generate keys if not provided (for quick testing)
    const ownerPrivateKey = (process.env.PRIVATE_KEY || generatePrivateKey()) as `0x${string}`
    const ownerAccount = privateKeyToAccount(ownerPrivateKey)
    const ownerPublicAddress = process.env.PUBLIC_ADDRESS || ownerAccount.address

    console.log("Owner:", ownerPublicAddress)

    // Initialize the multi-chain Safe account
    const smartAccount = SafeAccount.initializeNewAccount([ownerPublicAddress])

    console.log("Safe Account Address:", smartAccount.accountAddress)
}

main().catch(console.error)
```

#### Test Your Setup

```bash
npx ts-node index.ts
```

**Expected output:**
```
Owner: 0x...
Safe Account Address: 0x...
```

:::info How It Works
`initializeNewAccount()` deterministically computes your smart account address locally using only the provided inputs. No network calls are required. The account contract is not deployed at this stage; deployment occurs automatically when you send your first transaction.
:::

## Step 3: Create the Add Owner Transaction

We'll add a new owner to the Safe. This same transaction will execute on both chains.

```ts title="index.ts"
// Generate a new owner address to add
const newOwnerAccount = privateKeyToAccount(generatePrivateKey())
const newOwnerAddress = newOwnerAccount.address

console.log("New owner to add:", newOwnerAddress)

// Create add owner transaction (works on any chain)
const addOwnerTx = smartAccount.createStandardAddOwnerWithThresholdMetaTransaction(
    newOwnerAddress,
    1 // threshold: any single owner can sign
)
```

## Step 4: Create UserOperations for Both Chains

Now we create a UserOperation for each chain and sponsor gas using the `CandidePaymaster`. The transaction is identical, but gas parameters differ per chain.

```ts title="index.ts"
import {
    SafeMultiChainSigAccountV1 as SafeAccount,
    CandidePaymaster,
} from "abstractionkit"

// Chain configuration from .env
const chainId1 = BigInt(process.env.CHAIN_ID1 as string)
const chainId2 = BigInt(process.env.CHAIN_ID2 as string)
const bundlerUrl1 = process.env.BUNDLER_URL1 as string
const bundlerUrl2 = process.env.BUNDLER_URL2 as string
const nodeUrl1 = process.env.NODE_URL1 as string
const nodeUrl2 = process.env.NODE_URL2 as string

// Set up paymasters for gas sponsorship
const paymaster1 = new CandidePaymaster(process.env.PAYMASTER_URL1 as string)
const paymaster2 = new CandidePaymaster(process.env.PAYMASTER_URL2 as string)

console.log("[1/4] Creating UserOperations for both chains...")

// Create UserOperations in parallel
let [userOperation1, userOperation2] = await Promise.all([
    smartAccount.createUserOperation([addOwnerTx], nodeUrl1, bundlerUrl1),
    smartAccount.createUserOperation([addOwnerTx], nodeUrl2, bundlerUrl2),
])
```

#### Commit Phase: Reserve Gas Sponsorship

Before signing, we request the paymaster to reserve gas sponsorship for both operations. This is the **commit** phase of the two-phase paymaster flow.

```ts title="index.ts"
console.log("[2/4] Requesting paymaster sponsorship (commit phase)...")

const commitOverrides = {
    preVerificationGasPercentageMultiplier: 20,
    context: { signingPhase: "commit" as const },
}

const [[commitOp1], [commitOp2]] = await Promise.all([
    paymaster1.createSponsorPaymasterUserOperation(
        smartAccount, userOperation1, bundlerUrl1, undefined, commitOverrides
    ),
    paymaster2.createSponsorPaymasterUserOperation(
        smartAccount, userOperation2, bundlerUrl2, undefined, commitOverrides
    ),
])
userOperation1 = commitOp1
userOperation2 = commitOp2
```

:::info Two-Phase Paymaster
The CandidePaymaster uses a two-phase flow for multichain operations. The **commit** phase (before signing) reserves gas sponsorship. The **finalize** phase (after signing) completes the sponsorship with the final signed operation.
:::

## Step 5: Sign Once for All Chains

This is where the magic happens. Instead of signing each UserOperation separately, we sign them all at once.

```ts title="index.ts"
console.log("[3/4] Signing for BOTH chains with ONE signature...")

// Sign all UserOperations with a single signing session
const signatures = smartAccount.signUserOperations(
    [
        { userOperation: userOperation1, chainId: chainId1 },
        { userOperation: userOperation2, chainId: chainId2 },
    ],
    [ownerPrivateKey],
)

// Attach signatures
userOperation1.signature = signatures[0]
userOperation2.signature = signatures[1]

console.log("  Single signing operation generated", signatures.length, "signatures!")
```

:::info How It Works
`signUserOperations` builds a Merkle tree where each leaf is a UserOperation hash. You sign the Merkle root once. Each chain receives the signature plus a Merkle proof to verify independently.
:::

## Step 6: Finalize and Submit

After signing, finalize the paymaster sponsorship and submit both operations.

#### Finalize Phase

```ts title="index.ts"
console.log("[4/4] Finalizing sponsorship and submitting...")

const finalizeOverrides = {
    context: { signingPhase: "finalize" as const },
}

const [[finalOp1], [finalOp2]] = await Promise.all([
    paymaster1.createSponsorPaymasterUserOperation(
        smartAccount, userOperation1, bundlerUrl1, undefined, finalizeOverrides
    ),
    paymaster2.createSponsorPaymasterUserOperation(
        smartAccount, userOperation2, bundlerUrl2, undefined, finalizeOverrides
    ),
])
userOperation1 = finalOp1
userOperation2 = finalOp2
```

#### Submit and Verify

```ts title="index.ts"
import { UserOperationV9 } from "abstractionkit"

// Submit in parallel
await Promise.all([
    sendAndMonitor(userOperation1, bundlerUrl1, "Chain 1"),
    sendAndMonitor(userOperation2, bundlerUrl2, "Chain 2"),
])

// Verify owners on both chains
console.log("\nVerifying owners on both chains...")

const [owners1, owners2] = await Promise.all([
    smartAccount.getOwners(nodeUrl1),
    smartAccount.getOwners(nodeUrl2),
])

console.log("\nOwners on Chain 1:", owners1)
console.log("Owners on Chain 2:", owners2)

const hasNewOwner1 = owners1.map(o => o.toLowerCase()).includes(newOwnerAddress.toLowerCase())
const hasNewOwner2 = owners2.map(o => o.toLowerCase()).includes(newOwnerAddress.toLowerCase())

if (hasNewOwner1 && hasNewOwner2) {
    console.log("\nNew owner successfully added on BOTH chains with ONE signature!")
}

// Helper function
async function sendAndMonitor(
    userOperation: UserOperationV9,
    bundlerUrl: string,
    name: string,
): Promise<void> {
    const account = new SafeAccount(userOperation.sender)
    const response = await account.sendUserOperation(userOperation, bundlerUrl)
    console.log(`  [${name}] Submitted. Waiting...`)
    const receipt = await response.included()
    if (receipt.success) {
        console.log(`  [${name}] Success! Tx: ${receipt.receipt.transactionHash}`)
    } else {
        console.log(`  [${name}] Execution failed`)
    }
}
```

#### Run the Complete Example

```bash
npx ts-node index.ts
```

**Expected output:**
```
Owner: 0x...
Safe Account Address: 0x...
New owner to add: 0x...

[1/4] Creating UserOperations for both chains...
[2/4] Requesting paymaster sponsorship (commit phase)...
[3/4] Signing for BOTH chains with ONE signature...
  Single signing operation generated 2 signatures!
[4/4] Finalizing sponsorship and submitting...
  [Chain 1] Submitted. Waiting...
  [Chain 2] Submitted. Waiting...
  [Chain 1] Success! Tx: 0x...
  [Chain 2] Success! Tx: 0x...

Owners on Chain 1: ['0x...', '0x...']
Owners on Chain 2: ['0x...', '0x...']

New owner successfully added on BOTH chains with ONE signature!
```

## Full Example

<details>
<summary>Complete add-owner.ts</summary>

The complete script below ties all the steps together. You can also find it in the [abstractionkit-examples repo](https://github.com/candidelabs/abstractionkit-examples/blob/main/chain-abstraction/add-owner.ts).

```ts reference title="add-owner.ts"
https://github.com/candidelabs/abstractionkit-examples/blob/main/chain-abstraction/add-owner.ts
```

</details>

## What's Next?

Explore more chain abstraction examples and use cases in the [Overview](/wallet/guides/chain-abstraction-overview#examples), or check the [SDK Reference](/wallet/abstractionkit/safe-unified-account) for all available methods.

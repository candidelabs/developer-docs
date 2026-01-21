---
title: "Getting Started"
description: "Add an owner to your Safe on multiple chains with a single signature using Safe Unified Account"
keywords:
  - multichain
  - unified-account
  - getting-started
  - tutorial
  - add-owner
---

# Getting Started with Safe Unified Account

**Add a new owner to your Safe on multiple chains with a single signature.**

This guide walks you through the core value proposition of Safe Unified Account: instead of signing N times for N chains, you sign once.

#### What You'll Build

By the end of this tutorial, you'll have:
- Created a Safe that exists on two chains with the same address
- Added a new owner to both Safes simultaneously
- Signed only once for both operations

#### Traditional vs Unified Approach

| Approach | Chains | Signatures Required |
|----------|--------|---------------------|
| Traditional | 5 | 5 signing sessions |
| Safe Unified Account | 5 | 1 signing session |

## Prerequisites

Before starting, make sure you have:

- **Node.js 18+** and npm/yarn
- **Basic TypeScript knowledge**

:::tip Complete Example
You can [fork the complete code](https://github.com/candidelabs/abstractionkit-examples/pull/3) and follow along.
:::

## Step 1: Project Setup

#### Create Project Directory

```bash
mkdir safe-unified-demo
cd safe-unified-demo
npx tsc --init
```

#### Install Dependencies

```bash
npm install typescript ts-node --save-dev
npm install abstractionkit@0.2.34 dotenv viem
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

# Chain 2 (Optimism Sepolia)
CHAIN_ID2=11155420
BUNDLER_URL2=https://api.candide.dev/public/v3/optimism-sepolia
NODE_URL2=https://sepolia.optimism.io

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

#### Understanding SafeMultiChainSigAccount

`SafeMultiChainSigAccount` extends the standard Safe account with multi-chain signature capabilities. It uses a Merkle tree to batch multiple UserOperations across chains into a single signable root.

```ts title="index.ts"
import * as dotenv from 'dotenv'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { SafeMultiChainSigAccount as SafeAccount } from "abstractionkit"

async function main(): Promise<void> {
    dotenv.config()

    // Auto-generate keys if not provided (for quick testing)
    const ownerPrivateKey = (process.env.PRIVATE_KEY || generatePrivateKey()) as `0x${string}`
    const ownerAccount = privateKeyToAccount(ownerPrivateKey)
    const ownerPublicAddress = process.env.PUBLIC_ADDRESS || ownerAccount.address

    console.log("Owner:", ownerPublicAddress)

    // Initialize SafeMultiChainSigAccount
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

Now we create a UserOperation for each chain. The transaction is identical, but gas parameters differ per chain.

```ts title="index.ts"
import { AllowAllPaymaster } from "abstractionkit"

// Chain configuration from .env
const chainId1 = BigInt(process.env.CHAIN_ID1 as string)
const chainId2 = BigInt(process.env.CHAIN_ID2 as string)
const bundlerUrl1 = process.env.BUNDLER_URL1 as string
const bundlerUrl2 = process.env.BUNDLER_URL2 as string
const nodeUrl1 = process.env.NODE_URL1 as string
const nodeUrl2 = process.env.NODE_URL2 as string

// Set up gas sponsorship
const paymaster = new AllowAllPaymaster()
const [paymasterFields1, paymasterFields2] = await Promise.all([
    paymaster.getPaymasterFieldsInitValues(chainId1),
    paymaster.getPaymasterFieldsInitValues(chainId2),
])

console.log("[1/3] Creating UserOperations for both chains...")

// Create UserOperations in parallel
const [userOperation1, userOperation2] = await Promise.all([
    smartAccount.createUserOperation(
        [addOwnerTx],
        nodeUrl1,
        bundlerUrl1,
        { ...paymasterFields1, preVerificationGasPercentageMultiplier: 120 }
    ),
    smartAccount.createUserOperation(
        [addOwnerTx],
        nodeUrl2,
        bundlerUrl2,
        { ...paymasterFields2, preVerificationGasPercentageMultiplier: 120 }
    ),
])
```

## Step 5: Sign Once for All Chains

This is where the magic happens. Instead of signing each UserOperation separately, we sign them all at once.

```ts title="index.ts"
console.log("[2/3] Signing for BOTH chains with ONE signature...")

// Sign all UserOperations with a single signing session
const [signatures, paymasterData1, paymasterData2] = await Promise.all([
    smartAccount.signUserOperations(
        [
            { userOperation: userOperation1, chainId: chainId1 },
            { userOperation: userOperation2, chainId: chainId2 }
        ],
        [ownerPrivateKey],
    ),
    paymaster.getApprovedPaymasterData(userOperation1),
    paymaster.getApprovedPaymasterData(userOperation2)
])

// Attach signatures and paymaster data
userOperation1.signature = signatures[0]
userOperation2.signature = signatures[1]
userOperation1.paymasterData = paymasterData1
userOperation2.paymasterData = paymasterData2

console.log("  Single signing operation generated", signatures.length, "signatures!")
```

:::info How It Works
`signUserOperations` builds a Merkle tree where each leaf is a UserOperation hash. You sign the Merkle root once. Each chain receives the signature plus a Merkle proof to verify independently.
:::

## Step 6: Submit and Verify

Submit both UserOperations to their respective chains and verify the owner was added.

```ts title="index.ts"
console.log("[3/3] Submitting to both chains...")

// Submit in parallel
await Promise.all([
    sendAndMonitor(userOperation1, bundlerUrl1, "Chain 1"),
    sendAndMonitor(userOperation2, bundlerUrl2, "Chain 2"),
])

// Verify owners on both chains
const [owners1, owners2] = await Promise.all([
    smartAccount.getOwners(nodeUrl1),
    smartAccount.getOwners(nodeUrl2)
])

console.log("\nOwners on Chain 1:", owners1)
console.log("Owners on Chain 2:", owners2)

// Helper function
async function sendAndMonitor(userOp: any, bundlerUrl: string, name: string) {
    const account = new SafeAccount(userOp.sender)
    const response = await account.sendUserOperation(userOp, bundlerUrl)
    console.log(`  [${name}] Submitted. Waiting...`)
    const receipt = await response.included()
    if (receipt.success) {
        console.log(`  [${name}] Success! Tx: ${receipt.receipt.transactionHash}`)
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

[1/3] Creating UserOperations for both chains...
[2/3] Signing for BOTH chains with ONE signature...
  Single signing operation generated 2 signatures!
[3/3] Submitting to both chains...
  [Chain 1] Submitted. Waiting...
  [Chain 2] Submitted. Waiting...
  [Chain 1] Success! Tx: 0x...
  [Chain 2] Success! Tx: 0x...

Owners on Chain 1: ['0x...', '0x...']
Owners on Chain 2: ['0x...', '0x...']
```

## Full Example

<details>
<summary>Complete index.ts</summary>

```ts
import * as dotenv from 'dotenv'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import {
    SafeMultiChainSigAccount as SafeAccount,
    AllowAllPaymaster,
} from "abstractionkit"

async function main(): Promise<void> {
    dotenv.config()

    // Chain configuration
    const chainId1 = BigInt(process.env.CHAIN_ID1 as string)
    const chainId2 = BigInt(process.env.CHAIN_ID2 as string)
    const bundlerUrl1 = process.env.BUNDLER_URL1 as string
    const bundlerUrl2 = process.env.BUNDLER_URL2 as string
    const nodeUrl1 = process.env.NODE_URL1 as string
    const nodeUrl2 = process.env.NODE_URL2 as string

    // Auto-generate keys if not provided
    const ownerPrivateKey = (process.env.PRIVATE_KEY || generatePrivateKey()) as `0x${string}`
    const ownerAccount = privateKeyToAccount(ownerPrivateKey)
    const ownerPublicAddress = process.env.PUBLIC_ADDRESS || ownerAccount.address

    // Generate a new owner address to add
    const newOwnerAccount = privateKeyToAccount(generatePrivateKey())
    const newOwnerAddress = newOwnerAccount.address

    console.log("=".repeat(60))
    console.log("ADD OWNER ACROSS CHAINS - SINGLE SIGNATURE DEMO")
    console.log("=".repeat(60))
    console.log("\nOriginal owner:", ownerPublicAddress)
    console.log("New owner to add:", newOwnerAddress)

    // Initialize SafeMultiChainSigAccount
    const smartAccount = SafeAccount.initializeNewAccount([ownerPublicAddress])

    console.log("\nSafe Account (same on both chains):", smartAccount.accountAddress)
    console.log("\nTarget chains:")
    console.log("  - Chain 1:", chainId1.toString())
    console.log("  - Chain 2:", chainId2.toString())

    // Create add owner transaction
    const addOwnerTx = smartAccount.createStandardAddOwnerWithThresholdMetaTransaction(
        newOwnerAddress,
        1
    )

    // Set up paymaster
    const paymaster = new AllowAllPaymaster()
    const [paymasterFields1, paymasterFields2] = await Promise.all([
        paymaster.getPaymasterFieldsInitValues(chainId1),
        paymaster.getPaymasterFieldsInitValues(chainId2),
    ])

    console.log("\n[1/3] Creating UserOperations for both chains...")

    const [userOperation1, userOperation2] = await Promise.all([
        smartAccount.createUserOperation(
            [addOwnerTx],
            nodeUrl1,
            bundlerUrl1,
            { ...paymasterFields1, preVerificationGasPercentageMultiplier: 120 }
        ),
        smartAccount.createUserOperation(
            [addOwnerTx],
            nodeUrl2,
            bundlerUrl2,
            { ...paymasterFields2, preVerificationGasPercentageMultiplier: 120 }
        ),
    ])

    console.log("[2/3] Signing for BOTH chains with ONE signature...")

    const [signatures, paymasterData1, paymasterData2] = await Promise.all([
        smartAccount.signUserOperations(
            [
                { userOperation: userOperation1, chainId: chainId1 },
                { userOperation: userOperation2, chainId: chainId2 }
            ],
            [ownerPrivateKey],
        ),
        paymaster.getApprovedPaymasterData(userOperation1),
        paymaster.getApprovedPaymasterData(userOperation2)
    ])

    userOperation1.signature = signatures[0]
    userOperation2.signature = signatures[1]
    userOperation1.paymasterData = paymasterData1
    userOperation2.paymasterData = paymasterData2

    console.log("  Single signing operation generated", signatures.length, "signatures!")

    console.log("[3/3] Submitting to both chains...")

    await Promise.all([
        sendAndMonitor(userOperation1, bundlerUrl1, "Chain 1"),
        sendAndMonitor(userOperation2, bundlerUrl2, "Chain 2"),
    ])

    // Verify
    const [owners1, owners2] = await Promise.all([
        smartAccount.getOwners(nodeUrl1),
        smartAccount.getOwners(nodeUrl2)
    ])

    console.log("\n" + "=".repeat(60))
    console.log("VERIFICATION COMPLETE")
    console.log("=".repeat(60))
    console.log("\nOwners on Chain 1:", owners1)
    console.log("Owners on Chain 2:", owners2)

    const hasNewOwner1 = owners1.map(o => o.toLowerCase()).includes(newOwnerAddress.toLowerCase())
    const hasNewOwner2 = owners2.map(o => o.toLowerCase()).includes(newOwnerAddress.toLowerCase())

    if (hasNewOwner1 && hasNewOwner2) {
        console.log("\nNew owner successfully added on BOTH chains with ONE signature!")
    }
}

async function sendAndMonitor(userOp: any, bundlerUrl: string, name: string) {
    const account = new SafeAccount(userOp.sender)
    const response = await account.sendUserOperation(userOp, bundlerUrl)
    console.log(`  [${name}] Submitted. Waiting...`)
    const receipt = await response.included()
    if (receipt.success) {
        console.log(`  [${name}] Success! Tx: ${receipt.receipt.transactionHash}`)
    } else {
        console.log(`  [${name}] Execution failed`)
    }
}

main().catch(console.error)
```

</details>

## What's Next?

Now that you've seen the core pattern, explore more use cases:

- **Sync recovery setup** - Add Guardians on all chains with one signature.
- **Batch threshold updates** - Change your multisig threshold across your entire chain footprint.
- **EIL token transfers** - When EIL launches, use the same pattern for trustless cross-chain transfers.

---

*Questions? Reach out on [Discord](https://discord.gg/MfbK7aNWsY) or [Telegram](https://t.me/heymarcopolo).*

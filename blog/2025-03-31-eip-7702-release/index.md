---
slug: eip-7702-support
title: Upgrade EOAs to Smart Accounts with EIP-7702
description: Candide add support for EIP-7702, enabling Externally Owned Accounts (EOAs) to act like smart contracts with advanced features like gas sponsorship, transaction batching, and permissions.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [bundler,sdk,paymaster]
---
# EIP-7702 Support: Bundler, Paymaster, SDK

EIP-7702 introduces a new paradigm for Ethereum by enabling Externally Owned Accounts (EOAs), such as MetaMask accounts, to function like smart contracts. This allows on-chain code execution, granting smart capabilities to EOAs. Candide now supports EIP-7702 across its entire stack, including Voltaire Bundler, InstaGas Paymaster, and AbstractionKit SDK.

<!-- truncate -->

## What EIP-7702 Enables

- **Gas Sponsorship**: Abstract gas fees through third-party sponsorship or ERC-20 token payments
- **Transaction Batching**: Improve UX and security by combining approvals and contract interactions into atomic operations
- **Granular Permissions**: Grant specific, limited access to third parties, enabling use cases like recurring payments

Learn more about EIP-7702 in our dedicated [7702 Overview](/account-abstraction/7702/overview).

## EIP-7702 and ERC-4337

EIP-7702 enables EOAs to execute code at their addresses, supporting multiple actions in a single transaction instead of one. It separates transaction execution from gas payment, requiring supporting infrastructure to cover transaction costs. ERC-4337 provides this framework through its ecosystem of bundlers and paymasters. EIP-7702 accounts integrate with ERC-4337 requiring only minor bundler adjustments and no paymaster contract changes. 

A new EntryPoint Contract adds support for EIP-7702. EntryPoint v0.8 is deployed at: [0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108](https://etherscan.io/address/0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108)

## Bundler Support for EIP-7702

Voltaire Bundler now supports EIP-7702 with EntryPoint v0.8. The main ERC-4337 RPC methods—`eth_estimateUserOperationGas` and `eth_sendUserOperation`—accept a UserOperation structure.

To support EIP-7702, bundlers add a new JSON element named `eip7702Auth` containing the EIP-7702 authorization tuple. The recovered address MUST match the `UserOperation` sender.

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_sendUserOperation",
    "params": [
        {
            "eip7702auth": {
                "chainId": "0x4268",
                "address": "0x6C193e88c2C6ACB0897d162E9496156BfFF73C0F", // must be a valid delegation address for simulation
                "nonce": "0x0f",
                "yParity": "0x00",
                "r": "0xf37fca7f67bc0b336adfeefe42a8856ca1e6dee48b1ce7748a4044acfe283b01", // can pass a dummy signature during estimates
                "s": "0x60ab7d22e278dc43b0b37afada54666c0bf9e0beb9f0cd0159de007d127f3406" // can pass a dummy signature during estimates
            },
            "sender": "sender", // address
            // all other userop params
        },
        "0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108" // entrypoint v0.8 address
    ]
}
```

View the complete specification in the [Bundler API](/wallet/bundler/rpc-methods/) documentation.

## SDK Support for EIP-7702
AbstractionKit now supports EIP-7702 through the new `eip7702Auth` tuple for Bundlers and the `Simple7702Account` implementation for transaction batching and sponsorship. 

```typescript
import {
    Simple7702Account,
    createAndSignEip7702DelegationAuthorization,
} from "abstractionkit";

// Initiate the smart account
const smartAccount = new Simple7702Account(eoaPublicAddress);

let userOperation = await smartAccount.createUserOperation(
    [tx1, tx2], // You can batch multiple txs in one userop
    nodeUrl, // to fetch the nonce and gas prices
    bundlerUrl, // to estimate gas limits
    // highlight-start
    {
        eip7702auth: {
            chainId, // where the account will be upgraded
        }
    }
    // highlight-end
);

// calculates the r, s, and the yParity
// highlight-start
userOperation.eip7702auth = createAndSignEip7702DelegationAuthorization(
    BigInt(userOperation.eip7702auth.chainId),
    userOperation.eip7702auth.address,
    BigInt(userOperation.eip7702auth.nonce),
    eoaDelegatorPrivateKey
);
// highlight-end
```

View the complete guide: [EIP-7702 Quickstart](/wallet/guides/getting-started-eip-7702/)

## Paymaster Support for EIP-7702
Candide's InstaGas now supports EIP-7702 accounts, enabling wallets to leverage dApp gas sponsorship. The SDK and Paymaster API maintain backward compatibility—wallets can integrate seamlessly using the existing flow.

InstaGas also implements ERC-7677, the Paymaster Web Service Capability standard, enabling standardized paymaster communication between dApps and wallets.

**Resources:**
- [How to Send a Gasless Transaction](/wallet/guides/send-gasless-tx/)
- [How to Pay Gas in ERC-20 Tokens](/wallet/guides/pay-gas-in-erc20/)
- [Paymaster API](/wallet/paymaster/rpc-methods/)

---
slug: eip-7702-support
title: Upgrade EOAs to Smart Accounts with EIP-7702
description: Candide add support for EIP-7702, enabling Externally Owned Accounts (EOAs) to act like smart contracts with advanced features like gas sponsorship, transaction batching, and permissions.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [bundler,sdk,paymaster]
---
# EIP-7702 Support: Bundler, Paymaster, SDK 

EIP-7702 introduces a new paradigm for Ethereum users by allowing Externally Owned Accounts (EOAs), such as MetaMask accounts, to function like smart contracts. This enables on-chain code execution, giving smart capabilities to EOAs. Candide has added support for EIP-7702 across its entire stack, including Voltaire Bundler, InstaGas Paymaster, and AbstractionKit SDK.

<!-- truncate -->

## What EIP-7702 Enables

- **Gas sponsorship**: Abstract away gas fees, allowing third-party sponsorship or payment in ERC-20 tokens
- **Transaction batching**: Improve UX and security by combining approvals and contract interactions into a single step
- **Permissions**: Grant specific, limited access to third-parties, enabling use cases like recurring payments

To learn more about EIP-7702, visit the dedicated [7702 Overview](/account-abstraction/7702/overview).

## EIP-7702 and ERC-4337

EIP-7702 enables EOAs to include executable code in their addresses, allowing for multiple actions instead of just one. It also separates transaction execution from gas payment, requiring a supporting infrastructure to cover transaction costs. ERC-4337 provides this framework, featuring a thriving ecosystem of bundlers and paymasters. EIP-7702 accounts can integrate with ERC-4337 with only minor adjustments to bundlers and no changes to paymaster contracts. 

A new Entrypoint Contract is released that adds support for EIP-7702. EntryPoint v0.8 can be found at the following address: [0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108](https://etherscan.io/address/0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108)

## Bundler support for EIP-7702 

EIP-7702 support is added to Voltaire Bundler with EntryPoint V0.8. The main ERC-4337 RPC call are `eth_estimateUserOperationGas` and `eth_sendUserOperation`, 
which takes a UserOperation structure. 

In order to support EIP-7702, bundlers adds a new json element named `eip7702Auth`, to hold the eip-7702 auth tuple items. The recovered address MUST be the sender of this `UserOperation`.

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

See the full spec on [Bundler API](/wallet/bundler/rpc-methods/)

## SDK support for EIP-7702
AbstractionKit releases EIP-7702 with its support for new `eip7702Auth` tuple for Bundlers and the support for a new smart account for batching and sponsorship `Simple7702Account`. 

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

See the full guide on [EIP-7702 Quickstart](/wallet/guides/getting-started-eip-7702/)

## Paymaster support for EIP-7702
Candide's InstaGas adds support for EIP-7702 accounts, enabling wallets to benefit from gas sponsorship from dApps. There are no breaking changes in both the SDK and the paymaster API, so wallets can integrate the paymaster directly through the normal flow.

InstaGas also added support for ERC-7677, the standard for Paymaster Web Service Capability, which allows dapps to communicate standard paymaster calls to wallets.

Resources: 
- [How to send a gasless transaction](/wallet/guides/send-gasless-tx/)
- [How to allow gas payment in ERC-20 Tokens](/wallet/guides/pay-gas-in-erc20/)
- [Paymaster API](/wallet/paymaster/rpc-methods/)

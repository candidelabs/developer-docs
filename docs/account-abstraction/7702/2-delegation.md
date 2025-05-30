---
title: EIP-7702 - How to delegate the EOA Authorization to a Smart Account  
description: Add a new tx type that permanently sets the code for an EOA
keywords: [EIP-7702, Externally Owned Accounts, EOAs, smart contract wallets, Ethereum, ERC-4337, batching, sponsorship, privilege de-escalation]
---
# EIP-7702 Delegation

EIP-7702 enhances Externally Owned Accounts (EOAs) by allowing them to perform smart contract-like operations. In this example, we show how 
to sign the `eip7702Auth` tuple in SimpleAccount to delegate the authorization to the smart account.

For the complete example on how to upgrade an EOA to a smart account, vist [EIP-7702 Geting Started](/wallet/guides/getting-started-eip-7702).

## Setup

Install dependencies

```bash
npm i abstractionkit ethers
```

## Initialize Smart Account


[Simple7702Account](/wallet/abstractionkit/simple-7702-account) is a fully audited minimalist smart contract account 
that can be safely authorized by any EOA. It adds full support for major smart account features like batching and gas sponsorship.

```ts title="index.ts"
import { Simple7702Account } from "abstractionkit";
import { Wallet } from "ethers";

const eoaDelegator = Wallet.createRandom();

const smartAccount = new Simple7702Account(eoaDelegator.address);

console.log("Account address(sender) : " + smartAccount.accountAddress);
```

## Create UserOperation
Calling `createUserOperation` on `Simple7702Account` will:

1. Compute the r and s values for the `eip7702Auth`. These values are part of signature authorization tuple needed to upgrade the EOA. 
This is only used once, during the upgrade transaction of the EOA.
2. Determine the nonce and fetch the gas prices from the provided node rpc
3. Estimate gas limits from the provided bundler
4. Returns a unsigned user operation.

```ts title="index.ts"
const bundlerUrl = process.env.BUNDLER_URL as string;
const chainId = BigInt(process.env.CHAIN_ID as string);
const eoaDelegatorPrivateKey = eoaDelegator.privateKey;

let userOperation = await smartAccount.createUserOperation(
    [metaTransaction],
    jsonRpcNodeProvider,
    bundlerUrl,
    {
        eip7702Auth:{
            chainId, // chainId at which the account will be upgraded, which is needed in EIP-7702
        }
    }
);
```

## Sign the Delegate Authorization

Sign the `eip7702Auth` tuple to delegate the authorization to the smart account. This is only called once, during the upgrade transaction of the EOA.

```ts
import { createAndSignEip7702DelegationAuthorization } from "abstractionkit";

userOperation.eip7702Auth = createAndSignEip7702DelegationAuthorization(
    BigInt(userOperation.eip7702Auth.chainId),
    userOperation.eip7702Auth.address,
    BigInt(userOperation.eip7702Auth.nonce),
    eoaDelegatorPrivateKey
);
```


In this guide, we've shown you what it needs to how upgrade an Externally Owned Account (EOA) by delegating its authorization to a designated smart contract address using EIP-7702. To run a complete example, visit [EIP-7702 Geting Started](/wallet/guides/getting-started-eip-7702).
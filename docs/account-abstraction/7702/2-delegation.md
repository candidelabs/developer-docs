---
title: EIP-7702 - How to Delegate the EOA Authorization to a Smart Account
description: Add a new transaction type that allows EOAs to temporarily delegate code execution to a smart contract
keywords: [EIP-7702, Externally Owned Accounts, EOAs, smart contract wallets, Ethereum, ERC-4337, batching, sponsorship, privilege de-escalation]
---
# EIP-7702 Delegation

EIP-7702 enhances Externally Owned Accounts (EOAs) by allowing them to perform smart contract-like operations. In this example, we show how 
to sign the `eip7702Auth` tuple in SimpleAccount to delegate the authorization to the smart account.

For the complete example on how to upgrade an EOA to a smart account, visit [EIP-7702 Getting Started](/wallet/guides/getting-started-eip-7702).

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

console.log("Account address (sender): " + smartAccount.accountAddress);
```

## Create UserOperation
Calling `createUserOperation` on `Simple7702Account` will:

1. Compute the r and s values for the `eip7702Auth`. These values are part of the signature authorization tuple needed to upgrade the EOA.
This is only used once, during the upgrade transaction of the EOA.
2. Determine the nonce and fetch the gas prices from the provided node RPC.
3. Estimate gas limits from the provided bundler.
4. Returns an unsigned UserOperation.

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

Sign the `eip7702Auth` tuple to delegate the authorization to the smart account. This is only needed during the first upgrade transaction. If the EOA is already delegated, `eip7702Auth` will be `null` and signing can be skipped.

### With a Private Key

```ts
import { createAndSignEip7702DelegationAuthorization } from "abstractionkit";

if (userOperation.eip7702Auth) {
    userOperation.eip7702Auth = createAndSignEip7702DelegationAuthorization(
        BigInt(userOperation.eip7702Auth.chainId),
        userOperation.eip7702Auth.address,
        BigInt(userOperation.eip7702Auth.nonce),
        eoaDelegatorPrivateKey
    );
}
```

### With an External Signer (Callback Pattern)

Instead of passing a private key directly, you can pass a callback function for signing. This lets you use any signer: hardware wallets, WalletConnect, browser extensions, or custom signers via viem's `toAccount()`.

```ts
import { createAndSignEip7702DelegationAuthorization } from "abstractionkit";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount(eoaDelegatorPrivateKey as `0x${string}`);

if (userOperation.eip7702Auth) {
    userOperation.eip7702Auth = await createAndSignEip7702DelegationAuthorization(
        BigInt(userOperation.eip7702Auth.chainId),
        userOperation.eip7702Auth.address,
        BigInt(userOperation.eip7702Auth.nonce),
        async (hash: string) => {
            // Raw hash signing. Use account.sign(), NOT signMessage()
            // (signMessage adds an EIP-191 prefix and produces a different recovered address)
            return await account.sign({ hash: hash as `0x${string}` });
        }
    );
}
```

See the [full external signer example](https://github.com/candidelabs/abstractionkit-examples/blob/main/eip-7702/simple-account/02-upgrade-eoa-external-signer.ts) on GitHub.

## Revoke Delegation

To revoke an EIP-7702 delegation and return the EOA to a regular account, use `createRevokeDelegationTransaction`. This creates a signed transaction that delegates to `address(0)`, effectively removing the smart account code from the EOA.

Revoking requires the EOA to have native tokens to pay for gas, since this is a regular Ethereum transaction (not a UserOperation).

```ts
import { Simple7702Account } from "abstractionkit";

const smartAccount = new Simple7702Account(eoaDelegatorPublicAddress);

// Check if the EOA is currently delegated
const isDelegated = await smartAccount.isDelegatedToThisAccount(nodeUrl);

if (isDelegated) {
    const signedTransaction = await smartAccount.createRevokeDelegationTransaction(
        eoaDelegatorPrivateKey,
        nodeUrl,
    );

    // Send the signed transaction using your preferred method (e.g., viem, ethers)
}
```

See the [full revoke delegation example](https://github.com/candidelabs/abstractionkit-examples/blob/main/eip-7702/simple-account/05-revoke-delegation.ts) on GitHub.

---

To run a complete upgrade example, visit [EIP-7702 Getting Started](/wallet/guides/getting-started-eip-7702).
---
slug: entrypoint-v09-support
title: "EntryPoint v0.9 Support: Bundler & SDK"
description: Candide adds support for EntryPoint v0.9, bringing parallelizable paymaster signing, block-based validity ranges, and flexible initCode handling to the Voltaire Bundler and AbstractionKit SDK.
image: "/img/posters/atelier-meta.png"
authors: [marc]
tags: [bundler, sdk, eip-7702]
---

# EntryPoint v0.9 Support: Bundler & SDK

Candide now supports EntryPoint v0.9 across the Voltaire Bundler and AbstractionKit SDK. This release maintains full backward compatibility with v0.8 while introducing new features for improved paymaster UX and flexible account management.

<!-- truncate -->

## What's New in EntryPoint v0.9

EntryPoint v0.9 is deployed at: [0x433709009B8330FDa32311DF1C2AFA402eD8D009](https://etherscan.io/address/0x433709009B8330FDa32311DF1C2AFA402eD8D009)

Key additions over v0.8:

- **Parallelizable Paymaster Signing**: A new `paymasterSignature` field allows passing data to Paymasters after UserOperation signing, eliminating delays between user action and confirmation UI.
- **Block Number-Based Validity Ranges**: The highest bit of `validAfter` and `validUntil` now indicates block number-based validity instead of timestamps, supporting dapps that rely on block-based ranges.
- **Flexible InitCode Handling**: `initCode` is silently ignored if the Account already exists, enabling two-dimensional nonce usage. An `IgnoredInitCode` event tracks this for observability.
- **UserOp Hash Query**: New `getCurrentUserOpHash` function exposes the current UserOperation hash during execution for third-party contracts.
- **Enhanced Error Messages**: Improved error reporting with additional parameters in contract exceptions.

The contracts were audited by Cantina. View the full [audit report](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/ERC-4337%20Account%20Abstraction%20v0.9%20Security%20Review%20-%20Cantina.pdf).

## Bundler Support

Voltaire Bundler now supports EntryPoint v0.9. The API is fully backward compatible with v0.8. The only change is the entrypoint address passed as the second parameter.

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_sendUserOperation",
    "params": [
        {
            "sender": "0x...",
            "paymasterSignature": "0x...",
            // all other userop params
        },
        "0x433709009B8330FDa32311DF1C2AFA402eD8D009"
    ]
}
```

View the complete specification in the [Bundler API](/wallet/bundler/rpc-methods/) documentation.

## SDK Support

AbstractionKit introduces `Simple7702AccountV09` for EIP-7702 accounts targeting EntryPoint v0.9. The API mirrors `Simple7702Account` (EP v0.8), so upgrading is straightforward.

```typescript
import {
    Simple7702AccountV09,
    createAndSignEip7702DelegationAuthorization,
} from "abstractionkit";

const smartAccount = new Simple7702AccountV09(eoaPublicAddress);

let userOperation = await smartAccount.createUserOperation(
    [tx1, tx2],
    nodeUrl,
    bundlerUrl,
    {
        eip7702auth: {
            chainId,
        }
    }
);
```

View the [Simple7702AccountV09 SDK Reference](/wallet/abstractionkit/simple-7702-account-v09/) and a complete [working example on GitHub](https://github.com/candidelabs/abstractionkit-examples/blob/main/eip-7702/simple-account/04-upgrade-eoa-ep-v09.ts).

## Paymaster Support

The Candide Paymaster now supports EntryPoint v0.9. Gas sponsorship and ERC-20 gas payments work with `Simple7702AccountV09` using the same `CandidePaymaster` API as other EntryPoint versions.

```typescript
import { CandidePaymaster } from "abstractionkit";

const paymaster = new CandidePaymaster(paymasterRPC);

const [userOperation, sponsorMetadata] =
    await paymaster.createSponsorPaymasterUserOperation(
        userOperation,
        bundlerUrl,
    );
```

**Resources:**
- [Bundler API Reference](/wallet/bundler/rpc-methods/)
- [Simple7702Account Overview](/wallet/abstractionkit/simple-7702-account/)
- [Simple7702AccountV09 SDK Reference](/wallet/abstractionkit/simple-7702-account-v09/)
- [EIP-7702 Quickstart](/wallet/guides/getting-started-eip-7702/)
- [Contract Deployments](/wallet/technical-reference/deployments/)

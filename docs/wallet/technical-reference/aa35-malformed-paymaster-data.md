---
title: EntryPoint Error AA35 malformed paymaster data
description: The paymaster's validatePaymasterUserOp returned data in an unexpected format.
keywords: [AA35, error, entrypoint, erc-4337]
---

The paymaster's `validatePaymasterUserOp` returned data that does not match the expected ABI layout (EntryPoint v0.9). Check that the paymaster contract returns `(bytes context, uint256 validationData)` correctly encoded.

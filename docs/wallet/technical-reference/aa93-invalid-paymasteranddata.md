---
title: EntryPoint Error AA93 invalid paymasterAndData
description: The paymasterAndData field is too short.
keywords: [AA93, error, entrypoint, erc-4337]
---

`paymasterAndData` is shorter than the minimum length: 20 bytes (the paymaster address) on EntryPoint v0.6, or 52 bytes (the paymaster address followed by `paymasterVerificationGasLimit` and `paymasterPostOpGasLimit`) on v0.7 and v0.8. Check how the paymaster fields of the user operation are set.

EntryPoint v0.9 reports this case with the custom error `InvalidPaymasterData` instead of AA93.

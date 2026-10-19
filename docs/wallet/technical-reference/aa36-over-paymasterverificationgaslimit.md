---
title: EntryPoint Error AA36 over paymasterVerificationGasLimit
description: The paymaster's validation used more gas than the paymasterVerificationGasLimit allows.
keywords: [AA36, error, entrypoint, erc-4337]
---

The paymaster's `validatePaymasterUserOp` used more gas than the user operation's `paymasterVerificationGasLimit` (EntryPoint v0.7+). On EntryPoint v0.9 the message reads `AA36 over pmVerificationGasLimit`. Increase `paymasterVerificationGasLimit`. If you use a paymaster service, request fresh paymaster data so the limit is set for the current operation.

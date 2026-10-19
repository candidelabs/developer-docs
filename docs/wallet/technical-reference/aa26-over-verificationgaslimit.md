---
title: EntryPoint Error AA26 over verificationGasLimit
description: The account's validation used more gas than the verificationGasLimit allows.
keywords: [AA26, error, entrypoint, erc-4337]
---

The account's validation (account creation, `validateUserOp` and the prefund payment) used more gas than the user operation's `verificationGasLimit`. This is the EntryPoint v0.7+ equivalent of AA40.

Increase `verificationGasLimit`. A common cause is estimating gas with a dummy signature that takes a cheaper validation path than the real signature, for example a passkey stub whose key ID is not registered on the account, or whose challenge does not match, so the validator exits before verifying the signature. Use a dummy signature that runs the same validation steps as the real one, or add a margin to the estimated `verificationGasLimit`.

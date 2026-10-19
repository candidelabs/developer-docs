---
title: "Bundler Error -32500 Transaction Rejected By Entrypoint Simulation"
description: Transaction rejected by entryPoint’s simulateValidation, during wallet creation or validation
keywords: ['-32500', error, bundler, 'entrypoint', erc-4337]
---

# -32500 Transaction Rejected By Entrypoint Simulation

Transaction rejected by entryPoint’s simulateValidation, during wallet creation or validation. The message field is set the FailedOp’s “AAxx” error message from the EntryPoint.

The EntryPoint may also provide an additional `AAxx` code to offer further guidance.

Specifically:

- AA1x error codes pertain to factories.
- AA2x error codes are related to the sender.
- AA3x error codes are associated with paymasters.
- AA4x error codes involve general verification.
- AA5x errors relate to actions taken after the user operation has been executed.
- AA9x errors relate to the bundle transaction or malformed user operation fields.

See the explanation of each [error code provided by the Entrypoint](/wallet/technical-reference/entrypoint-error-codes/)

## verificationGas should have extra 2000 gas

The bundler also returns -32500 with the message `verificationGas should have extra 2000 gas. has only <n>` when the user operation's validation fits within `verificationGasLimit` but leaves less than 2,000 gas unused. The bundler requires at least 2,000 gas of margin above the gas the validation used.

This usually means `verificationGasLimit` was estimated with a dummy signature that is cheaper to validate than the real one. For example, a passkey stub with a key ID that is not registered on the account, or with a challenge that does not match, makes the validator exit before verifying the signature. Use a dummy signature that runs the same validation steps as the real signature, or add a margin to the estimated `verificationGasLimit` before signing.

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

See the explanation of each [error code provided by the Entrypoint](../entrypoint-error-codes/)
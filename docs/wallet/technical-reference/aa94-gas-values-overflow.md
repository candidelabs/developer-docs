---
title: EntryPoint Error AA94 gas values overflow
description: One of the gas or fee fields is larger than the EntryPoint allows.
keywords: [AA94, error, entrypoint, erc-4337]
---

One of `preVerificationGas`, `verificationGasLimit`, `callGasLimit`, `paymasterVerificationGasLimit`, `paymasterPostOpGasLimit`, `maxFeePerGas` or `maxPriorityFeePerGas` exceeds the maximum value the EntryPoint accepts (`uint120`). Check the units and encoding of the gas fields.

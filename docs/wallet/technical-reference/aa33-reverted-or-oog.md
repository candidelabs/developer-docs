---
title: EntryPoint Error AA33 reverted (or OOG)
description: The paymaster signature was rejected or verifying the paymaster signature ran out of gas.
keywords: [AA33, error, entrypoint, erc-4337]
---

The paymaster validation was rejected or ran out of gas. "OOG" = Out-Of-Gas. First check the paymaster's signature in paymasterAndData. If the signature is correct, the verificationGasLimit may be too low.
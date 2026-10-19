---
title: EntryPoint Error AA13 initCode failed or OOG
description: The initCode failed to create the account or ran out of gas.
keywords: [AA13, error, entrypoint, erc-4337]
---

The `initCode` failed to create the account or ran out of gas. "OOG" = Out Of Gas. Check the amount of gas consumed, and then verify the initCode or the factory contract is correct.

On EntryPoint v0.8+, `AA13 EIP7702 sender init failed` means the initialization call of an EIP-7702 account (the `factoryData` of an operation whose `factory` is `0x7702`) reverted. Check the initialization calldata against the delegate contract.

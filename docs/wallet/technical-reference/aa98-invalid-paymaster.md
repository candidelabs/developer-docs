---
title: EntryPoint Error AA98 invalid paymaster
description: The paymaster address in paymasterAndData is the zero address.
keywords: [AA98, error, entrypoint, erc-4337]
---

The paymaster address in `paymasterAndData` is the zero address. Set the paymaster address you intend to use, or leave the paymaster fields empty for a self-paid user operation.

This code is used by EntryPoint v0.8. EntryPoint v0.9 reports the same case with the custom error `InvalidPaymaster`.

---
title: EntryPoint Error AA99 initCode too small
description: The initCode is shorter than a factory address.
keywords: [AA99, error, entrypoint, erc-4337]
---

The `initCode` (`factory` and `factoryData`) is shorter than 20 bytes, so it cannot contain a factory address. For an account that is already deployed, leave `factory` and `factoryData` empty. For an EIP-7702 account, set `factory` to `0x7702`.

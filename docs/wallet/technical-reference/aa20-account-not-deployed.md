---
title: EntryPoint Error AA20 Account Not Deployed
description: The sender of the user operation is not deployed
keywords: [AA20, error, entrypoint, erc-4337]
---

The sender of the user operation is not deployed and there is no initCode specified. If this is the first transaction by this account make sure an initCode is included. Otherwise, check that the correct sender address is specified and is an ERC-4337 account.
---
title: EntryPoint Error AA95 out of gas
description: The bundle transaction did not have enough gas to execute the user operation.
keywords: [AA95, error, entrypoint, erc-4337]
---

The bundle transaction ran out of gas before the user operation completed. On EntryPoint v0.7+ this can only be caused by the gas limit the bundler set for the bundle, not by the user operation's fields. On v0.6 it can also be caused by a paymaster. If it keeps occurring, contact us with the user operation hash.

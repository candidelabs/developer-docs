---
title: EntryPoint Error AA51 prefund below actualGasCost
description: The user operation cost too much gas.
keywords: [AA51, error, entrypoint, erc-4337]
---

The actual cost of the user operation is higher than the total amount of gas approved. The prefund is the amount that the EntryPoint is allowed to execute the user operation. After the user operation is executed, the remainder of the prefund is credited back to the sender.
---
title: EntryPoint Error AA21 Didn’t pay prefund
description: The sender did not pay the EntryPoint
keywords: [AA21, error, entrypoint, erc-4337]
---

The sender lacks sufficient native tokens to cover the gas costs associated with the User Operation. If your intention was to utilize a Paymaster for sponsorship, it is crucial to verify that the paymasterAndData field of the user operation is correctly configured. After the user operation is executed, the remainder of the prefund is credited back to the sender.
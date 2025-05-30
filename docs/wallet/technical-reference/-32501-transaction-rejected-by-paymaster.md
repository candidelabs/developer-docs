---
title: "Bundler Error -32501 Transaction Rejected by Paymaster"
description: Transaction rejected by paymaster’s validatePaymasterUserOp
keywords: ['-32501', error, entrypoint, erc-4337]
---

# -32501 Transaction Rejected by Paymaster

The error code -32501 is generated in cases where a user operation is declined by a Paymaster.

Prior to sending user operations onchain, bundlers meticulously validate that any paymasters involved will reimburse them for their services.

If you encounter this error, it is advisable to inspect the paymasterAndData section of the user operation to identify and rectify any issues.
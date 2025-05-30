---
title: "Bundler Error -32502 Transaction Rejected by opcode Validation"
description: Transaction rejected because of opcode validation
keywords: ['-32502', error, entrypoint, erc-4337]
---

# -32502 Transaction Rejected by opcode Validation

The error code -32502 signals that a user operation has been declined due to an unauthorized operation performed by the sender during signature verification.

To ensure a smooth process when forwarding user operations onchain, bundlers are obligated to verify that the user operations do not pose any harm to the bundler's operations. This includes preventing the use of specific opcodes that may be disruptive when verifying a signature.

For all ERC-4337 bundlers, it is imperative to adhere to these opcode regulations, although certain bundlers have the capacity to create alternate user operation mempools that relax these rules.

If you encounter this error, it may be necessary to make adjustments to the smart contracts associated with the account to ensure compliance.
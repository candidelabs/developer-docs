---
title: "Bundler Error -32507 Invalid UserOp Signature or Paymaster Signature" 
description: Transaction rejected because of the wallet signature check failed or paymaster
keywords: ['-32507', error, entrypoint, erc-4337]
---

# -32507 Invalid UserOp Signature or Paymaster Signature

This error code means that the user operation contains an invalid signature from either the sender or the paymaster.

This error code is returned when `validateUserOp` or `validatePaymasterUserOp` is checked by the bundler before submitting the user operation on-chain.

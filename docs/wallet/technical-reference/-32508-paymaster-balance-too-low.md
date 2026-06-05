---
title: "Bundler Error -32508 Paymaster Balance Too Low"
description: Transaction rejected because paymaster balance cannot cover all pending UserOperations
keywords: ['-32508', error, bundler, paymaster, erc-4337]
---

# -32508 Paymaster Balance Too Low

The transaction was rejected because the paymaster's EntryPoint deposit cannot cover all pending UserOperations that depend on it.

This is distinct from a stake or unstake-delay failure. The paymaster may be valid, but its available deposit is not enough for the bundler to safely accept another sponsored UserOperation.

If you control the paymaster, deposit more native tokens into the EntryPoint or wait for pending sponsored UserOperations to be included. If you are using a third-party paymaster service, retry later or contact the paymaster provider.

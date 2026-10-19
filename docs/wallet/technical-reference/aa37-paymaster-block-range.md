---
title: EntryPoint Error AA37 paymaster invalid block range
description: The paymaster's validation returned a block-number range that does not include the current block.
keywords: [AA37, error, entrypoint, erc-4337]
---

The paymaster returned a validity range expressed in block numbers (EntryPoint v0.9), and the current block is outside that range. Request fresh paymaster data and submit the user operation before it expires.

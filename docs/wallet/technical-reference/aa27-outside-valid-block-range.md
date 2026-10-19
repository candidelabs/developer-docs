---
title: EntryPoint Error AA27 outside valid block range
description: The account's validation returned a block-number range that does not include the current block.
keywords: [AA27, error, entrypoint, erc-4337]
---

The account returned a validity range expressed in block numbers (EntryPoint v0.9), and the current block is outside that range. Check the block range the account encodes in its validation data.

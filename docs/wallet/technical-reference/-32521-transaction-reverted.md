---
title: "Bundler Error -32521 Transaction Reverted" 
description: Transaction was reverted during the execution phase
keywords: ['-32521', error, entrypoint, erc-4337]
---

# -32521 Transaction Reverted

Transaction was reverted during the execution phase.

This likely means that there is insufficient gas to pay for the execution or there an error with the callData in your user operation. We recommend using a service like Tenderly to simulate the callData and identify the error.
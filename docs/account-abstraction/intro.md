---
title: Intro to Ethereum Account Abstraction and Smart Accounts
description: Enabling the use of smart contract accounts over EOAs for better UX.
image: "/img/erc4337-bundler.png"
tags: ["4337", account-abstraction]
---

# Intro to Account Abstraction

Account Abstraction enables the use of smart contract accounts instead of traditional externally owned accounts (EOAs).

:::info Did you know?
A smart account separates ownership from control. Unlike EOAs where the private key is tightly coupled to the account, smart accounts abstract the account from the signer—hence the term "Account Abstraction."
:::

## The Problem with Wallets Today
Almost every Ethereum wallet today has significant limitations:

- **Gas Fees**: Without Account Abstraction, users must hold ETH to pay gas fees. This creates a major onboarding barrier for newcomers, who must complete KYC procedures and acquire ETH before using any decentralized application.

    This also degrades the user experience for existing users, who must constantly maintain an ETH balance for gas fees—even when they have sufficient ERC-20 tokens to cover their desired transactions.

- **Multi-Step Transactions**: Common interactions require multiple signatures and transaction submissions. For example, swapping on Uniswap requires two separate transactions: `Approve` ERC-20 spend, then `Deposit`—each requiring user confirmation.

- **Security**: Traditional wallets carry the risk of lost or stolen seed phrases and offer limited recovery mechanisms. As the ecosystem grows and attracts more users, wallets must implement more robust, multi-layered security measures to protect user accounts.

Smart Wallets address many EOA limitations by embedding custom logic in smart contracts. However, because every Ethereum transaction must originate from an ECDSA-secured EOA, building and scaling Smart Wallets remains challenging. 

This is where Account Abstraction and Candide come in.

## What is Account Abstraction

[ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) is a standard for building Smart Wallets without requiring consensus-layer protocol changes. It introduces a new transaction type called [`UserOperation`](https://eips.ethereum.org/EIPS/eip-4337#definitions) that packages user intent and execution instructions. A UserOperation contains the account owner, calldata, gas payment details, user signature, and gas parameters.

Smart wallets provide capabilities that EOAs fundamentally cannot:

### Sponsored Transactions

Abstract gas payments from end users to minimize UX friction:

- **Gasless Transactions**: Enable seamless onboarding by allowing dapps or wallets to subsidize gas costs for new users
- **ERC-20 Gas Payments**: Let users pay gas fees in ERC-20 tokens such as stablecoins or governance tokens
- **Off-Chain Gas Payment**: Allow users to pay for gas via credit card
- **Cross-Chain Gas Payment**: Enable users to pay for gas through L2 rollups
- **Privacy**: Support ETH-less token withdrawals to stealth addresses and privacy-focused accounts

### Account Security

- **Arbitrary Verification Logic**: Support diverse verification methods including single-signature, multi-signature, and custom signature schemes tailored to your application's requirements.

- **Security Plugins**: Enhance account security with social recovery, time-locks, and withdrawal limits. These features increase user confidence while protecting their assets.

### Seamless App Experience

- **Session Keys**: Provide a popup-free experience for users. Session keys authenticate users, authorize specific in-app actions, and grant limited permissions to web3 accounts.

- **Atomic Multi-Operations**: Execute multiple transactions in a single on-chain operation.
---
title: Intro to Ethereum Account Abstraction and Smart Accounts
description: Enabling the use of smart contract accounts over EOAs for better UX.
image: "/img/erc4337-bundler.png"
tags: ["4337", account-abstraction]
---

# Intro to Account Abstraction

Making it possible to use smart contract accounts instead of regular externally owned accounts (EOAs).

:::info Did you know?
A smart account is controlled and separated from the signer, unlike EOAs where the private key is tightly coupled with the account. This is where the term Account Abstraction comes into play. The account is abstracted away from the signer.
:::

## The Problem with wallets today 
Almost every wallet on Ethereum today have limitation in one way or the other.

- **Gas**: Without Account Abstraction, individuals sending Ethereum transactions are required to possess ETH for covering gas fees. Consequently, this poses a challenge for newcomers, as they must undergo KYC procedures and acquire ETH before accessing any decentralized application (dapp).

    Moreover, this setup also leads to a poor user experience for existing users. They have to constantly top up their ETH balance solely to handle gas fees, even if they already possess enough ERC-20 tokens in their wallet to cover the desired transactions.

- **Muti-step Transactions**: The usual interaction with any applications involves several signature and transactions submissin to complete the full process. The most popular example in a swap on uniswap: `Approve` ERC-20 spend + `Deposit`, where a user needs two click confirmations in their wallet to complete the process.

- **Security**: Regular wallets today, come with the risk of lost or stolen seed phrases. They are limited in functionality in terms of recovery mechanism. As the space continues to grow and attract more users, it becomes evident that wallets must adopt more robust and multi-layered security measures to ensure the safety of users' accounts.

Smart Wallets solve many of the issues that were raised with EOAs by offering specific wallet logic inside the contracts. Nevertheless, because each transaction on Ethereum needs to originate from an ECDSA-secured EOA, this makes it very difficult to build; and scale. 

This is where Account Abstraction and Candide come in.
## What is Account Abstraction

Account Abstraction through [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) is a standard to build Smart Wallets without the need for consensus-layer protocol changes. This involves packaging a transaction in a new transaction type called [`UserOperation`](https://eips.ethereum.org/EIPS/eip-4337#definitions) that contains the instructions for what users wants to accomplish. This includes information on the owner, the calldata, who is paying for gas, the user signature and gas information. 

Smart wallets offer a host of advantages that EOAs simply cannot offer:

### Sponsored Transactions

Abstracts the process of paying for gas away from end users which minimizes UX friction 

- **Gasless**: Allow for a seamless onboarding process by making dapps (or wallets) to subsidize the onboarding process for new users.
- **ERC-20 Gas payments**: Allow users to pay gas fees in ERC-20 tokens such as Stablecoins or Governance tokens
- **Off-chain Gas Payment**: Allow users to pay for gas indirectly via credit card
- **Cross-chain Gas Payment**: Allow users to pay for gas indirectly via a L2 rollup
- **Privacy**: Enable ETH-less withdrawal of tokens to stealth addresses and offer privacy first accounts to users


### Account Security

- **Arbitrary Verification Logic**: You gain flexibility to support a wide range of verification methods, including single and multi-signature verification, as well as any custom signature schemes your application may require.

- **Security Plugins**: Enhance account security through features like social recovery, time-locks, and withdraw limits. These robust security measures instill greater confidence in users while safeguarding their assets.

### Smooth App Experience

- **Session Keys**: Popup-less experience for your users. Session keys can be used to authenticate users, and authorize specific actions within an app, and grant limited permissions to their web3 accounts.

- **Atomic Multi-Operations**: Smart Wallets can perform multiple transactions in one single on-chain transaction
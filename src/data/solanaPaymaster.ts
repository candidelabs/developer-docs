// Type definitions for the Solana Paymaster (hosted Kora) JSON-RPC reference.
// All shapes verified against the live endpoint on 2026-07-08.

export const estimateTransactionFeeParams = [
  {
    key: "transaction",
    type: "string",
    description:
      "Base64-encoded serialized transaction, with the paymaster's signer address set as the fee payer",
  },
  {
    key: "fee_token",
    type: "string",
    description:
      "Mint address of the SPL token to price the fee in. Must be one of the tokens returned by getSupportedTokens",
  },
];

export const estimateTransactionFeeReturn = [
  {
    key: "fee_in_lamports",
    type: "number",
    description:
      "Total fee in lamports, including the network fee, any rent for accounts the transaction creates, and the paymaster margin",
  },
  {
    key: "fee_in_token",
    type: "number",
    description:
      "The same fee denominated in base units of fee_token (USDT has 6 decimals). This is the amount the transaction must transfer to payment_address",
  },
  {
    key: "signer_pubkey",
    type: "string",
    description: "The paymaster's fee payer address",
  },
  {
    key: "payment_address",
    type: "string",
    description: "Address the fee payment must be sent to",
  },
];

export const getBlockhashReturn = [
  {
    key: "blockhash",
    type: "string",
    description:
      "A recent blockhash from the Solana RPC node the paymaster is connected to",
  },
];

export const getPayerSignerReturn = [
  {
    key: "signer_address",
    type: "string",
    description:
      "The paymaster's fee payer address. Set this as the transaction fee payer",
  },
  {
    key: "payment_address",
    type: "string",
    description:
      "Address that receives fee payments. The fee is paid to this address's associated token account of the fee token",
  },
];

export const getSupportedTokensReturn = [
  {
    key: "tokens",
    type: "string[]",
    description: "Mint addresses of the SPL tokens accepted for fee payment",
  },
];

export const transferTransactionParams = [
  {
    key: "amount",
    type: "number",
    description:
      "Transfer amount in base units of the token (USDT has 6 decimals)",
  },
  {
    key: "token",
    type: "string",
    description: "Mint address of the SPL token to transfer",
  },
  {
    key: "source",
    type: "string",
    description: "Wallet address of the sender (owner address, not the token account)",
  },
  {
    key: "destination",
    type: "string",
    description:
      "Wallet address of the recipient (owner address, not the token account)",
  },
];

export const transferTransactionReturn = [
  {
    key: "transaction",
    type: "string",
    description:
      "Base64-encoded unsigned transaction with the paymaster set as fee payer. It does not include the fee payment instruction",
  },
  {
    key: "message",
    type: "string",
    description: "Base64-encoded transaction message",
  },
  {
    key: "blockhash",
    type: "string",
    description: "The recent blockhash the transaction was built with",
  },
  {
    key: "signer_pubkey",
    type: "string",
    description: "The paymaster's fee payer address",
  },
];

export const signTransactionParams = [
  {
    key: "transaction",
    type: "string",
    description:
      "Base64-encoded transaction, signed by every required signer except the fee payer, and containing an SPL transfer of at least fee_in_token to the payment address",
  },
];

export const signTransactionReturn = [
  {
    key: "signed_transaction",
    type: "string",
    description:
      "Base64-encoded transaction with the paymaster's fee payer signature added. Not broadcast; submit it yourself",
  },
  {
    key: "signer_pubkey",
    type: "string",
    description: "The paymaster's fee payer address that signed",
  },
];

export const signAndSendTransactionParams = [
  {
    key: "transaction",
    type: "string",
    description:
      "Base64-encoded transaction, signed by every required signer except the fee payer, and containing an SPL transfer of at least fee_in_token to the payment address",
  },
];

export const signAndSendTransactionReturn = [
  {
    key: "signature",
    type: "string",
    description:
      "Transaction signature (base58). Use it to track confirmation on any Solana RPC or explorer",
  },
  {
    key: "signed_transaction",
    type: "string",
    description:
      "Base64-encoded fully signed transaction as broadcast to the network",
  },
  {
    key: "signer_pubkey",
    type: "string",
    description: "The paymaster's fee payer address that signed",
  },
];

export const getConfigValidationConfig = [
  {
    key: "max_allowed_lamports",
    type: "number",
    description:
      "Maximum lamports the fee payer will spend on a single transaction (fees plus rent)",
  },
  {
    key: "max_signatures",
    type: "number",
    description: "Maximum number of signatures allowed in a transaction",
  },
  {
    key: "allowed_programs",
    type: "string[]",
    description:
      "Program IDs a transaction may invoke. Transactions touching any other program are rejected",
  },
  {
    key: "allowed_tokens",
    type: "string[]",
    description: "Mint addresses of tokens that may be transferred",
  },
  {
    key: "allowed_spl_paid_tokens",
    type: "string[]",
    description: "Mint addresses of tokens accepted as fee payment",
  },
  {
    key: "disallowed_accounts",
    type: "string[]",
    description: "Accounts that transactions may not reference",
  },
  {
    key: "price_source",
    type: "string",
    description: "Oracle used to price the fee token against SOL",
  },
  {
    key: "fee_payer_policy",
    type: "object",
    description:
      "Per-instruction permissions for what the fee payer key itself may be used for, per program (system, spl_token, token_2022)",
  },
  {
    key: "price",
    type: "object",
    description:
      "Fee pricing model. type is free, fixed, or margin; margin is the markup applied over the network cost",
  },
  {
    key: "token_2022",
    type: "object",
    description:
      "Token-2022 mint and account extensions that are blocked",
  },
  {
    key: "allow_durable_transactions",
    type: "boolean",
    description: "Whether durable nonce transactions are accepted",
  },
];

export const getConfigReturn = [
  {
    key: "fee_payers",
    type: "string[]",
    description: "The paymaster's fee payer addresses",
  },
  {
    key: "validation_config",
    description: "The policy every transaction is validated against",
    type: getConfigValidationConfig,
  },
  {
    key: "enabled_methods",
    type: "object",
    description:
      "Map of RPC method names (snake_case) to whether they are enabled on this endpoint",
  },
];

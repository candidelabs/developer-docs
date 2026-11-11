// Type definitions for the Solana Paymaster (hosted Kora) JSON-RPC reference.
// Read-only method shapes (getPayerSigner, getSupportedTokens, getBlockhash, getConfig,
// estimateTransactionFee) verified against the live endpoint on 2026-11-11.
// signTransaction and signAndSendTransaction: 2026-07-08.

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
      "The same fee denominated in base units of fee_token (USDT and USDC both have 6 decimals). This is the amount the transaction must transfer to payment_address",
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
      "Per-instruction permissions for what the fee payer key itself may be used for, per program (system, spl_token, token_2022, alt, bpf_loader_upgradeable, loader_v4)",
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
      "Token-2022 mint and account extensions that are blocked, and the transfer hook policy",
  },
  {
    key: "allow_durable_transactions",
    type: "boolean",
    description: "Whether durable nonce transactions are accepted",
  },
  {
    key: "max_price_staleness_slots",
    type: "number",
    description: "Maximum age, in slots, of the price used for a fee quote. 0 means no limit is enforced",
  },
  {
    key: "require_one_of_programs",
    type: "string[]",
    description: "If not empty, a transaction must invoke at least one of these programs",
  },
  {
    key: "cross_cluster_check",
    type: "boolean",
    description: "Whether the paymaster checks that a transaction was not built for another cluster",
  },
  {
    key: "cross_cluster_endpoints",
    type: "string[]",
    description: "RPC endpoints of the clusters used by the cross-cluster check",
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

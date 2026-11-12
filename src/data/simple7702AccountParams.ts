// Simple7702Account Types and Parameters
import { userOperationParamV08, userOperationReceiptResultType } from "./userOperation";
import { sendUseroperationResponseType, bundlerJsonRpcErrorType } from "../requestRpcData";

export const simpleMetaTransactionType = [
  {
    key: "SimpleMetaTransaction",
    type: [
      {
        key: "to",
        type: "string",
        description: "Target contract address for the transaction",
      },
      {
        key: "value",
        type: "bigint",
        description: "Value transferred in the transaction (usually 0n for contract interactions)",
      },
      {
        key: "data",
        type: "string",
        description: "The call data for the transaction",
      },
    ],
    description: "SimpleMetaTransaction is the type of transaction used with Simple7702Account.",
  },
];

// Shape of the `eip7702Auth` override accepted by createUserOperation.
// Only chainId is required; the SDK fills the rest (r and s are placeholders until signed).
export const eip7702AuthOverrideType = [
  {
    key: "chainId",
    type: "bigint",
    description: "Chain ID where the authorization is valid",
  },
  {
    key: "address?",
    type: "string",
    description: "Address to delegate the EOA to. Defaults to the account's delegateeAddress",
  },
  {
    key: "nonce?",
    type: "bigint",
    description: "Authorization nonce. Defaults to the EOA's transaction count fetched from the node",
  },
  {
    key: "yParity?",
    type: "string",
    description: "Y parity of the authorization signature as a hex string ('0x0' or '0x1'). Defaults to '0x0'",
  },
  {
    key: "r?",
    type: "string",
    description: "R component of the authorization signature. Defaults to a placeholder value",
  },
  {
    key: "s?",
    type: "string",
    description: "S component of the authorization signature. Defaults to a placeholder value",
  },
];

export const createUserOperationOverridesV8 = [
  {
    key: "eip7702Auth?",
    type: eip7702AuthOverrideType,
    description: "EIP-7702 authorization parameters for EOA delegation",
  },
  {
    key: "nonce?",
    type: "bigint",
    description: "Anti-replay parameter (see Semi-abstracted Nonce Support)",
  },
  {
    key: "callData?",
    type: "string",
    description: "The data to pass to the sender during the main execution call",
  },
  {
    key: "callGasLimit?",
    type: "bigint",
    description: "The amount of gas to allocate the main execution call",
  },
  {
    key: "verificationGasLimit?",
    type: "bigint",
    description: "The amount of gas to allocate for the verification step",
  },
  {
    key: "preVerificationGas?",
    type: "bigint",
    description: "The amount of gas to pay for to compensate the bundler for pre-verification execution and calldata",
  },
  {
    key: "maxFeePerGas?",
    type: "bigint",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas?",
    type: "bigint",
    description: "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  {
    key: "callGasLimitPercentageMultiplier?",
    type: "number",
    description: "Percentage added on top of the estimated callGasLimit (for example, 20 adds 20%)",
  },
  {
    key: "verificationGasLimitPercentageMultiplier?",
    type: "number",
    description: "Percentage added on top of the estimated verificationGasLimit (for example, 20 adds 20%)",
  },
  {
    key: "preVerificationGasPercentageMultiplier?",
    type: "number",
    description: "Percentage added on top of the estimated preVerificationGas (for example, 20 adds 20%)",
  },
  {
    key: "maxFeePerGasPercentageMultiplier?",
    type: "number",
    description: "Percentage added on top of the fetched maxFeePerGas (for example, 20 adds 20%)",
  },
  {
    key: "maxPriorityFeePerGasPercentageMultiplier?",
    type: "number",
    description: "Percentage added on top of the fetched maxPriorityFeePerGas (for example, 20 adds 20%)",
  },
  {
    key: "state_override_set?",
    type: "StateOverrideSet",
    description: "Pass state override set for simulation",
  },
  {
    key: "dummySignature?",
    type: "string",
    description: "Dummy signature for gas estimation",
  },
  {
    key: "skipGasEstimation?",
    type: "boolean",
    description:
      "When true, skip the bundler's eth_estimateUserOperationGas call. Gas limits fall back to any overrides or 0n. The returned UserOperation is always populated with a dummy signature so it stays valid for downstream paymaster sponsorship calls.",
  },
  {
    key: "gasLevel?",
    type: "GasOption",
    description: "Gas price level preference",
  },
  {
    key: "polygonGasStation?",
    type: "PolygonChain",
    description: "Polygon chain identifier for fetching gas prices from Polygon Gas Station",
  },
  {
    key: "parallelPaymasterInitValues?",
    type: "{ paymaster: string; paymasterVerificationGasLimit: bigint; paymasterPostOpGasLimit: bigint; paymasterData: string }",
    description:
      "Paymaster fields to include during gas estimation for parallel paymaster signing. Only works with EntryPoint v0.9 (Simple7702AccountV09). paymasterData must end with the PAYMASTER_SIG_MAGIC suffix 22e325a297439656",
  },
];

export const estimateUserOperationGasOverridesV8 = [
  {
    key: "stateOverrideSet?",
    type: "StateOverrideSet",
    description: "State override set for simulation",
  },
  {
    key: "dummySignature?",
    type: "string",
    description: "Dummy signature for gas estimation",
  },
];

// Static Methods
export const createAccountCallDataParam = [
  {
    key: "to",
    type: "string",
    description: "Target address for the transaction",
  },
  {
    key: "value",
    type: "bigint",
    description: "Value to transfer in the transaction",
  },
  {
    key: "data",
    type: "string",
    description: "Call data for the transaction",
  },
];

export const createAccountCallDataReturn = [
  {
    key: "callData",
    type: "string",
    description: "Encoded call data for the account transaction",
  },
];

export const createAccountCallDataSingleTransactionParam = [
  {
    key: "metaTransaction",
    type: simpleMetaTransactionType,
    description: "The SimpleMetaTransaction to create call data for",
  },
];

export const createAccountCallDataBatchTransactionsParam = [
  {
    key: "transactions",
    type: "SimpleMetaTransaction[]",
    description: "Array of SimpleMetaTransactions to batch together",
  },
];

export const prependTokenPaymasterApproveToCallDataStaticParam = [
  {
    key: "callData",
    type: "string",
    description: "Existing call data to prepend the approval to",
  },
  {
    key: "tokenAddress",
    type: "string",
    description: "Address of the ERC-20 token to approve",
  },
  {
    key: "paymasterAddress",
    type: "string",
    description: "Address of the paymaster contract",
  },
  {
    key: "approveAmount",
    type: "bigint",
    description: "Amount of tokens to approve for the paymaster",
  },
];

export const prependTokenPaymasterApproveToCallDataStaticReturn = [
  {
    key: "callData",
    type: "string",
    description: "Call data with token approval prepended",
  },
];

// Instance Methods
export const createUserOperationParam = [
  {
    key: "transactions",
    type: "SimpleMetaTransaction[]",
    description: "Array of transactions to include in the user operation",
  },
  {
    key: "providerRpc?",
    type: "string | Transport | JsonRpcNode",
    description: "Optional JSON-RPC provider URL for blockchain queries",
  },
  {
    key: "bundlerRpc?",
    type: "string | Transport | Bundler",
    description: "Optional bundler RPC URL for gas estimation",
  },
  {
    key: "overrides?",
    type: createUserOperationOverridesV8,
    description: "Optional overrides for user operation creation",
  },
];

export const createUserOperationReturn = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The constructed user operation for EIP-7702",
  },
];

export const estimateUserOperationGasParam = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The user operation to estimate gas for",
  },
  {
    key: "bundlerRpc",
    type: "string | Transport | Bundler",
    description: "Bundler RPC URL for gas estimation",
  },
  {
    key: "overrides?",
    type: estimateUserOperationGasOverridesV8,
    description: "Optional overrides for gas estimation",
  },
];

export const estimateUserOperationGasReturn = [
  {
    key: "gasLimits",
    type: "[bigint, bigint, bigint]",
    description: "Tuple of [preVerificationGas, verificationGasLimit, callGasLimit]",
  },
];

export const signUserOperationParam = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The user operation to sign",
  },
  {
    key: "privateKey",
    type: "string",
    description: "Private key to sign the user operation with",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "Chain ID for the target blockchain",
  },
];

export const signUserOperationReturn = [
  {
    key: "signature",
    type: "string",
    description: "The signature for the user operation",
  },
];

export const sendUserOperationParam = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The signed user operation to send",
  },
  {
    key: "bundlerRpc",
    type: "string | Transport | Bundler",
    description: "Bundler RPC URL to send the user operation to",
  },
];

export const sendUserOperationReturn = [
  {
    key: "response",
    type: sendUseroperationResponseType,
    description: "Response containing user operation hash and bundler details",
  },
];

export const prependTokenPaymasterApproveToCallDataParam = [
  {
    key: "callData",
    type: "string",
    description: "Existing call data to prepend the approval to",
  },
  {
    key: "tokenAddress",
    type: "string",
    description: "Address of the ERC-20 token to approve",
  },
  {
    key: "paymasterAddress",
    type: "string",
    description: "Address of the paymaster contract",
  },
  {
    key: "approveAmount",
    type: "bigint",
    description: "Amount of tokens to approve for the paymaster",
  },
];

export const prependTokenPaymasterApproveToCallDataReturn = [
  {
    key: "callData",
    type: "string",
    description: "Call data with token approval prepended",
  },
];

// Delegation Methods
export const isDelegatedToThisAccountParam = [
  {
    key: "providerRpc",
    type: "string | Transport | JsonRpcNode",
    description: "Ethereum JSON-RPC node URL",
  },
];

export const isDelegatedToThisAccountReturn = [
  {
    key: "isDelegated",
    type: "boolean",
    description: "true if the EOA is delegated to the expected address, false otherwise",
  },
];

export const createRevokeDelegationTransactionOverrides = [
  {
    key: "nonce?",
    type: "bigint",
    description: "Transaction nonce override",
  },
  {
    key: "authorizationNonce?",
    type: "bigint",
    description: "EIP-7702 authorization nonce override",
  },
  {
    key: "maxFeePerGas?",
    type: "bigint",
    description: "Maximum fee per gas (EIP-1559)",
  },
  {
    key: "maxPriorityFeePerGas?",
    type: "bigint",
    description: "Maximum priority fee per gas (EIP-1559)",
  },
  {
    key: "gasLimit?",
    type: "bigint",
    description: "Gas limit for the transaction",
  },
  {
    key: "chainId?",
    type: "bigint",
    description: "Chain ID override",
  },
];

export const createRevokeDelegationTransactionParam = [
  {
    key: "eoaPrivateKey",
    type: "string",
    description: "The EOA's private key (signs both the authorization and the transaction)",
  },
  {
    key: "providerRpc",
    type: "string | Transport | JsonRpcNode",
    description: "JSON-RPC endpoint for nonce, gas price, and chain ID queries",
  },
  {
    key: "overrides?",
    type: createRevokeDelegationTransactionOverrides,
    description: "Optional overrides for transaction fields",
  },
];

export const createRevokeDelegationTransactionReturn = [
  {
    key: "signedTransaction",
    type: "string",
    description: "Signed raw transaction hex, ready for eth_sendRawTransaction",
  },
];
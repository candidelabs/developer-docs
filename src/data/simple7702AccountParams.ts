// Simple7702Account Types and Parameters
import { userOperationParamV08, authorization7702HexType, userOperationReceiptResultType } from "./userOperation";
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

export const createUserOperationOverridesV8 = [
  {
    key: "eip7702Auth?",
    type: authorization7702HexType,
    description: "EIP-7702 authorization parameters for EOA delegation",
  },
  {
    key: "nonce?",
    type: "string",
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
    description: "Set the callGasLimitPercentageMultiplier instead of estimating gas using the bundler",
  },
  {
    key: "verificationGasLimitPercentageMultiplier?",
    type: "number",
    description: "Set the verificationGasLimitPercentageMultiplier instead of estimating gas using the bundler",
  },
  {
    key: "preVerificationGasPercentageMultiplier?",
    type: "number",
    description: "Set the preVerificationGasPercentageMultiplier instead of estimating gas using the bundler",
  },
  {
    key: "maxFeePerGasPercentageMultiplier?",
    type: "number",
    description: "Set the maxFeePerGasPercentageMultiplier instead of querying the current gas price from the RPC node",
  },
  {
    key: "maxPriorityFeePerGasPercentageMultiplier?",
    type: "number",
    description: "Set the maxPriorityFeePerGasPercentageMultiplier instead of querying the current gas price from the RPC node",
  },
  {
    key: "stateOverrideSet?",
    type: "StateOverrideSet",
    description: "Pass state override set for simulation",
  },
  {
    key: "dummySignature?",
    type: "string",
    description: "Dummy signature for gas estimation",
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
    type: "string",
    description: "Optional JSON-RPC provider URL for blockchain queries",
  },
  {
    key: "bundlerRpc?",
    type: "string",
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
    type: "string",
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
    description: "Tuple of [callGasLimit, verificationGasLimit, preVerificationGas]",
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
    type: "string",
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
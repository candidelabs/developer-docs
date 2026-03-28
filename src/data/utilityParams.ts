// Utility Functions Types and Parameters

// ============================================================
// UserOperation utils
// ============================================================

export const createUserOperationHashParams = [
  {
    key: "useroperation",
    type: "UserOperationV6 | UserOperationV7 | UserOperationV8 | UserOperationV9",
    description: "The UserOperation to hash",
  },
  {
    key: "entrypointAddress",
    type: "string",
    description: "The address of the EntryPoint contract",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID of the target network",
  },
];

export const createUserOperationHashReturn = [
  {
    key: "userOperationHash",
    type: "string",
    description: "The keccak256 hash of the packed UserOperation",
  },
];

export const createPackedUserOperationV6Params = [
  {
    key: "useroperation",
    type: "UserOperationV6",
    description: "A UserOperation following the EntryPoint v0.6 format",
  },
];

export const createPackedUserOperationV6Return = [
  {
    key: "packedUserOperation",
    type: "string",
    description: "ABI-encoded packed representation of the UserOperation",
  },
];

export const createPackedUserOperationV7Params = [
  {
    key: "useroperation",
    type: "UserOperationV7",
    description: "A UserOperation following the EntryPoint v0.7 format",
  },
];

export const createPackedUserOperationV7Return = [
  {
    key: "packedUserOperation",
    type: "string",
    description: "ABI-encoded packed representation of the UserOperation",
  },
];

export const fetchAccountNonceParams = [
  {
    key: "rpcUrl",
    type: "string",
    description: "The JSON-RPC URL of an Ethereum node",
  },
  {
    key: "entryPoint",
    type: "string",
    description: "The address of the EntryPoint contract",
  },
  {
    key: "account",
    type: "string",
    description: "The smart account address to query the nonce for",
  },
  {
    key: "key",
    type: "number",
    description: "Nonce key for parallel nonce channels (default: 0). Using different keys allows multiple independent UserOperations to be submitted concurrently.",
  },
];

export const fetchAccountNonceReturn = [
  {
    key: "nonce",
    type: "Promise<bigint>",
    description: "The current nonce of the account in the EntryPoint",
  },
];

export const calculateUserOperationMaxGasCostParams = [
  {
    key: "useroperation",
    type: "UserOperationV6 | UserOperationV7",
    description: "The UserOperation to calculate the maximum gas cost for",
  },
];

export const calculateUserOperationMaxGasCostReturn = [
  {
    key: "maxGasCost",
    type: "bigint",
    description: "The maximum gas cost in wei that the UserOperation could consume",
  },
];

export const getBalanceOfParams = [
  {
    key: "nodeRpcUrl",
    type: "string",
    description: "The JSON-RPC URL of an Ethereum node",
  },
  {
    key: "address",
    type: "string",
    description: "The account address to query the balance for",
  },
  {
    key: "entrypointAddress",
    type: "string",
    description: "The address of the EntryPoint contract",
  },
];

export const getBalanceOfReturn = [
  {
    key: "balance",
    type: "Promise<bigint>",
    description: "The account's deposited balance in the EntryPoint (in wei)",
  },
];

export const getDepositInfoParams = [
  {
    key: "nodeRpcUrl",
    type: "string",
    description: "The JSON-RPC URL of an Ethereum node",
  },
  {
    key: "address",
    type: "string",
    description: "The account address to query deposit information for",
  },
  {
    key: "entrypointAddress",
    type: "string",
    description: "The address of the EntryPoint contract",
  },
];

export const depositInfoType = [
  {
    key: "deposit",
    type: "bigint",
    description: "The deposited balance in the EntryPoint (in wei)",
  },
  {
    key: "staked",
    type: "boolean",
    description: "Whether the account has an active stake",
  },
  {
    key: "stake",
    type: "bigint",
    description: "The staked amount (in wei)",
  },
  {
    key: "unstakeDelaySec",
    type: "bigint",
    description: "The delay in seconds before unstaked funds can be withdrawn",
  },
  {
    key: "withdrawTime",
    type: "bigint",
    description: "The earliest time at which a withdrawal can complete",
  },
];

export const getDepositInfoReturn = [
  {
    key: "depositInfo",
    type: depositInfoType,
    description: "The full deposit information from the EntryPoint",
  },
];

// ============================================================
// Simulation utils
// ============================================================

export const simulateUserOperationWithTenderlyParams = [
  {
    key: "tenderlyAccountSlug",
    type: "string",
    description: "Your Tenderly account slug",
  },
  {
    key: "tenderlyProjectSlug",
    type: "string",
    description: "Your Tenderly project slug",
  },
  {
    key: "tenderlyAccessKey",
    type: "string",
    description: "Your Tenderly API access key",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID of the target network",
  },
  {
    key: "entrypointAddress",
    type: "string",
    description: "The address of the EntryPoint contract",
  },
  {
    key: "userOperation",
    type: "UserOperationV6 | UserOperationV7 | UserOperationV8 | UserOperationV9",
    description: "The UserOperation to simulate",
  },
  {
    key: "blockNumber",
    type: "number | null",
    description: "Block number to simulate against (default: null for latest)",
  },
  {
    key: "stateOverrides?",
    type: "OverrideType | null",
    description: "Optional state overrides applied during simulation",
  },
];

export const simulateUserOperationWithTenderlyReturn = [
  {
    key: "simulation",
    type: "SingleTransactionTenderlySimulationResult",
    description: "The simulation result from Tenderly",
  },
  {
    key: "simulationShareLink",
    type: "string",
    description: "A shareable Tenderly dashboard link for the simulation",
  },
];

export const simulateUserOperationCallDataWithTenderlyParams = [
  {
    key: "tenderlyAccountSlug",
    type: "string",
    description: "Your Tenderly account slug",
  },
  {
    key: "tenderlyProjectSlug",
    type: "string",
    description: "Your Tenderly project slug",
  },
  {
    key: "tenderlyAccessKey",
    type: "string",
    description: "Your Tenderly API access key",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID of the target network",
  },
  {
    key: "entrypointAddress",
    type: "string",
    description: "The address of the EntryPoint contract",
  },
  {
    key: "userOperation",
    type: "UserOperationV6ToSimulate | UserOperationV7ToSimulate | UserOperationV8ToSimulate | UserOperationV9ToSimulate",
    description: "A partial UserOperation with at least sender, nonce, and callData populated",
  },
  {
    key: "blockNumber",
    type: "number | null",
    description: "Block number to simulate against (default: null for latest)",
  },
  {
    key: "stateOverrides?",
    type: "OverrideType | null",
    description: "Optional state overrides applied during simulation",
  },
];

export const simulateUserOperationCallDataWithTenderlyReturn = [
  {
    key: "simulation",
    type: "TenderlySimulationResult",
    description: "The simulation result from Tenderly",
  },
  {
    key: "callDataSimulationShareLink",
    type: "string",
    description: "A shareable Tenderly dashboard link for the callData simulation",
  },
  {
    key: "accountDeploymentSimulationShareLink?",
    type: "string",
    description: "A shareable link for the account deployment simulation, if a factory was provided",
  },
];

export const simulateSenderCallDataWithTenderlyParams = [
  {
    key: "tenderlyAccountSlug",
    type: "string",
    description: "Your Tenderly account slug",
  },
  {
    key: "tenderlyProjectSlug",
    type: "string",
    description: "Your Tenderly project slug",
  },
  {
    key: "tenderlyAccessKey",
    type: "string",
    description: "Your Tenderly API access key",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID of the target network",
  },
  {
    key: "entrypointAddress",
    type: "string",
    description: "The address of the EntryPoint contract",
  },
  {
    key: "sender",
    type: "string",
    description: "The sender address to simulate the call from",
  },
  {
    key: "callData",
    type: "string",
    description: "The call data to simulate",
  },
  {
    key: "factory",
    type: "string | null",
    description: "Factory address if the account needs deployment (default: null)",
  },
  {
    key: "factoryData",
    type: "string | null",
    description: "Factory init data for account deployment (default: null)",
  },
  {
    key: "blockNumber",
    type: "number | null",
    description: "Block number to simulate against (default: null for latest)",
  },
  {
    key: "stateOverrides?",
    type: "OverrideType | null",
    description: "Optional state overrides applied during simulation",
  },
];

export const simulateSenderCallDataWithTenderlyReturn = [
  {
    key: "simulation",
    type: "TenderlySimulationResult",
    description: "The simulation result from Tenderly",
  },
  {
    key: "callDataSimulationShareLink",
    type: "string",
    description: "A shareable Tenderly dashboard link for the callData simulation",
  },
  {
    key: "accountDeploymentSimulationShareLink?",
    type: "string",
    description: "A shareable link for the account deployment simulation, if a factory was provided",
  },
];

// ============================================================
// Multicall utils
// ============================================================

export const metaTransactionType = [
  {
    key: "to",
    type: "string",
    description: "Target contract address",
  },
  {
    key: "value",
    type: "bigint",
    description: "Value to send with the transaction (in wei)",
  },
  {
    key: "data",
    type: "string",
    description: "Call data for the transaction",
  },
  {
    key: "operation",
    type: "Operation",
    description: "Operation type: 0 for Call, 1 for DelegateCall",
  },
];

export const encodeMultiSendCallDataParams = [
  {
    key: "metaTransactions",
    type: "MetaTransaction[]",
    description: "Array of MetaTransactions to encode into a single MultiSend call",
  },
];

export const encodeMultiSendCallDataReturn = [
  {
    key: "callData",
    type: "string",
    description: "ABI-encoded callData for the MultiSend contract",
  },
];

export const decodeMultiSendCallDataParams = [
  {
    key: "callData",
    type: "string",
    description: "The encoded MultiSend callData to decode",
  },
];

export const decodeMultiSendCallDataReturn = [
  {
    key: "decoded",
    type: "string",
    description: "Decoded representation of the MultiSend transactions",
  },
];

// ============================================================
// Generic Ethereum utils
// ============================================================

export const fetchGasPriceParams = [
  {
    key: "providerRpc",
    type: "string",
    description: "The JSON-RPC URL of an Ethereum node",
  },
  {
    key: "gasLevel",
    type: "GasOption",
    description: "Gas price tier: GasOption.Slow, GasOption.Medium (default), or GasOption.Fast",
  },
];

export const fetchGasPriceReturn = [
  {
    key: "gasPrices",
    type: "[bigint, bigint]",
    description: "A tuple of [maxFeePerGas, maxPriorityFeePerGas]",
  },
];

export const createCallDataParams = [
  {
    key: "functionSelector",
    type: "string",
    description: "The 4-byte function selector (e.g. from getFunctionSelector)",
  },
  {
    key: "functionInputAbi",
    type: "string[]",
    description: "Array of ABI type strings for the function parameters (e.g. [\"address\", \"uint256\"])",
  },
  {
    key: "functionInputParameters",
    type: "AbiInputValue[]",
    description: "Array of values matching the ABI types",
  },
];

export const createCallDataReturn = [
  {
    key: "callData",
    type: "string",
    description: "The ABI-encoded call data combining the selector and encoded parameters",
  },
];

export const getFunctionSelectorParams = [
  {
    key: "functionSignature",
    type: "string",
    description: "The function signature string (e.g. \"transfer(address,uint256)\")",
  },
];

export const getFunctionSelectorReturn = [
  {
    key: "selector",
    type: "string",
    description: "The first 4 bytes (8 hex characters) of the keccak256 hash of the function signature",
  },
];

export const sendJsonRpcRequestParams = [
  {
    key: "rpcUrl",
    type: "string",
    description: "The JSON-RPC endpoint URL",
  },
  {
    key: "method",
    type: "string",
    description: "The JSON-RPC method name",
  },
  {
    key: "params",
    type: "JsonRpcParam",
    description: "The parameters to pass to the JSON-RPC method",
  },
  {
    key: "headers",
    type: 'Record<string, string>',
    description: 'HTTP headers for the request (default: {"Content-Type": "application/json"})',
  },
  {
    key: "paramsKeyName",
    type: "string",
    description: 'Key name for the params field in the JSON-RPC body (default: "params"). Useful for non-standard JSON-RPC endpoints.',
  },
];

export const sendJsonRpcRequestReturn = [
  {
    key: "result",
    type: "Promise<JsonRpcResult>",
    description: "The JSON-RPC result, or an error if the request failed",
  },
];

export const sendEthCallRequestParams = [
  {
    key: "nodeRpcUrl",
    type: "string",
    description: "The JSON-RPC URL of an Ethereum node",
  },
  {
    key: "ethCallTransaction",
    type: "EthCallTransaction",
    description: "The transaction object for eth_call (to, data, and optionally from/value)",
  },
  {
    key: "blockNumber",
    type: "string | bigint",
    description: 'Block number to execute the call against, or "latest"',
  },
  {
    key: "stateOverrides?",
    type: "object",
    description: "Optional state overrides to apply during the call",
  },
];

export const sendEthCallRequestReturn = [
  {
    key: "result",
    type: "Promise<string>",
    description: "The hex-encoded return data from the contract call",
  },
];

export const sendEthGetCodeRequestParams = [
  {
    key: "nodeRpcUrl",
    type: "string",
    description: "The JSON-RPC URL of an Ethereum node",
  },
  {
    key: "contractAddress",
    type: "string",
    description: "The address to retrieve the deployed bytecode for",
  },
  {
    key: "blockNumber",
    type: "string | bigint",
    description: 'Block number to query, or "latest"',
  },
];

export const sendEthGetCodeRequestReturn = [
  {
    key: "code",
    type: "Promise<string>",
    description: "The hex-encoded bytecode deployed at the address, or \"0x\" if no code exists",
  },
];

export const getDelegatedAddressParams = [
  {
    key: "accountAddress",
    type: "string",
    description: "The EOA address to check for EIP-7702 delegation",
  },
  {
    key: "providerRpc",
    type: "string",
    description: "The JSON-RPC URL of an Ethereum node",
  },
];

export const getDelegatedAddressReturn = [
  {
    key: "delegatedAddress",
    type: "Promise<string | null>",
    description: "The address the EOA is delegated to, or null if not delegated",
  },
];

// ============================================================
// EIP-7702 utils
// ============================================================

export const createAndSignEip7702DelegationAuthorizationParams = [
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID for the delegation authorization",
  },
  {
    key: "address",
    type: "string",
    description: "The contract address to delegate to",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The authorization nonce of the EOA",
  },
  {
    key: "signer",
    type: "string | ((hash: string) => Promise<string>)",
    description: "Either a hex-encoded private key for synchronous signing, or an async callback that receives the authorization hash and returns a signature. The callback form supports viem wallets, ethers Signers, hardware wallets, and MPC signers.",
  },
];

export const authorization7702HexReturnType = [
  {
    key: "chainId",
    type: "string",
    description: "Hex-encoded chain ID",
  },
  {
    key: "address",
    type: "string",
    description: "The delegatee contract address",
  },
  {
    key: "nonce",
    type: "string",
    description: "Hex-encoded authorization nonce",
  },
  {
    key: "yParity",
    type: "string",
    description: "Hex-encoded y-parity of the signature",
  },
  {
    key: "r",
    type: "string",
    description: "Hex-encoded r component of the signature",
  },
  {
    key: "s",
    type: "string",
    description: "Hex-encoded s component of the signature",
  },
];

export const createAndSignEip7702DelegationAuthorizationReturn = [
  {
    key: "authorization",
    type: "Authorization7702Hex",
    description: "The signed EIP-7702 delegation authorization",
  },
];

export const createRevokeDelegationAuthorizationParams = [
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID for the revocation authorization",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The authorization nonce of the EOA",
  },
  {
    key: "eoaPrivateKey",
    type: "string",
    description: "The hex-encoded private key of the EOA",
  },
];

export const createRevokeDelegationAuthorizationReturn = [
  {
    key: "authorization",
    type: "Authorization7702Hex",
    description: "A signed authorization that delegates to address(0), revoking the existing delegation",
  },
];

export const createEip7702DelegationAuthorizationHashParams = [
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID for the authorization",
  },
  {
    key: "address",
    type: "string",
    description: "The delegatee contract address",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The authorization nonce",
  },
];

export const createEip7702DelegationAuthorizationHashReturn = [
  {
    key: "hash",
    type: "string",
    description: "The keccak256 hash of the RLP-encoded authorization with the MAGIC prefix (0x05), as specified by EIP-7702",
  },
];

export const createAndSignEip7702RawTransactionParams = [
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID for the transaction",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The transaction nonce",
  },
  {
    key: "max_priority_fee_per_gas",
    type: "bigint",
    description: "Maximum priority fee per gas (EIP-1559)",
  },
  {
    key: "max_fee_per_gas",
    type: "bigint",
    description: "Maximum fee per gas (EIP-1559)",
  },
  {
    key: "gas_limit",
    type: "bigint",
    description: "Gas limit for the transaction",
  },
  {
    key: "destination",
    type: "string",
    description: "The target address for the transaction",
  },
  {
    key: "value",
    type: "bigint",
    description: "Value to send in wei",
  },
  {
    key: "data",
    type: "string",
    description: "The call data for the transaction",
  },
  {
    key: "access_list",
    type: "[string, string[]][]",
    description: "EIP-2930 access list: array of [address, storageKeys] tuples",
  },
  {
    key: "authorization_list",
    type: "Authorization7702[]",
    description: "Array of EIP-7702 authorizations to include in the transaction",
  },
  {
    key: "eoaPrivateKey",
    type: "string",
    description: "The hex-encoded private key to sign the transaction with",
  },
];

export const createAndSignEip7702RawTransactionReturn = [
  {
    key: "rawTransaction",
    type: "string",
    description: "The signed, RLP-encoded EIP-7702 transaction with the 0x04 type prefix, ready for eth_sendRawTransaction",
  },
];

export const createEip7702TransactionHashParams = [
  {
    key: "chainId",
    type: "bigint",
    description: "The chain ID for the transaction",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The transaction nonce",
  },
  {
    key: "max_priority_fee_per_gas",
    type: "bigint",
    description: "Maximum priority fee per gas (EIP-1559)",
  },
  {
    key: "max_fee_per_gas",
    type: "bigint",
    description: "Maximum fee per gas (EIP-1559)",
  },
  {
    key: "gas_limit",
    type: "bigint",
    description: "Gas limit for the transaction",
  },
  {
    key: "destination",
    type: "string",
    description: "The target address for the transaction",
  },
  {
    key: "value",
    type: "bigint",
    description: "Value to send in wei",
  },
  {
    key: "data",
    type: "string",
    description: "The call data for the transaction",
  },
  {
    key: "access_list",
    type: "[string, string[]][]",
    description: "EIP-2930 access list: array of [address, storageKeys] tuples",
  },
  {
    key: "authorization_list",
    type: "Authorization7702[]",
    description: "Array of EIP-7702 authorizations to include in the transaction",
  },
];

export const createEip7702TransactionHashReturn = [
  {
    key: "hash",
    type: "string",
    description: "The keccak256 hash of the RLP-encoded EIP-7702 transaction with the 0x04 type prefix, used for signing",
  },
];

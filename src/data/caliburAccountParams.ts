// Calibur7702Account Types and Parameters
import { userOperationParamV08, authorization7702HexType } from "./userOperation";
import { sendUseroperationResponseType } from "../requestRpcData";

// ─── Type Definitions ───────────────────────────────────────────────────────

export const caliburKeyTypeEnum = [
  {
    key: "P256",
    type: "0",
    description: "Raw P-256 (secp256r1) key",
  },
  {
    key: "WebAuthnP256",
    type: "1",
    description: "WebAuthn-wrapped P-256 key (passkey)",
  },
  {
    key: "Secp256k1",
    type: "2",
    description: "secp256k1 key (standard Ethereum EOA)",
  },
];

export const caliburKeyType = [
  {
    key: "CaliburKey",
    type: [
      {
        key: "keyType",
        type: "CaliburKeyType",
        description: "The type of cryptographic key (P256, WebAuthnP256, or Secp256k1)",
      },
      {
        key: "publicKey",
        type: "string",
        description: "ABI-encoded public key bytes (hex string)",
      },
    ],
    description: "A key registered on a Calibur account.",
  },
];

export const caliburKeySettingsType = [
  {
    key: "CaliburKeySettings",
    type: [
      {
        key: "hook?",
        type: "string",
        description: "Hook contract address called during validation (zero address = no hook)",
      },
      {
        key: "expiration?",
        type: "number",
        description: "Unix timestamp after which the key expires (0 = never)",
      },
      {
        key: "isAdmin?",
        type: "boolean",
        description: "Whether the key has admin privileges",
      },
    ],
    description: "Settings for a key registered on a Calibur account. All fields are optional.",
  },
];

export const caliburKeySettingsResultType = [
  {
    key: "CaliburKeySettingsResult",
    type: [
      {
        key: "hook",
        type: "string",
        description: "Hook contract address called during validation (zero address = no hook)",
      },
      {
        key: "expiration",
        type: "number",
        description: "Unix timestamp after which the key expires (0 = never)",
      },
      {
        key: "isAdmin",
        type: "boolean",
        description: "Whether the key has admin privileges",
      },
    ],
    description:
      "Concrete key settings returned from on-chain reads. All fields are required since the contract always returns concrete values.",
  },
];

export const webAuthnSignatureDataType = [
  {
    key: "WebAuthnSignatureData",
    type: [
      {
        key: "authenticatorData",
        type: "string",
        description: "Authenticator data bytes (hex string)",
      },
      {
        key: "clientDataJSON",
        type: "string",
        description: "Client data JSON string (UTF-8)",
      },
      {
        key: "challengeIndex",
        type: "bigint",
        description: "Index of the challenge in clientDataJSON",
      },
      {
        key: "typeIndex",
        type: "bigint",
        description: "Index of the type field in clientDataJSON",
      },
      {
        key: "r",
        type: "bigint",
        description: "ECDSA signature r component",
      },
      {
        key: "s",
        type: "bigint",
        description: "ECDSA signature s component",
      },
    ],
    description:
      "WebAuthn assertion data matching the on-chain WebAuthn.WebAuthnAuth struct. Used when signing UserOperations with a passkey.",
  },
];

export const caliburSignatureOverridesType = [
  {
    key: "hookData?",
    type: "string",
    description: 'Hook data to append to the signature (default: "0x" = empty)',
  },
  {
    key: "keyHash?",
    type: "string",
    description:
      "Key hash of a registered secondary key. If omitted, the root key hash is used.",
  },
];

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
        description:
          "Value transferred in the transaction (usually 0n for contract interactions)",
      },
      {
        key: "data",
        type: "string",
        description: "The call data for the transaction",
      },
    ],
    description:
      "SimpleMetaTransaction is the type of transaction used with Calibur7702Account.",
  },
];

// ─── Override Arrays ────────────────────────────────────────────────────────

export const caliburCreateUserOperationOverrides = [
  {
    key: "nonce?",
    type: "bigint",
    description: "Set the nonce instead of querying from the RPC node",
  },
  {
    key: "callData?",
    type: "string",
    description: "Set the callData instead of encoding the provided MetaTransactions",
  },
  {
    key: "callGasLimit?",
    type: "bigint",
    description: "Set the callGasLimit instead of estimating via the bundler",
  },
  {
    key: "verificationGasLimit?",
    type: "bigint",
    description: "Set the verificationGasLimit instead of estimating via the bundler",
  },
  {
    key: "preVerificationGas?",
    type: "bigint",
    description: "Set the preVerificationGas instead of estimating via the bundler",
  },
  {
    key: "maxFeePerGas?",
    type: "bigint",
    description: "Set the maxFeePerGas instead of querying current gas price",
  },
  {
    key: "maxPriorityFeePerGas?",
    type: "bigint",
    description: "Set the maxPriorityFeePerGas instead of querying current gas price",
  },
  {
    key: "callGasLimitPercentageMultiplier?",
    type: "number",
    description: "Percentage multiplier applied to estimated callGasLimit",
  },
  {
    key: "verificationGasLimitPercentageMultiplier?",
    type: "number",
    description: "Percentage multiplier applied to estimated verificationGasLimit",
  },
  {
    key: "preVerificationGasPercentageMultiplier?",
    type: "number",
    description: "Percentage multiplier applied to estimated preVerificationGas",
  },
  {
    key: "maxFeePerGasPercentageMultiplier?",
    type: "number",
    description:
      "Percentage multiplier applied to fetched maxFeePerGas",
  },
  {
    key: "maxPriorityFeePerGasPercentageMultiplier?",
    type: "number",
    description:
      "Percentage multiplier applied to fetched maxPriorityFeePerGas",
  },
  {
    key: "state_override_set?",
    type: "StateOverrideSet",
    description: "State overrides for gas estimation",
  },
  {
    key: "dummySignature?",
    type: "string",
    description: "Override the dummy signature used during gas estimation",
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
    key: "revertOnFailure?",
    type: "boolean",
    description:
      "Whether BatchedCall should revert on individual call failure (default: true)",
  },
  {
    key: "paymasterFields?",
    type: "ParallelPaymasterInitValues",
    description:
      "Paymaster init values for gas estimation. Set these to include paymaster data during gas estimation so preVerificationGas is accurate.",
  },
  {
    key: "eip7702Auth?",
    type: authorization7702HexType,
    description:
      "EIP-7702 authorization fields. Required for the first UserOperation to delegate the EOA to the Calibur singleton.",
  },
];

// ─── Essential Methods ──────────────────────────────────────────────────────

// createUserOperation
export const createUserOperationParam = [
  {
    key: "transactions",
    type: "SimpleMetaTransaction[]",
    description: "Array of transactions to include in the user operation",
  },
  {
    key: "providerRpc?",
    type: "string",
    description: "JSON-RPC provider URL for nonce and gas price queries",
  },
  {
    key: "bundlerRpc?",
    type: "string",
    description: "Bundler RPC URL for gas estimation",
  },
  {
    key: "overrides?",
    type: caliburCreateUserOperationOverrides,
    description: "Optional overrides for gas, nonce, and EIP-7702 auth fields",
  },
];

export const createUserOperationReturn = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The constructed unsigned UserOperation for EIP-7702",
  },
];

// signUserOperation
export const signUserOperationParam = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The user operation to sign",
  },
  {
    key: "privateKey",
    type: "string",
    description: "Hex-encoded private key to sign the user operation with",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "Chain ID for the target blockchain",
  },
  {
    key: "overrides?",
    type: caliburSignatureOverridesType,
    description: "Optional overrides (keyHash for secondary keys, hookData)",
  },
];

export const signUserOperationReturn = [
  {
    key: "signature",
    type: "string",
    description: "Hex-encoded wrapped signature in Calibur format",
  },
];

// signUserOperationWithSigner
export const signUserOperationWithSignerParam = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The user operation to sign",
  },
  {
    key: "signer",
    type: "SignerFunction",
    description:
      "Async signing function: (hash: string) => Promise<string>. Use this to integrate viem, ethers Signers, hardware wallets, or MPC signers.",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "Chain ID for the target blockchain",
  },
  {
    key: "overrides?",
    type: caliburSignatureOverridesType,
    description: "Optional overrides (keyHash for secondary keys, hookData)",
  },
];

export const signUserOperationWithSignerReturn = [
  {
    key: "signature",
    type: "string",
    description: "Hex-encoded wrapped signature in Calibur format",
  },
];

// formatWebAuthnSignature
export const formatWebAuthnSignatureParam = [
  {
    key: "keyHash",
    type: "string",
    description: "The key hash of the registered passkey (from getKeyHash)",
  },
  {
    key: "webAuthnAuth",
    type: webAuthnSignatureDataType,
    description: "WebAuthn assertion data from the browser",
  },
  {
    key: "overrides?",
    type: caliburSignatureOverridesType,
    description: "Optional signature overrides (e.g., hookData)",
  },
];

export const formatWebAuthnSignatureReturn = [
  {
    key: "signature",
    type: "string",
    description: "Hex-encoded wrapped signature in Calibur format",
  },
];

// sendUserOperation
export const sendUserOperationParam = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The signed user operation to submit",
  },
  {
    key: "bundlerRpc",
    type: "string",
    description: "Bundler RPC endpoint to send the user operation to",
  },
];

export const sendUserOperationReturn = [
  {
    key: "response",
    type: sendUseroperationResponseType,
    description: "Response containing user operation hash and bundler details",
  },
];

// ─── Key Helpers (Static) ───────────────────────────────────────────────────

// createSecp256k1Key
export const createSecp256k1KeyParam = [
  {
    key: "address",
    type: "string",
    description: "The Ethereum address (EOA public address)",
  },
];

export const createSecp256k1KeyReturn = [
  {
    key: "key",
    type: caliburKeyType,
    description: "A CaliburKey with type Secp256k1",
  },
];

// createWebAuthnP256Key
export const createWebAuthnP256KeyParam = [
  {
    key: "x",
    type: "bigint",
    description: "The x coordinate of the P-256 public key",
  },
  {
    key: "y",
    type: "bigint",
    description: "The y coordinate of the P-256 public key",
  },
];

export const createWebAuthnP256KeyReturn = [
  {
    key: "key",
    type: caliburKeyType,
    description: "A CaliburKey with type WebAuthnP256",
  },
];

// createP256Key
export const createP256KeyParam = [
  {
    key: "x",
    type: "bigint",
    description: "The x coordinate of the P-256 public key",
  },
  {
    key: "y",
    type: "bigint",
    description: "The y coordinate of the P-256 public key",
  },
];

export const createP256KeyReturn = [
  {
    key: "key",
    type: caliburKeyType,
    description: "A CaliburKey with type P256",
  },
];

// getKeyHash
export const getKeyHashParam = [
  {
    key: "key",
    type: caliburKeyType,
    description: "The key to compute the hash for",
  },
];

export const getKeyHashReturn = [
  {
    key: "keyHash",
    type: "string",
    description: "The key hash as a bytes32 hex string",
  },
];

// createRegisterKeyMetaTransactions
export const createRegisterKeyMetaTransactionsParam = [
  {
    key: "key",
    type: caliburKeyType,
    description: "The key to register",
  },
  {
    key: "settings?",
    type: caliburKeySettingsType,
    description:
      "Optional key settings. isAdmin is always forced to false for safety.",
  },
];

export const createRegisterKeyMetaTransactionsReturn = [
  {
    key: "transactions",
    type: "[SimpleMetaTransaction, SimpleMetaTransaction]",
    description:
      "A tuple of exactly two SimpleMetaTransactions: [registerTx, updateTx]. Both must be included in the same UserOperation.",
  },
];

// createRevokeKeyMetaTransaction
export const createRevokeKeyMetaTransactionParam = [
  {
    key: "keyHash",
    type: "string",
    description: "The key hash of the key to revoke",
  },
];

export const createRevokeKeyMetaTransactionReturn = [
  {
    key: "transaction",
    type: simpleMetaTransactionType,
    description: "A SimpleMetaTransaction that calls revoke(bytes32)",
  },
];

// createUpdateKeySettingsMetaTransaction
export const createUpdateKeySettingsMetaTransactionParam = [
  {
    key: "keyHash",
    type: "string",
    description: "The key hash of the key to update",
  },
  {
    key: "settings",
    type: caliburKeySettingsType,
    description:
      "New settings for the key. isAdmin must not be true (throws if true).",
  },
];

export const createUpdateKeySettingsMetaTransactionReturn = [
  {
    key: "transaction",
    type: simpleMetaTransactionType,
    description: "A SimpleMetaTransaction that calls update(bytes32, uint256)",
  },
];

// packKeySettings
export const packKeySettingsParam = [
  {
    key: "settings",
    type: caliburKeySettingsType,
    description: "The key settings to pack",
  },
];

export const packKeySettingsReturn = [
  {
    key: "packed",
    type: "bigint",
    description:
      "The packed settings as a single uint256 value. Layout: (isAdmin << 200) | (expiration << 160) | hook",
  },
];

// unpackKeySettings
export const unpackKeySettingsParam = [
  {
    key: "packed",
    type: "bigint",
    description: "The packed settings uint256 value to unpack",
  },
];

export const unpackKeySettingsReturn = [
  {
    key: "settings",
    type: caliburKeySettingsResultType,
    description: "Parsed key settings with all fields populated",
  },
];

// ─── Read Functions (Instance, RPC Calls) ───────────────────────────────────

// isKeyRegistered
export const isKeyRegisteredParam = [
  {
    key: "providerRpc",
    type: "string",
    description: "JSON-RPC endpoint for blockchain queries",
  },
  {
    key: "keyHash",
    type: "string",
    description: "The key hash to check",
  },
];

export const isKeyRegisteredReturn = [
  {
    key: "isRegistered",
    type: "boolean",
    description: "True if the key is registered on this account",
  },
];

// getKeySettings
export const getKeySettingsParam = [
  {
    key: "providerRpc",
    type: "string",
    description: "JSON-RPC endpoint for blockchain queries",
  },
  {
    key: "keyHash",
    type: "string",
    description: "The key hash to query settings for",
  },
];

export const getKeySettingsReturn = [
  {
    key: "settings",
    type: caliburKeySettingsResultType,
    description: "Parsed key settings with all fields populated",
  },
];

// getKey
export const getKeyParam = [
  {
    key: "providerRpc",
    type: "string",
    description: "JSON-RPC endpoint for blockchain queries",
  },
  {
    key: "keyHash",
    type: "string",
    description: "The key hash to query",
  },
];

export const getKeyReturn = [
  {
    key: "key",
    type: caliburKeyType,
    description: "The CaliburKey associated with the given key hash",
  },
];

// listKeys
export const listKeysParam = [
  {
    key: "providerRpc",
    type: "string",
    description: "JSON-RPC endpoint for blockchain queries",
  },
];

export const listKeysReturn = [
  {
    key: "keys",
    type: "CaliburKey[]",
    description: "Array of all registered CaliburKeys on this account",
  },
];

// isDelegated
export const isDelegatedParam = [
  {
    key: "providerRpc",
    type: "string",
    description: "JSON-RPC endpoint for blockchain queries",
  },
];

export const isDelegatedReturn = [
  {
    key: "isDelegated",
    type: "boolean",
    description:
      "True if the EOA is delegated to this account's Calibur singleton, false otherwise",
  },
];

// getNonce
export const getNonceParam = [
  {
    key: "providerRpc",
    type: "string",
    description: "JSON-RPC endpoint for blockchain queries",
  },
  {
    key: "sequenceKey?",
    type: "number",
    description: "Optional sequence key for parallel nonce channels (default: 0)",
  },
];

export const getNonceReturn = [
  {
    key: "nonce",
    type: "bigint",
    description: "The fully constructed nonce (sequenceKey << 64) | seq",
  },
];

// ─── Utility Methods ────────────────────────────────────────────────────────

// createAccountCallData
export const createAccountCallDataParam = [
  {
    key: "transactions",
    type: "SimpleMetaTransaction[]",
    description: "One or more transactions to encode into BatchedCall format",
  },
  {
    key: "revertOnFailure?",
    type: "boolean",
    description:
      "Whether to revert the entire batch if any call fails (default: true)",
  },
];

export const createAccountCallDataReturn = [
  {
    key: "callData",
    type: "string",
    description: "Encoded calldata for the executeUserOp function",
  },
];

// wrapSignature
export const wrapSignatureParam = [
  {
    key: "keyHash",
    type: "string",
    description:
      "The key hash (use 0x00...00 for the EOA root key)",
  },
  {
    key: "rawSignature",
    type: "string",
    description: "The raw ECDSA signature (65 bytes, hex-encoded)",
  },
  {
    key: "hookData?",
    type: "string",
    description: 'Optional hook data (default: "0x")',
  },
];

export const wrapSignatureReturn = [
  {
    key: "signature",
    type: "string",
    description: "Hex-encoded wrapped signature ready for userOp.signature",
  },
];

// createDummyWebAuthnSignature
export const createDummyWebAuthnSignatureParam = [
  {
    key: "keyHash",
    type: "string",
    description:
      "The key hash of a registered passkey (from getKeyHash). Must correspond to an actually registered key.",
  },
];

export const createDummyWebAuthnSignatureReturn = [
  {
    key: "signature",
    type: "string",
    description:
      "A dummy signature suitable for passing as dummySignature override during gas estimation",
  },
];

// getUserOperationHash
export const getUserOperationHashParam = [
  {
    key: "userOperation",
    type: userOperationParamV08,
    description: "The UserOperation to hash",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "Target chain ID",
  },
];

export const getUserOperationHashReturn = [
  {
    key: "hash",
    type: "string",
    description: "The UserOperation hash as a hex string",
  },
];

// prependTokenPaymasterApproveToCallData
export const prependTokenPaymasterApproveToCallDataParam = [
  {
    key: "callData",
    type: "string",
    description: "Existing encoded calldata (executeUserOp format)",
  },
  {
    key: "tokenAddress",
    type: "string",
    description: "Address of the ERC-20 token contract to approve",
  },
  {
    key: "paymasterAddress",
    type: "string",
    description: "Address of the paymaster contract to approve as spender",
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
    description: "Re-encoded calldata with the token approval prepended",
  },
];

// createInvalidateNonceMetaTransaction
export const createInvalidateNonceMetaTransactionParam = [
  {
    key: "newNonce",
    type: "bigint",
    description: "The new nonce value (all nonces below this are invalidated)",
  },
];

export const createInvalidateNonceMetaTransactionReturn = [
  {
    key: "transaction",
    type: simpleMetaTransactionType,
    description: "A SimpleMetaTransaction that calls invalidateNonce(uint256)",
  },
];

export const userOperationReturnParamsV06 = [
  {
    key: "sender",
    type: "string",
    description: "The account making the operation",
  },
  {
    key: "nonce",
    type: "string",
    description: "Anti-replay parameter (see “Semi-abstracted Nonce Support” )",
  },
  {
    key: "initCode",
    type: "string",
    description:
      "The initCode of the account (needed if and only if the account is not yet on-chain and needs to be created)",
  },
  {
    key: "callData",
    type: "string",
    description:
      "The data to pass to the sender during the main execution call",
  },
  {
    key: "callGasLimit",
    type: "bigint",
    description: "The amount of gas to allocate the main execution call",
  },
  {
    key: "verificationGasLimit",
    type: "bigint",
    description: "The amount of gas to allocate for the verification step",
  },
  {
    key: "preVerificationGas",
    type: "bigint",
    description:
      "The amount of gas to pay for to compensate the bundler for pre-verification execution and calldata",
  },
  {
    key: "maxFeePerGas",
    type: "bigint",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "bigint",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  {
    key: "paymasterAndData",
    type: "string",
    description:
      "Address of paymaster sponsoring the transaction, followed by extra data to send to the paymaster (empty for self-sponsored transaction). Revolves to '0x' if not using a paymaster, and a paymasterDummyData when estimating gas",
  },
  {
    key: "signature",
    type: "string",
    description:
      "The signature for the userOperation. It is the data passed into the account along with the nonce during the verification step. Resolves to '0x' when the user did not provide their signature yet",
  },
];

export const userOperationParamV07 = [
  {
    key: "sender",
    type: "string",
    description: "The account making the operation",
  },
  {
    key: "nonce",
    type: "string",
    description: "Anti-replay parameter (see “Semi-abstracted Nonce Support” )",
  },
  {
    key: "factory",
    type: "string",
    description: "account factory, only for new accounts",
  },
  {
    key: "factoryData",
    type: "string",
    description: "data for account factory (only if account factory exists)",
  },
  {
    key: "callData",
    type: "string",
    description:
      "The data to pass to the sender during the main execution call",
  },
  {
    key: "callGasLimit",
    type: "bigint",
    description: "The amount of gas to allocate the main execution call",
  },
  {
    key: "verificationGasLimit",
    type: "bigint",
    description: "The amount of gas to allocate for the verification step",
  },
  {
    key: "preVerificationGas",
    type: "bigint",
    description: "Extra gas to pay the bunder",
  },
  {
    key: "maxFeePerGas",
    type: "bigint",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "bigint",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  {
    key: "paymaster",
    type: "string",
    description:
      "Address of paymaster contract, (or empty, if account pays for itself)",
  },
  {
    key: "paymasterVerificationGasLimit",
    type: "string",
    description:
      "The amount of gas to allocate for the paymaster post-operation code",
  },
  {
    key: "paymasterPostOpGasLimit",
    type: "string",
    description:
      "The amount of gas to allocate for the paymaster post-operation code",
  },
  {
    key: "paymasterData",
    type: "string",
    description: "Data for paymaster (only if paymaster exists)",
  },
  {
    key: "signature",
    type: "string",
    description: "Data passed into the account to verify authorization",
  },
];

export const userOperationParamV08 = [
  {
    key: "sender",
    type: "string",
    description: "The account making the operation",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "Anti-replay parameter (see Semi-abstracted Nonce Support)",
  },
  {
    key: "factory",
    type: "string | null",
    description: "Account factory address, only for new accounts (null if account already exists)",
  },
  {
    key: "factoryData",
    type: "string | null",
    description: "Data for account factory (null if account already exists)",
  },
  {
    key: "callData",
    type: "string",
    description: "The data to pass to the sender during the main execution call",
  },
  {
    key: "callGasLimit",
    type: "bigint",
    description: "The amount of gas to allocate the main execution call",
  },
  {
    key: "verificationGasLimit",
    type: "bigint",
    description: "The amount of gas to allocate for the verification step",
  },
  {
    key: "preVerificationGas",
    type: "bigint",
    description: "The amount of gas to pay for to compensate the bundler for pre-verification execution and calldata",
  },
  {
    key: "maxFeePerGas",
    type: "bigint",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "bigint",
    description: "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  {
    key: "paymaster",
    type: "string | null",
    description: "Address of paymaster contract (null if account pays for itself)",
  },
  {
    key: "paymasterVerificationGasLimit",
    type: "bigint | null",
    description: "The amount of gas to allocate for the paymaster verification step (null if no paymaster)",
  },
  {
    key: "paymasterPostOpGasLimit",
    type: "bigint | null",
    description: "The amount of gas to allocate for the paymaster post-operation code (null if no paymaster)",
  },
  {
    key: "paymasterData",
    type: "string | null",
    description: "Data for paymaster (null if no paymaster)",
  },
  {
    key: "eip7702Auth",
    type: "Authorization7702Hex | null",
    description: "EIP-7702 authorization data for EOA delegation (null if not using EIP-7702)",
  },
  {
    key: "signature",
    type: "string",
    description: "Data passed into the account to verify authorization. Resolves to '0x' when the user did not provide their signature yet",
  },
];

export const authorization7702HexType = [
  {
    key: "chainId",
    type: "string",
    description: "Chain ID in hexadecimal format where the authorization is valid",
  },
  {
    key: "address",
    type: "string",
    description: "Address to authorize for the EOA delegation",
  },
  {
    key: "nonce",
    type: "string",
    description: "Authorization nonce in hexadecimal format",
  },
  {
    key: "yParity",
    type: "string",
    description: "Y parity of the authorization signature",
  },
  {
    key: "r",
    type: "string",
    description: "R component of the authorization signature",
  },
  {
    key: "s",
    type: "string",
    description: "S component of the authorization signature",
  },
];

export const userOperationReceiptType = [
  {
    key: "blockHash",
    type: "string",
    description: "The hash of the block in which the transaction was included.",
  },
  {
    key: "blockNumber",
    type: "bigint",
    description:
      "The number of the block in which the transaction was included.",
  },
  {
    key: "from",
    type: "string",
    description: "The address that initiated the transaction.",
  },
  {
    key: "cumulativeGasUsed",
    type: "bigint",
    description:
      "The total amount of gas used in the block up to and including this transaction.",
  },
  {
    key: "gasUsed",
    type: "bigint",
    description: "The amount of gas used by this transaction.",
  },
  {
    key: "logs",
    type: "string",
    description: "Logs generated by the transaction.",
  },
  {
    key: "logsBloom",
    type: "string",
    description: "The bloom filter for the logs generated by the transaction.",
  },
  {
    key: "transactionHash",
    type: "string",
    description: "The unique hash of the transaction.",
  },
  {
    key: "transactionIndex",
    type: "bigint",
    description: "The index of the transaction within the block.",
  },
  {
    key: "effectiveGasPrice",
    type: "bigint",
    description:
      "The effective gas price for the transaction. This field is optional and may not be present in all receipts.",
  },
];

export const userOperationReceiptResultType = [
  {
    key: "userOpHash",
    type: "string",
    description: "The hash of the user operation.",
  },
  {
    key: "entryPoint",
    type: "string",
    description:
      "The address of the entry point contract that processed the operation.",
  },
  {
    key: "sender",
    type: "string",
    description: "The address of the sender of the user operation.",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The nonce of the user operation.",
  },
  {
    key: "paymaster",
    type: "string",
    description:
      "The address of the paymaster that paid for the gas of the user operation.",
  },
  {
    key: "actualGasCost",
    type: "bigint",
    description:
      "The actual gas cost incurred for executing the user operation.",
  },
  {
    key: "actualGasUsed",
    type: "bigint",
    description: "The actual amount of gas used for the user operation.",
  },
  {
    key: "success",
    type: "boolean",
    description: "Indicates whether the user operation was successful.",
  },
  {
    key: "logs",
    type: "string",
    description:
      "The logs produced during the execution of the user operation.",
  },
  {
    key: "receipt",
    type: userOperationReceiptType,
    description: "The detailed receipt of the user operation.",
  },
];

export const stateOverrideSetType = [
  {
    key: "[address: string]",
    type: [
      {
        key: "balance",
        type: "bigint",
        description: "Override the balance of the address",
      },
      {
        key: "nonce",
        type: "bigint",
        description: "Override the nonce of the address",
      },
      {
        key: "code",
        type: "string",
        description: "Override the code of the address",
      },
      {
        key: "state",
        type: "Dictionary<string>",
        description: "Override the storage slots of the address",
      },
      {
        key: "stateDiff",
        type: "Dictionary<string>",
        description:
          "Apply state differences to the storage slots of the address",
      },
    ],
    description: "Overrides for a specific address",
  },
];

export const GasOptionType = [
  {
    key: "Slow",
    type: "1",
    description: "Default Slow Gas",
  },
  {
    key: "Medium",
    type: "1.2",
    description: "Medium Gas with a 20% increase",
  },
  {
    key: "Fast",
    type: "1.5",
    description: "Medium Gas with a 50% increase",
  },
];

export const PolygonChainType = [
  {
    key: "Mainnet",
    type: "v2",
    description: "Polygon PoS Mainnet",
  },
  {
    key: "ZkMainnet",
    type: "zkevm",
    description: "Polygon zkEVM Mainnet",
  },
  {
    key: "Amoy",
    type: "amoy",
    description: "Polygon Amoy PoS Testnet",
  },
  {
    key: "Cardona",
    type: "cardona",
    description: "Polygon Cardona zkEVM Testnet",
  },
];

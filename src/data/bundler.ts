export const chainIdReturn = [
  {
    key: "chainId",
    type: "Promise<string>",
    description: "Target ChainId of the Bundler URL used",
  },
];

export const supportedEntryPointsReturn = [
  {
    key: "entrypoint addresses",
    type: "Promise<string[]>",
    description: "Support EntryPoints by the Bundler",
  },
];

export const estimateUserOperationGasParam = [
  {
    key: "userOperation",
    type: "UserOperationV6 | UserOperationV7 | UserOperationV8 | UserOperationV9",
    description:
      "Supports UserOperations on EntryPoint v0.6, v0.7, v0.8, and v0.9",
  },
  {
    key: "entrypoint address",
    type: "string",
    description: "Target EntryPoint",
  },
  {
    key: "state_override_set?",
    type: "StateOverrideSet",
    description: "Optional state overrides to apply during gas estimation",
  },
];

export const estimateUserOperationGasReturn = [
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
];

export const sendUserOperationParam = [
  {
    key: "userOperation",
    type: "UserOperationV6 | UserOperationV7 | UserOperationV8 | UserOperationV9",
    description:
      "Supports UserOperations on EntryPoint v0.6, v0.7, v0.8, and v0.9",
  },
  {
    key: "entrypoint address",
    type: "string",
    description: "Target EntryPoint",
  },
];

export const sendUserOperationReturn = [
  {
    key: "userOpHash",
    type: "string",
    description: "UserOperation Hash",
  },
];

export const getUserOperationByHashParam = [
  {
    key: "userOpHash",
    type: "string",
    description: "UserOperation Hash",
  },
];

export const getUserOperationByHashReturn = [
  {
    key: "userOperation",
    type: "UserOperationV6 | UserOperationV7 | UserOperationV8 | UserOperationV9",
    description:
      "The user operation object, which can be version 6, 7, 8, or 9, depending on the entry point version used.",
  },
  {
    key: "entryPoint",
    type: "string",
    description:
      "The address of the entry point contract associated with the user operation.",
  },
  {
    key: "blockNumber",
    type: "bigint | null",
    description:
      "The block number in which the user operation was included, or null if it hasn't been included yet.",
  },
  {
    key: "blockHash",
    type: "string | null",
    description:
      "The hash of the block containing the user operation, or null if it hasn't been included yet.",
  },
  {
    key: "transactionHash",
    type: "string | null",
    description:
      "The transaction hash associated with the user operation, or null if it hasn't been included yet.",
  },
];

export const getUserOperationReceiptParam = [
  {
    key: "userOpHash",
    type: "string",
    description: "UserOperation Hash",
  },
];

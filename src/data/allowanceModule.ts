const createOneTimeAllowanceParams = [
  {
    key: "delegate",
    type: "string",
    description: "The address of the delegate to whom the allowance is given.",
  },
  {
    key: "token",
    type: "string",
    description: "The address of the token for which the allowance is set.",
  },
  {
    key: "allowanceAmount",
    type: "bigint",
    description: "The amount of the token allowed for the delegate.",
  },
];

const createRecurringAllowanceParams = [
  {
    key: "delegate",
    type: "string",
    description:
      "The address of the delegate to whom the recurring allowance is given.",
  },
  {
    key: "token",
    type: "string",
    description: "The address of the token for which the allowance is set.",
  },
  {
    key: "allowanceAmount",
    type: "bigint",
    description: "The amount of the token allowed for the delegate.",
  },
  {
    key: "recurringAllowanceValidityPeriodInMinutes",
    type: "bigint",
    description:
      "The time period (in minutes) after which the allowance resets. Must be between 0 and 65535 (the contract's uint16), otherwise a RangeError is thrown.",
  },
  {
    key: "inThePastPeriodStartBaseTimeStamp",
    type: "bigint?",
    description:
      "Optional unix timestamp in seconds that must be in the past. It only aligns the period boundaries (for example, any previous Saturday 10am to reset every Saturday 10am) and does not delay activation: the allowance is spendable as soon as the Safe executes the transaction. Converted to minutes internally. A millisecond timestamp throws a RangeError. Defaults to 0n, which starts the period accounting when the transaction executes for a new allowance, and keeps the current anchor when updating an existing one.",
  },
];

const createBaseSetAllowanceParams = [
  {
    key: "delegate",
    type: "string",
    description:
      "The address of the delegate whose allowance should be updated.",
  },
  {
    key: "token",
    type: "string",
    description: "The address of the token for which the allowance is set.",
  },
  {
    key: "allowanceAmount",
    type: "bigint",
    description: "The amount of the token allowed for the delegate.",
  },
  {
    key: "resetTimeMin",
    type: "bigint",
    description: "Time in minutes after which the allowance resets.",
  },
  {
    key: "resetBaseMin",
    type: "bigint",
    description: "Time interval to increase the reset time.",
  },
];

const createRenewAllowanceParams = [
  {
    key: "delegate",
    type: "string",
    description: "The address of the delegate whose allowance should be reset.",
  },
  {
    key: "token",
    type: "string",
    description: "The address of the token for which the allowance is set.",
  },
];

const createDeleteAllowanceParams = [
  {
    key: "delegate",
    type: "string",
    description:
      "The address of the delegate whose allowance should be removed.",
  },
  {
    key: "token",
    type: "string",
    description: "The address of the token for which the allowance is set.",
  },
];

const createAllowanceTransferParams = [
  {
    key: "allowanceSourceSafeAddress",
    type: "string",
    description:
      "The safe address from which the allowance is being transferred.",
  },
  {
    key: "token",
    type: "string",
    description: "The token address being transferred.",
  },
  {
    key: "to",
    type: "string",
    description: "The recipient address of the allowance transfer.",
  },
  {
    key: "amount",
    type: "bigint",
    description: "The amount of tokens to be transferred.",
  },
  {
    key: "delegate",
    type: "string",
    description: "The delegate address managing the transfer.",
  },
  {
    key: "overrides",
    type: [
      {
        key: "delegateSignature",
        type: "string",
        description: "The signature of the delegate. Optional.",
      },
      {
        key: "paymentToken",
        type: "string",
        description:
          "An optional payment token address. Defaults to the zero address.",
      },
      {
        key: "paymentAmount",
        type: "bigint",
        description:
          "The amount to pay for execution. Required if paymentToken is specified. Without paymentToken it is paid in the native token. The module sends the payment to tx.origin, which is the bundler's EOA when the transfer is executed through a UserOperation.",
      },
    ],
    description:
      "Optional overrides including delegate signature, payment token, and payment amount.",
  },
];

const createBaseExecuteAllowanceTransferParams = [
  {
    key: "safeAddress",
    type: "string",
    description: "The Safe address whose funds should be used.",
  },
  {
    key: "token",
    type: "string",
    description: "The token contract address being transferred.",
  },
  {
    key: "to",
    type: "string",
    description: "The recipient address of the token transfer.",
  },
  {
    key: "amount",
    type: "bigint",
    description: "The amount of tokens to be transferred.",
  },
  {
    key: "paymentToken",
    type: "string",
    description:
      "The token that should be used to pay for the execution of the transfer.",
  },
  {
    key: "payment",
    type: "bigint",
    description: "The amount to be paid for executing the transfer.",
  },
  {
    key: "delegate",
    type: "string",
    description: "The delegate whose allowance should be updated.",
  },
  {
    key: "delegateSignature",
    type: "string",
    description:
      "Signature generated by the delegate to authorize the transfer.",
  },
];

const createAddDelegateParams = [
  {
    key: "delegate",
    type: "string",
    description: "The delegate address that should be added.",
  },
];

const createRemoveDelegateParams = [
  {
    key: "delegate",
    type: "string",
    description: "The delegate address that should be removed.",
  },
  {
    key: "removeAllowances",
    type: "boolean",
    description:
      "Indicator if allowances should also be removed. Set to true unless this causes an out of gas.",
  },
];

const getTokensParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The JSON-RPC API URL for the target chain.",
  },
  {
    key: "safeAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "delegate",
    type: "string",
    description: "The address of the target delegate.",
  },
];

const getTokensReturn = [{
  type: "string[]",
  description:
    "A promise that resolves to a list of delegated token addresses.",
}];

const getTokensAllowanceParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The JSON-RPC API URL for the target chain.",
  },
  {
    key: "safeAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "delegate",
    type: "string",
    description: "The address of the target delegate.",
  },
  {
    key: "token",
    type: "string",
    description:
      "The address of the token for which the allowance is being queried.",
  },
];

const getTokensAllowanceReturn = [
  {
    key: "Allowance",
    type: [
      {
        key: "amount",
        type: "bigint",
        description: "The total allowance amount.",
      },
      {
        key: "spent",
        type: "bigint",
        description: "The amount spent from the allowance.",
      },
      {
        key: "resetTimeMin",
        type: "bigint",
        description: "The time in minutes after which the allowance resets.",
      },
      {
        key: "lastResetMin",
        type: "bigint",
        description: "The time in minutes when the allowance was last reset.",
      },
      {
        key: "nonce",
        type: "bigint",
        description: "The nonce for the allowance.",
      },
    ],
    description:
      "A promise that resolves to the allowance details for the specified token.",
  },
];

const getDelegatesParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The JSON-RPC API URL for the target chain.",
  },
  {
    key: "safeAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "overrides",
    type: [
      {
        key: "start",
        type: "bigint",
        description:
          "The starting point for fetching delegates. Defaults to 0.",
      },
      {
        key: "maxNumberOfResults",
        type: "bigint",
        description:
          "The maximum number of results to return, between 0 and 255 (the module's page size is a uint8). If specified, disables automatic pagination. Omit it to fetch all delegates.",
      },
    ],
    description: "Optional parameters for pagination.",
  },
];

const getDelegatesReturn = [
  {
    key: "Delegate Addresses",
    type: "string[]",
    description: "A promise that resolves to a list of delegate addresses.",
  },
];

const baseGetDelegatesParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The JSON-RPC API URL for the target chain.",
  },
  {
    key: "safeAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "start",
    type: "bigint",
    description: "The starting point for fetching delegates.",
  },
  {
    key: "pageSize",
    type: "bigint",
    description: "The number of delegates to return in one call.",
  },
];

const baseGetDelegatesReturn = [{
  key: "{ results: string[], next: bigint }",
  description:
    "A promise that resolves to an object containing the list of delegate addresses and the next starting point for pagination.",
  type: [
    {
      key: "results",
      type: "string[]",
      description: "A list of delegate addresses.",
    },
    {
      key: "next",
      type: "bigint",
      description:
        "The next starting point for pagination. Returns 0 if there are no more delegates.",
    },
  ],
}];

export {
  createOneTimeAllowanceParams,
  createRecurringAllowanceParams,
  createAddDelegateParams,
  createAllowanceTransferParams,
  createBaseExecuteAllowanceTransferParams,
  createBaseSetAllowanceParams,
  createDeleteAllowanceParams,
  createRemoveDelegateParams,
  createRenewAllowanceParams,
  getTokensParams,
  getTokensReturn,
  getTokensAllowanceParams,
  getTokensAllowanceReturn,
  getDelegatesParams,
  getDelegatesReturn,
  baseGetDelegatesParams,
  baseGetDelegatesReturn,
};

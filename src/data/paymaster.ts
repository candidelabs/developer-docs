import { stateOverrideSetType } from "./userOperation";

export const sponsorMetaData = [
  {
    key: "name",
    type: "string",
    description: "Name of Sponsor who is sponsoring the Gas Policy",
  },
  {
    key: "description",
    type: "string",
    description: "A short description of the sponsor",
  },
  {
    key: "url",
    type: "string",
    description: "Website of the Sponsor",
  },
  {
    key: "icons",
    type: "string[]",
    description:
      "Logos or Icons that the Sponsor is using to promote their Gas Policy",
  },
];

export const sponsorMetaDataType = [
  {
    key: "sponsorMetadata",
    description: "Information about the Gas Policy Sponsor",
    type: sponsorMetaData,
  },
];

export const sponsorData7677 = [
  {
    key: "name",
    type: "string",
    description: "Name of Sponsor who is sponsoring the Gas Policy",
  },
  {
    key: "description",
    type: "string",
    description: "A short description of the sponsor",
  },
  {
    key: "url",
    type: "string",
    description: "Website of the Sponsor",
  },
  {
    key: "icon",
    type: "string",
    description:
      "Logo of the Sponsor to promote their Gas Policy",
  },
];

export const sponsorDataType7677 = [
  {
    key: "sponsor",
    description: "Information about the Gas Policy Sponsor",
    type: sponsorData7677,
  },
];


// Paymaster V2
export const pm_supportedEntryPointReturnParam = [
  {
    key: "entrypoint",
    type: "string",
    description: "EntryPoint Address that the paymaster is supporting",
  },
];

export const pm_sponsorUserOperationReturnParamsV06V02 = [
  {
    key: "paymasterAndData",
    type: "string",
    description:
      "Paymaster address and data required to pass paymaster contract validation",
  },
  {
    key: "preVerificationGas",
    type: "string",
    description:
      "The amount of gas to pay for to compensate the bundler for pre-verification execution and calldata",
  },
  {
    key: "maxFeePerGas",
    type: "string",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "string",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  ...sponsorMetaDataType,
];

export const pm_getPaymasterStubDataReturnParamsV06 = [
  {
    key: "paymasterAndData",
    type: "string",
    description:
      "Paymaster address and data required to pass paymaster contract validation",
  },
  {
    key: "preVerificationGas",
    type: "string",
    description:
      "The amount of gas to pay for to compensate the bundler for pre-verification execution and calldata",
  },
  {
    key: "maxFeePerGas",
    type: "string",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "string",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  {
    key: "isFinal",
    type: "boolean",
    description:
      "Indicates that the caller does not need to call pm_getPaymasterData",
  },
  ...sponsorDataType7677,
];

export const pm_getPaymasterDataReturnParamsV06 = [
  {
    key: "paymasterAndData",
    type: "string",
    description:
      "Paymaster address and data required to pass paymaster contract validation",
  },
  {
    key: "preVerificationGas",
    type: "string",
    description:
      "The amount of gas to pay for to compensate the bundler for pre-verification execution and calldata",
  },
  {
    key: "maxFeePerGas",
    type: "string",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "string",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  ...sponsorDataType7677,
];

export const tokensParametersV2 = [
  {
    key: "symbol",
    type: "string",
    description: "Token Symbol",
  },
  {
    key: "address",
    type: "string",
    description: "Token contract address",
  },
  {
    key: "decimal",
    type: "number",
    description: "Decimals of token",
  },
  {
    key: "exchangeRate",
    type: "string",
    description: "Exchange rate of token",
  },
  {
    key: "fee",
    type: "bigint",
    description: "Gas fee in unit of of the token",
  },
];

// Paymaster V3

// Common

export const candidePaymasterContext = [
  {
    key: "token",
    type: "string?",
    description:
      "ERC20 token address, if paying gas in erc-20 tokens (optional)",
  },
  {
    key: "sponsorshipPolicyId",
    type: "string?",
    description:
      "Sponsorship Policy ID if using a private gas policy (optional)",
  },
];

export const tokensParametersV3 = [
  {
    key: "name",
    type: "string",
    description: "Name of the ERC-20 Token",
  },
  {
    key: "symbol",
    type: "string",
    description: "Token Symbol",
  },
  {
    key: "address",
    type: "string",
    description: "Token contract address",
  },
  {
    key: "decimal",
    type: "number",
    description: "Decimals of token",
  },
  {
    key: "exchangeRate",
    type: "string",
    description: "Exchange rate of token",
  },
];

export const pm_supportedEntryPointsReturnParams = [
  {
    key: "entrypoints",
    type: "string[]",
    description: "The EntryPoint Addresses that the paymaster is supporting",
  },
];

// Entrypoint Version 0.6

export const paymasterMetadataReturnParametersV06 = [
  {
    key: "name",
    type: "string",
    description: "Paymaster Name",
  },
  {
    key: "description",
    type: "string",
    description: "A short description for the paymaster service",
  },
  {
    key: "icons",
    type: "string[]",
    description: "icons associated with the paymaster service",
  },
  {
    key: "address",
    type: "string",
    description: "Paymaster Contract Address",
  },
  {
    key: "sponsoredEventTopic",
    type: "string",
    description: "Emmited topic event if a paymaster is being used",
  },
  {
    key: "dummyPaymasterAndData",
    type: "string",
    description:
      "Dummy value to use for estimating userop gas before sponsorship",
  },
];

export const pm_sponsorUserOperationReturnParamsV06 = [
  {
    key: "paymasterAndData",
    type: "string",
    description:
      "Paymaster address and data required to pass paymaster contract validation",
  },
  {
    key: "callGasLimit",
    type: "string?",
    description:
      "The amount of gas to allocate the main execution call. Optional return.",
  },
  {
    key: "verificationGasLimit",
    type: "string?",
    description:
      "The amount of gas to allocate for the verification step. Optional return.",
  },
  {
    key: "preVerificationGas",
    type: "string?",
    description:
      "The amount of gas to pay for to compensate the bundler for pre-verification execution and calldata. Optional return.",
  },
  {
    key: "maxFeePerGas",
    type: "string?",
    description:
      "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas). Optional Return.",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "string?",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas). Optional Return",
  },
];

// Entrypoint Version 0.7

export const paymasterMetadataReturnParametersV07 = [
  {
    key: "name",
    type: "string",
    description: "Paymaster Name",
  },
  {
    key: "description",
    type: "string",
    description: "A short description for the paymaster service",
  },
  {
    key: "icons",
    type: "string[]",
    description: "Icons associated with the paymaster service",
  },
  {
    key: "address",
    type: "string",
    description: "Paymaster Contract Address",
  },
  {
    key: "sponsoredEventTopic",
    type: "string",
    description: "Emitted topic event if a paymaster is being used",
  },
  {
    key: "dummyPaymasterAndData",
    type: [
      {
        key: "paymaster",
        type: "string",
        description: "Address of paymaster contract",
      },
      {
        key: "paymasterData",
        type: "string",
        description: "Data for paymaster",
      },
      {
        key: "paymasterVerificationGasLimit",
        type: "string",
        description:
          "The amount of gas to allocate for the paymaster validation code",
      },
      {
        key: "paymasterPostOpGasLimit",
        type: "string",
        description:
          "The amount of gas to allocate for the paymaster post-operation code",
      },
    ],
    description:
      "Dummy values to use for estimating user operation gas before sponsorship",
  },
  ...sponsorMetaDataType,
];

export const getPaymasterMetaDataParam = [
  {
    key: "entrypoint",
    type: "string",
    description: "Target EntryPoint Contract Address",
  },
];

export const getPaymasterMetaDataReturn = [
  {
    key: "paymastermetadata",
    type: "Promise<PaymasterMetadataV7 | PaymasterMetadataV6 | null>",
    description:
      "Returns a promise with the paymaster metadata associated with the target entrypoint",
  },
];

export const pm_sponsorUserOperationReturnParamsV07 = [
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
    key: "callGasLimit",
    type: "string",
    description: "The amount of gas to allocate the main execution call",
  },
  {
    key: "verificationGasLimit",
    type: "string",
    description: "The amount of gas to allocate for the verification step",
  },
  {
    key: "preVerificationGas",
    type: "string",
    description: "Extra gas to pay the bunder",
  },
  {
    key: "maxFeePerGas",
    type: "string",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "string",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  ...sponsorMetaDataType,
];

export const pm_getPaymasterStubDataReturnV07 = [
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
    key: "callGasLimit",
    type: "string",
    description: "The amount of gas to allocate the main execution call",
  },
  {
    key: "verificationGasLimit",
    type: "string",
    description: "The amount of gas to allocate for the verification step",
  },
  {
    key: "preVerificationGas",
    type: "string",
    description: "Extra gas to pay the bunder",
  },
  {
    key: "maxFeePerGas",
    type: "string",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "string",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
  ...sponsorDataType7677,
];

export const pm_getPaymasterDataReturnV07 = [
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
    key: "callGasLimit",
    type: "string",
    description: "The amount of gas to allocate the main execution call",
  },
  {
    key: "verificationGasLimit",
    type: "string",
    description: "The amount of gas to allocate for the verification step",
  },
  {
    key: "preVerificationGas",
    type: "string",
    description: "Extra gas to pay the bunder",
  },
  {
    key: "maxFeePerGas",
    type: "string",
    description: "Maximum fee per gas (similar to EIP-1559 max_fee_per_gas)",
  },
  {
    key: "maxPriorityFeePerGas",
    type: "string",
    description:
      "Maximum priority fee per gas (similar to EIP-1559 max_priority_fee_per_gas)",
  },
];

// SDK

export const createSponsorPaymasterUserOperationParam = [
  {
    key: "userOperation",
    type: "UserOperationV6 | UserOperationV7",
    description: "UserOperation to Sponsor. Supports EntryPoint v0.6 and v0.7",
  },
  {
    key: "bundlerUrl",
    type: "string",
    description: "Bundler URL to estimate the gas",
  },
  {
    key: "sponsorshipPolicyId",
    type: "string?",
    description: "Optional sponsorship policy id if using a Private Gas Policy",
  },
];

export const createSponsorPaymasterUserOperationReturn = [
  {
    key: "userOperation",
    type: "UserOperationV6 | UserOperationV7",
    description: "UserOperation with paymaster data included",
  },
  ...sponsorMetaDataType,
];

export const createPaymasterUserOperationOverridesType = [
  {
    key: "callGasLimit",
    type: "bigint",
    description:
      "Set the callGasLimit instead of estimating gas using the bundler.",
  },
  {
    key: "verificationGasLimit",
    type: "bigint",
    description:
      "Set the verificationGasLimit instead of estimating gas using the bundler.",
  },
  {
    key: "preVerificationGas",
    type: "bigint",
    description:
      "Set the preVerificationGas instead of estimating gas using the bundler.",
  },
  {
    key: "callGasLimitPercentageMultiplier",
    type: "number",
    description:
      "Set the callGasLimitPercentageMultiplier instead of estimating gas using the bundler.",
  },
  {
    key: "verificationGasLimitPercentageMultiplier",
    type: "number",
    description:
      "Set the verificationGasLimitPercentageMultiplier instead of estimating gas using the bundler.",
  },
  {
    key: "preVerificationGasPercentageMultiplier",
    type: "number",
    description:
      "Set the preVerificationGasPercentageMultiplier instead of estimating gas using the bundler.",
  },
  {
    key: "stateOverrideSetType",
    type: stateOverrideSetType,
    description:
      "Pass state overrides for gas estimation, including balance, nonce, code, and state or stateDiff for the account at each address.",
  },
];

export const createTokenPaymasterUserOperationParam = [
  {
    key: "smartAccount",
    type: "(callData: string, tokenAddress: string, paymasterAddress: string, approveAmount: bigint) => string",
    description:
      "The SmartAccount object that created the target userOperation",
  },
  {
    key: "userOperation",
    type: "UserOperationV6 | UserOperationV7",
    description: "The userOperation to sponsor gas with erc-20 paymaster",
  },
  {
    key: "tokenAddress",
    type: "string",
    description: "The address of the token to approve.",
  },
  {
    key: "bundlerRpc",
    type: "string",
    description: "The Bundler RPC to estimate the gas",
  },
  {
    key: "overrides",
    type: createPaymasterUserOperationOverridesType,
    description: "Overrides for the default values",
  },
];

export const createTokenPaymasterUserOperationReturn = [
  {
    key: "userOperation",
    type: "Promise<UserOperationV6 | UserOperationV7>",
    description: "The userOperation to sponsor gas with erc-20 paymaster",
  },
];

export const getSupportedERC20TokensAndPaymasterMetadataParam = [
  {
    key: "entrypoint",
    type: "string",
    description: "Target EntryPoint Contract Address",
  },
];

export const getSupportedERC20TokensAndPaymasterMetadataReturn = [
  {
    key: "supportedERC20TokensAndMetadata",
    type: "Promise<SupportedERC20TokensAndMetadataV7 | SupportedERC20TokensAndMetadataV6 | null>",
    description:
      "Returns the supported ERC-20 Tokens alongside the metadata related to the tokens and the paymaster.",
  },
];

export const basePaymasterMetadataType = [
  {
    key: "name",
    type: "string",
    description: "The name of the Paymaster.",
  },
  {
    key: "description",
    type: "string",
    description: "A brief description of the Paymaster.",
  },
  {
    key: "icons",
    type: "string[]",
    description:
      "An array of icon URLs representing the Paymaster's brand or logo.",
  },
  {
    key: "address",
    type: "string",
    description: "The contract address of the Paymaster.",
  },
  {
    key: "sponsoredEventTopic",
    type: "string",
    description:
      "The event topic that will be emitted when a UserOperation is sponsored by the Paymaster.",
  },
];

export const paymasterMetadataV7Type = [
  ...basePaymasterMetadataType,
  {
    key: "dummyPaymasterAndData",
    type: [
      {
        key: "paymaster",
        type: "string",
        description: "The address of the Paymaster.",
      },
      {
        key: "paymasterVerificationGasLimit",
        type: "bigint",
        description:
          "The amount of gas allocated for the Paymaster verification step.",
      },
      {
        key: "paymasterPostOpGasLimit",
        type: "bigint",
        description:
          "The amount of gas allocated for the Paymaster post-operation step.",
      },
      {
        key: "paymasterData",
        type: "string",
        description: "Encoded data for the Paymaster.",
      },
    ],
    description: "Dummy Paymaster data used for gas estimation.",
  },
];

export const paymasterMetadataV6Type = [
  ...basePaymasterMetadataType,
  {
    key: "dummyPaymasterAndData",
    type: "string",
    description: "Dummy Paymaster data used for gas estimation.",
  },
];

export const erc20TokenType = [
  {
    key: "name",
    type: "string",
    description: "The name of the ERC20 token.",
  },
  {
    key: "symbol",
    type: "string",
    description: "The symbol representing the ERC20 token.",
  },
  {
    key: "address",
    type: "string",
    description: "The contract address of the ERC20 token.",
  },
  {
    key: "decimal",
    type: "number",
    description: "The number of decimal places for the token.",
  },
];

export const erc20TokenWithExchangeRate = [
  ...erc20TokenType,
  {
    key: "exchangeRate",
    type: "bigint",
    description: "The exchange rate of the token.",
  },
];

export const supportedERC20TokensAndMetadataV7Type = [
  {
    key: "paymasterMetadata",
    type: paymasterMetadataV7Type,
    description: "The Paymaster metadata",
  },

  {
    key: "tokens",
    type: erc20TokenType,
    description: "Supported erc20 tokens",
  },
];

export const supportedERC20TokensAndMetadataV6Type = [
  {
    key: "paymasterMetadata",
    type: paymasterMetadataV6Type,
    description: "The Paymaster metadata",
  },

  {
    key: "tokens",
    type: erc20TokenType,
    description: "Supported erc20 tokens",
  },
];

export const calculateUserOperationErc20TokenMaxGasCostParam = [
  {
    key: "userOperation",
    type: "UserOperationV6 | UserOperationV7",
    description: "UserOperation to Sponsor. Supports EntryPoint v0.6 and v0.7",
  },
  {
    key: "erc20TokenAddress",
    type: "string",
    description: "ERC-20 Token Address",
  },
];

export const calculateUserOperationErc20TokenMaxGasCostReturn = [
  {
    key: "cost",
    type: "Promise<bigint>",
    description:
      "Returns maximum amount that the operation will cost in the erc-20 token",
  },
];

export const createPaymasterUserOperationParam = [
  {
    key: "userOperationInput",
    type: "UserOperationV6 | UserOperationV7",
    description: "UserOperation to Sponsor. Supports EntryPoint v0.6 and v0.7",
  },
  {
    key: "bundlerRpc",
    type: "string",
    description: "Bundler URL to estimate the gas",
  },
  {
    key: "context?",
    type: candidePaymasterContext,
    description: "Paymaster context data",
  },
  {
    key: "CreatePaymasterUserOperationOverrides",
    type: createPaymasterUserOperationOverridesType,
    description: "Bundler URL to estimate the gas",
  },
];

export const createPaymasterUserOperationReturn = [
  {
    key: "userOperation",
    type: "Promise<UserOperationV7 | UserOperationV6, SponsorMetadata | undefined>",
    description: "UserOperation with paymaster data included",
  },
];

export const getSupportedERC20TokenDataParam = [
  {
    key: "erc20TokenAddress",
    type: "string",
    description: "ERC-20 Token Address",
  },
  {
    key: "entrypoint?",
    type: "string",
    description: "Target EntryPoint Address. Defaults to ENTRYPOINT_V7",
  },
];

export const getSupportedERC20TokenDataReturn = [
  {
    key: "ERC20Token",
    type: "Promise<ERC20Token | null>",
    description: "ERC-20 Token",
  },
];

export const isSupportedERC20TokenParam = [
  {
    key: "erc20TokenAddress",
    type: "string",
    description: "ERC-20 Token Address",
  },
  {
    key: "entrypoint?",
    type: "string",
    description: "Target EntryPoint Address. Defaults to ENTRYPOINT_V7",
  },
];

export const isSupportedERC20TokenReturn = [
  {
    key: "isSupported",
    type: "boolean",
    description: "Returns true if the erc20 token is supported",
  },
];

export const getSupportedEntrypointsReturn = [
  {
    key: "entrypoint addresses",
    type: "Promise<string[]>",
    description: "A promise of a list of entrypoints addresses",
  },
];

export const fetchTokenPaymasterExchangeRateParams = [
  {
    key: "erc20TokenAddress",
    type: "string",
    description: "ERC-20 Token Address",
  },
  {
    key: "entrypoint",
    type: "string?",
    description:
      "EntryPoint Address that the paymaster is supporting. Defaults to ENTRYPOINT_V7",
  },
];

export const fetchTokenPaymasterExchangeRateReturn = [
  {
    key: "exchangeRate",
    type: "bigInt",
    description: "Returns the exchange rate to the native token",
  },
];

export const fetchSupportedERC20TokensAndPaymasterMetadataParam = [
  {
    key: "entrypoint",
    type: "string?",
    description:
      "EntryPoint Address. Defaults to V0.7",
  },
];

export const fetchSupportedERC20TokensAndPaymasterMetadataReturn = [
  {
    key: "SupportedERC20TokensAndMetadataWithExchangeRate",
    type: "Promise<SupportedERC20TokensAndMetadataV7WithExchangeRate | SupportedERC20TokensAndMetadataV6WithExchangeRate>",
    description:
      "A promise with the list of supported erc20 tokens and their exchange rate",
  },
];

export const SupportedERC20TokensAndMetadataV7WithExchangeRateType = [
  {
    key: "paymasterMetadata",
    type: paymasterMetadataV7Type,
    description: "The Paymaster metadata",
  },

  {
    key: "tokens",
    type: erc20TokenWithExchangeRate,
    description: "Supported erc20 tokens with Exchange Rate",
  },
];

export const SupportedERC20TokensAndMetadataV6WithExchangeRateType = [
  {
    key: "paymasterMetadata",
    type: paymasterMetadataV6Type,
    description: "The Paymaster metadata",
  },

  {
    key: "tokens",
    type: erc20TokenWithExchangeRate,
    description: "Supported erc20 tokens with Exchange Rate",
  },
];

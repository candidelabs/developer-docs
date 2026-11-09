const recoveryRequestSchema = [
    {
        key: "id",
        type: "string",
        description: "The ID associated with the Recovery Request",
    },
    {
        key: "emoji",
        type: "string",
        description: "The emojis associated with the recovery request",
    },
    {
        key: "account",
        type: "string",
        description: "The Safe account address that the owner wants to recover. Must be a valid Ethereum address",
    },
    {
        key: "chainId",
        type: "number",
        description: "The chainId of the network where the Safe account resides",
    },
    {
        key: "newOwners",
        type: "string[]",
        description: "The new owners for the Safe account",
    },
    {
        key: "newThreshold",
        type: "number",
        description: "The signing threshold for the new Safe owners after recovery; not the guardian approval threshold",
    },
    {
        key: "nonce",
        type: "string",
        description: "Recovery module nonce serialized as a hexadecimal string in JSON responses. Every module starts each account's nonce at 0",
    },
    {
        key: "moduleAddress",
        type: "string",
        description: "The Social Recovery Module the request was made on. Guardian signatures, execution, and finalization all use this module",
    },
    {
        key: "recoveryHash",
        type: "string",
        description: "The recovery hash guardians sign, computed by the request's module at the request's nonce",
    },
    {
        key: "signatures",
        type: "json",
        description: "The collected guardian signatures as [signer, signature] pairs, sorted by signer address",
    },
    {
        key: "executeData",
        type: [
            {
                key: "sponsored",
                type: "boolean",
                description: "If the recovery execution tx is gas-sponsored or not",
            }, {
                key: "transactionHash",
                type: "string",
                description: "The transaction hash of the recovery execution",
            },
        ],
        description: "Execution transaction details",
    },
    {
        key: "finalizeData",
        type: [
            {
                key: "sponsored",
                type: "boolean",
                description: "If the recovery finalization tx after the grace period ends is gas-sponsored or not",
            }, {
                key: "transactionHash",
                type: "string",
                description: "The transaction hash of the finalization execution",
            },
        ],
        description: "Finalization transaction details",
    },
    {
        key: "status",
        type: "string",
        description: "The status of the recovery request: PENDING | EXECUTION-IN-PROGRESS | EXECUTED | FINALIZATION-IN-PROGRESS | FINALIZED"
    },
    {
        key: "discoverable",
        type: "boolean",
        description: "Whether the recovery request is discoverable",
    },
    {
        key: "createdAt",
        type: "datetime",
        description: "The date the recovery request was created",
    },
    {
        key: "updatedAt",
        type: "datetime",
        description: "The date and time the recovery request was last updated",
    },
];


export const postRecoveriesCreate = [
    {
        key: "account",
        type: "string",
        description: "The Safe account address that the owner wants to recover. Must be a valid Ethereum address",
    },
    {
        key: "newOwners",
        type: "string[]",
        description: "The new owners of the Safe account. Valid Ethereum addresses, at least one, no duplicates. The zero address, the sentinel address 0x...0001, the Safe itself, and the Safe's guardians on the module are rejected",
    },
    {
        key: "newThreshold",
        type: "number",
        description: "The signing threshold for the new Safe owners after recovery; not the guardian approval threshold. Between 1 and the number of new owners",
    },
    {
        key: "chainId",
        type: "number",
        description: "The chainId of the network where the Safe account resides",
    },
    {
        key: "moduleAddress",
        type: "string",
        description: "(Optional) The Social Recovery Module to run the recovery on, one of the modules returned by /v1/config/getNetworkConfig. When omitted, the network's default module is used (the moduleAddress returned by /v1/config/getNetworkConfig)",
    },
    {
        key: "signer",
        type: "string",
        description: "The guardian public address initiating the recovery request",
    },
    {
        key: "signature",
        type: "string",
        description: "The guardian's signature over the module's recovery hash for the account, new owners, new threshold, and the account's current nonce on that module. An empty signature (0x) is accepted on v0.2.0 modules only, for a Safe guardian that approved the hash with EIP-1271",
    },
];

export const postRecoveriesCreateResponse = recoveryRequestSchema;

export const getRecoveriesFetchByAddress = [
    {
        key: "account",
        type: "string",
        description: "The Safe account address that the owner wants to recover. Must be a valid Ethereum address",
    },
    {
        key: "chainId",
        type: "number",
        description: "The chainId of the network where the Safe account resides",
    },
    {
        key: "moduleAddress",
        type: "string",
        description: "(Optional) Return the requests made on this Social Recovery Module only. When omitted, the network's default module is used (the moduleAddress returned by /v1/config/getNetworkConfig)",
    },
    {
        key: "nonce",
        type: "string",
        description: "The account's recovery nonce on that module as a hexadecimal string, such as 0x1",
    },
];

export const getRecoveriesFetchByAddressResponse = [
    {
        key: "RecoveryRequest[]",
        type: recoveryRequestSchema,
        description: "A list of ongoing Recovery Requests for a Safe account address",
    },
];

export const getRecoveriesFetchById = [
    {
        key: "id",
        type: "string",
        description: "Recovery request ID",
    },
];

export const getRecoveriesFetchByIdResponse = recoveryRequestSchema;

export const postRecoveriesSign = [
    {
        key: "id",
        type: "string",
        description: "Recovery request ID",
    },
    {
        key: "signer",
        type: "string",
        description: "The guardian public address",
    },
    {
        key: "signature",
        type: "string",
        description: "The guardian's signature over the request's recoveryHash. An empty signature (0x) is accepted on v0.2.0 modules only",
    },
];

export const postRecoveriesSignResponse = [{
    key: "success",
    type: "boolean",
    description: "True when the guardian signature has been accepted",
}];

export const postRecoveriesExecuteById = [
    {
        key: "id",
        type: "string",
        description: "Recovery request ID",
    },
];

export const postRecoveriesExecuteByIdResponse = [
    {
        key: "success",
        type: "boolean",
        description: "True when the execution request succeeds; use the recovery status to track on-chain progress",
    },
];


export const postRecoveriesFinalizeById = [
    {
        key: "id",
        type: "string",
        description: "Recovery request ID",
    },
];

export const postRecoveriesFinalizeByIdResponse = [
    {
        key: "success",
        type: "boolean",
        description: "True when the finalization request succeeds; use the recovery status to confirm completion",
    },
];

export const getRecoveriesListByAddress = [
    {
        key: "account",
        type: "string",
        description: "The Safe account address. Must be a valid Ethereum address",
    },
    {
        key: "chainId",
        type: "number",
        description: "The chainId of the network where the Safe account resides",
    },
    {
        key: "moduleAddress",
        type: "string",
        description: "(Optional) Return the requests made on this Social Recovery Module only. When omitted, the network's default module is used (the moduleAddress returned by /v1/config/getNetworkConfig)",
    },
    {
        key: "status",
        type: "string",
        description: "(Optional) Filter by status: PENDING, EXECUTED, FINALIZED, EXECUTION-IN-PROGRESS, FINALIZATION-IN-PROGRESS",
    },
    {
        key: "executed",
        type: "boolean",
        description: "(Optional) Filter by executed status. Cross-checked with indexed data",
    },
    {
        key: "finalized",
        type: "boolean",
        description: "(Optional) Filter by finalized status. Cross-checked with indexed data",
    },
    {
        key: "nonce",
        type: "string",
        description: "(Optional) Filter by recovery nonce as a hex string. Use nonce__lt, nonce__gt, nonce__lte, or nonce__gte for range comparisons",
    },
    {
        key: "createdAt",
        type: "string",
        description: "(Optional) Filter by creation time as an ISO 8601 date. Use createdAt__lt, createdAt__gt, createdAt__lte, or createdAt__gte for range comparisons",
    },
    {
        key: "orderBy",
        type: "string",
        description: "(Optional) Field to order by: 'createdAt' or 'nonce'",
    },
    {
        key: "order",
        type: "string",
        description: "(Optional) Order direction: 'asc' or 'desc'. Defaults to 'desc'",
    },
    {
        key: "limit",
        type: "number",
        description: "(Optional) Maximum number of requests to return, between 1 and 50. Defaults to 20",
    },
    {
        key: "offset",
        type: "number",
        description: "(Optional) Number of requests to skip for pagination. Defaults to 0",
    },
];

export const getRecoveriesListByAddressResponse = [
    {
        key: "RecoveryRequest[]",
        type: recoveryRequestSchema,
        description: "A list of Recovery Requests matching the filters, as a plain array",
    },
];

// Config API Data Types

export const getConfigNetworkConfig = [
    {
        key: "chainId",
        type: "number",
        description: "The chainId of a network the service supports",
    },
];

export const getConfigNetworkConfigResponse = [
    {
        key: "name",
        type: "string",
        description: "The network name in the service configuration",
    },
    {
        key: "chainId",
        type: "number",
        description: "The requested chainId",
    },
    {
        key: "moduleAddress",
        type: "string",
        description: "The default Social Recovery Module, used by requests that omit moduleAddress. Absent when the network has no default; such a network requires moduleAddress",
    },
    {
        key: "modules",
        type: [
            {
                key: "address",
                type: "string",
                description: "The module address, accepted as moduleAddress",
            },
            {
                key: "version",
                type: "string",
                description: "The Social Recovery Module version: 0.1.0 or 0.2.0",
            },
            {
                key: "recoveryPeriod",
                type: "number",
                description: "The module's grace period in seconds",
            },
        ],
        description: "Every Social Recovery Module the service serves on this network",
    },
    {
        key: "sponsorships",
        type: [
            {
                key: "execution",
                type: "json",
                description: "{ enabled, rateLimit? }: whether the service sponsors /v1/recoveries/execute, and its per-account limit",
            },
            {
                key: "finalization",
                type: "json",
                description: "{ enabled, rateLimit? }: whether the service sponsors /v1/recoveries/finalize, and its per-account limit",
            },
        ],
        description: "Gas sponsorship settings for this network",
    },
    {
        key: "alertChannels",
        type: "string[]",
        description: "The alert channels configured on this network, such as email and sms. Absent when the network has none",
    },
];

// Auth API Data Types

export const postAuthRegister = [
    {
        key: "account",
        type: "string",
        description: "The smart account address requesting registration",
    },
    {
        key: "chainId",
        type: "number",
        description: "The chain ID where the account resides",
    },
    {
        key: "channel",
        type: "string",
        description: "Authentication channel: 'email' or 'sms'",
    },
    {
        key: "target",
        type: "string",
        description: "The email or phone number for authentication",
    },
    {
        key: "message",
        type: "string",
        description: "SIWE (EIP-4361) message signed by the account",
    },
    {
        key: "signature",
        type: "string",
        description: "Signature proving the request is initiated from the account",
    },
];

export const postAuthRegisterResponse = [
    {
        key: "challengeId",
        type: "string",
        description: "Unique challenge ID for the registration, used in /auth/submit",
    },
];

export const postAuthSubmit = [
    {
        key: "challengeId",
        type: "string",
        description: "The unique challenge ID received from /auth/register",
    },
    {
        key: "challenge",
        type: "string",
        description: "The OTP code received via email/SMS",
    },
];

export const postAuthSubmitResponse = [
    {
        key: "registrationId",
        type: "string",
        description: "Unique registration ID for the authenticated channel",
    },
    {
        key: "guardianAddress",
        type: "string",
        description: "The service-managed guardian address to add to the Social Recovery Module on-chain",
    },
];

export const getAuthRegistrations = [
    {
        key: "account",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "chainId",
        type: "number",
        description: "The chain ID where the account resides",
    },
    {
        key: "message",
        type: "string",
        description: "SIWE message signed by the account",
    },
    {
        key: "signature",
        type: "string",
        description: "Signature proving the request",
    },
];

export const getAuthRegistrationsResponse = [
    {
        key: "registrations",
        type: "array",
        description: "List of active registrations",
    },
];

export const postAuthDelete = [
    {
        key: "registrationId",
        type: "string",
        description: "The registration ID to delete",
    },
    {
        key: "message",
        type: "string",
        description: "SIWE message signed by the account",
    },
    {
        key: "signature",
        type: "string",
        description: "Signature proving the request",
    },
];

export const postAuthDeleteResponse = [
    {
        key: "success",
        type: "boolean",
        description: "True if deletion was successful",
    },
];

export const postAuthSignatureRequest = [
    {
        key: "account",
        type: "string",
        description: "The smart account address to be recovered",
    },
    {
        key: "newOwners",
        type: "string[]",
        description: "The new owners for the Safe account",
    },
    {
        key: "newThreshold",
        type: "number",
        description: "The signing threshold for the new Safe owners after recovery; not the guardian approval threshold",
    },
    {
        key: "chainId",
        type: "number",
        description: "Chain ID for the recovery request",
    },
    {
        key: "moduleAddress",
        type: "string",
        description: "(Optional) The Social Recovery Module the guardian signs for, one of the modules returned by /v1/config/getNetworkConfig. The service's guardian must be a guardian on it. When omitted, the network's default module is used (the moduleAddress returned by /v1/config/getNetworkConfig)",
    },
];

export const postAuthSignatureRequestResponse = [
    {
        key: "requestId",
        type: "string",
        description: "Unique signature request ID",
    },
    {
        key: "requiredVerifications",
        type: "number",
        description: "Minimum number of OTP challenges required",
    },
    {
        key: "auths",
        type: "array",
        description: "List of authentication methods to verify",
    },
];

export const postAuthSignatureSubmit = [
    {
        key: "requestId",
        type: "string",
        description: "The unique ID from /auth/signature/request",
    },
    {
        key: "challengeId",
        type: "string",
        description: "The challenge ID specific to the authentication method",
    },
    {
        key: "challenge",
        type: "string",
        description: "The OTP code received via email/SMS",
    },
];

export const postAuthSignatureSubmitResponse = [
    {
        key: "success",
        type: "boolean",
        description: "True if verification was successful",
    },
    {
        key: "signer",
        type: "string",
        description: "Guardian address (available only if sufficient verifications collected)",
    },
    {
        key: "signature",
        type: "string",
        description: "Recovery signature (available only if sufficient verifications collected)",
    },
];

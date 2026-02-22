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
        description: "The new threshold for the Safe account",
    },
    {
        key: "nonce",
        type: "bigint",
        description: "Recovery module contract nonce",
    },
    {
        key: "signatures",
        type: "json",
        description: "The signatures for the recovery request",
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
        description: "An object field representing the finalization recovery transaction",
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
        description: "An object field representing the finalization recovery transaction",
    },
    {
        key: "status",
        type: "string",
        description: "The status of the recovery request: PENDING | EXECUTED | FINALIZED | FINALIZATION-IN-PROGRESS | FAILED"
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
        description: "The date and time of the recovery request that was created",
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
        description: "The new owners to the Safe account. Must be a valid Ethereum addresses",

    },
    {
        key: "newThreshold",
        type: "number",
        description: "The new threshold to the Safe account",
    },
    {
        key: "chainId",
        type: "number",
        description: "The chainId of the network where the Safe account resides",
    },
    {
        key: "signer",
        type: "string",
        description: "The guardian public address initiating the recovery request",
    },
    {
        key: "signature",
        type: "string",
        description: "A signature from the guardian for a message containing the address of the safe, new owners of the Safe, chainId, module address, and a nonce",
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
        key: "nonce",
        type: "number",
        description: "Recovery module contract nonce",
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
        description: "The signature for the message hash of the guardian confirmation of recovery",
    },
];

export const postRecoveriesSignResponse = [{
    key: "status",
    type: "true",
    description: "true = signature is valid",
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
        type: "true",
        description: "Return true once finilized. Else returns error",
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
        type: "true",
        description: "Return true once finilized. Else returns error",
    },
];

export const postAlertSubscribe = [
    {
        key: "account",
        type: "string",
        description: "The Safe account address that should be monitored. Must be a valid Ethereum address",
    },
    {
        key: "email",
        type: "string",
        description: "The email target to receive those alerts. Must be a valid email address.",
    },
    {
        key: "signature",
        type: "string",
        description: "A signature from the account containing the email and a nonce",
    },
];

export const postAlertSubscribeResponse = [
    {
        key: "success",
        type: "true",
        description: "Return true once finilized. Else returns error",
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
        key: "orderBy",
        type: "string",
        description: "(Optional) Field to order by (e.g., 'createdAt', 'nonce')",
    },
    {
        key: "order",
        type: "string",
        description: "(Optional) Order direction: 'asc' or 'desc'. Defaults to 'desc'",
    },
];

export const getRecoveriesListByAddressResponse = [
    {
        key: "recoveries",
        type: recoveryRequestSchema,
        description: "A list of Recovery Requests matching the filters",
    },
    {
        key: "total",
        type: "number",
        description: "Total number of recovery requests matching the filters",
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
        description: "The guardian address added to the Safe account",
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
        description: "The new threshold for the Safe account",
    },
    {
        key: "chainId",
        type: "number",
        description: "Chain ID for the recovery request",
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

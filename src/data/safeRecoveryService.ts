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
        type: "json",
        description: "The hash of the executed transaction",
    },
    {
        key: "finalizeData",
        type: "json",
        description: "The hash of the finalized transaction",
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

const postRecoveriesSignResponseType = [{
    key: "value",
    type: "true",
    description: "true = signature is valid",
}]

export const postRecoveriesSignResponse = [{
    key: "status",
    type: postRecoveriesSignResponseType,
    description: "Returns an object with true value if the signature is valid. Else returns standard error",
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

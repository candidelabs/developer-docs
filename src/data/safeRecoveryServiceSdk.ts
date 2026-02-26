// ─── RecoveryByGuardian ───

export const recoveryByGuardianConstructorParams = [
    {
        key: "serviceEndpoint",
        type: "string",
        description: "The URL of the Safe Recovery Service endpoint",
    },
    {
        key: "chainId",
        type: "bigint",
        description: "The chain ID of the network (e.g. 1n for Ethereum mainnet)",
    },
    {
        key: "recoveryModuleAddress",
        type: "SocialRecoveryModuleGracePeriodSelector",
        description: "The address of the Social Recovery Module with the desired grace period. Options: After3Minutes, After3Days, After7Days, After14Days",
    },
];

export const createRecoveryRequestParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address to recover",
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
        key: "guardianAddress",
        type: "string",
        description: "The guardian address initiating the recovery request",
    },
    {
        key: "guardianSignature",
        type: "string",
        description: "The EIP-712 signature from the guardian authorizing the recovery",
    },
];

export const submitGuardianSignatureParams = [
    {
        key: "id",
        type: "string",
        description: "The recovery request ID",
    },
    {
        key: "guardianAddress",
        type: "string",
        description: "The guardian address submitting the signature",
    },
    {
        key: "guardianSignature",
        type: "string",
        description: "The EIP-712 signature from the guardian",
    },
];

export const executeRecoveryRequestParams = [
    {
        key: "id",
        type: "string",
        description: "The recovery request ID to execute",
    },
];

export const finalizeRecoveryRequestParams = [
    {
        key: "id",
        type: "string",
        description: "The recovery request ID to finalize",
    },
];

export const getRecoveryRequestsParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "recoveryNonce",
        type: "bigint",
        description: "The recovery module nonce to query",
    },
];

export const getRecoveryRequestsForLatestNonceParams = [
    {
        key: "rpcNode",
        type: "string",
        description: "The RPC node URL to query the on-chain nonce",
    },
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "status",
        type: '"PENDING" | "EXECUTED" | "FINALIZED"',
        description: "Filter recovery requests by status",
    },
];

export const getPendingRecoveryRequestsForLatestNonceParams = [
    {
        key: "rpcNode",
        type: "string",
        description: "The RPC node URL to query the on-chain nonce",
    },
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
];

export const recoveryByGuardianRequestType = [
    {
        key: "id",
        type: "string",
        description: "Unique recovery request ID",
    },
    {
        key: "emoji",
        type: "string",
        description: "Emoji identifier associated with the recovery request",
    },
    {
        key: "account",
        type: "string",
        description: "The Safe account address being recovered",
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
        description: "The chain ID of the network",
    },
    {
        key: "nonce",
        type: "bigint",
        description: "Recovery module contract nonce",
    },
    {
        key: "signatures",
        type: "string[]",
        description: "Guardian signatures collected for this recovery request",
    },
    {
        key: "executeData",
        type: [
            {
                key: "sponsored",
                type: "boolean",
                description: "Whether the execution transaction is gas-sponsored",
            },
            {
                key: "transactionHash",
                type: "string | undefined",
                description: "The transaction hash of the execution (if available)",
            },
        ],
        description: "Data about the recovery execution transaction",
    },
    {
        key: "finalizeData",
        type: [
            {
                key: "sponsored",
                type: "boolean",
                description: "Whether the finalization transaction is gas-sponsored",
            },
            {
                key: "transactionHash",
                type: "string | undefined",
                description: "The transaction hash of the finalization (if available)",
            },
        ],
        description: "Data about the recovery finalization transaction",
    },
    {
        key: "status",
        type: '"PENDING" | "EXECUTED" | "FINALIZED"',
        description: "Current status of the recovery request",
    },
    {
        key: "discoverable",
        type: "boolean",
        description: "Whether the recovery request is publicly discoverable",
    },
    {
        key: "createdAt",
        type: "string",
        description: "ISO 8601 timestamp of when the request was created",
    },
    {
        key: "updatedAt",
        type: "string",
        description: "ISO 8601 timestamp of the last update",
    },
];

// ─── RecoveryByCustodialGuardian ───

export const custodialGuardianConstructorParams = [
    {
        key: "serviceEndpoint",
        type: "string",
        description: "The URL of the Safe Recovery Service endpoint",
    },
    {
        key: "chainId",
        type: "bigint",
        description: "The chain ID of the network (e.g. 1n for Ethereum mainnet)",
    },
    {
        key: "overrides",
        type: "object | undefined",
        description: "Optional overrides for SIWE message generation. Contains siweDomain (string) and siweUri (string)",
    },
];

export const getRegistrationsSiweParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
];

export const getRegistrationsParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "eip1271SiweContractSignature",
        type: "string",
        description: "The EIP-1271 contract signature for the SIWE message",
    },
];

export const createRegistrationToEmailRecoverySiweParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "email",
        type: "string",
        description: "The email address to register for recovery",
    },
];

export const createRegistrationToEmailRecoveryParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "email",
        type: "string",
        description: "The email address to register for recovery",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "eip1271SiweContractSignature",
        type: "string",
        description: "The EIP-1271 contract signature for the SIWE message",
    },
];

export const createRegistrationToSmsRecoverySiweParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "phoneNumber",
        type: "string",
        description: "The phone number to register for recovery",
    },
];

export const createRegistrationToSmsRecoveryParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "phoneNumber",
        type: "string",
        description: "The phone number to register for recovery",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "eip1271SiweContractSignature",
        type: "string",
        description: "The EIP-1271 contract signature for the SIWE message",
    },
];

export const createRegistrationToRecoverySiweParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "channel",
        type: '"sms" | "email"',
        description: "The recovery channel type",
    },
    {
        key: "channelTarget",
        type: "string",
        description: "The email address or phone number",
    },
];

export const createRegistrationToRecoveryParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "channel",
        type: '"sms" | "email"',
        description: "The recovery channel type",
    },
    {
        key: "channelTarget",
        type: "string",
        description: "The email address or phone number",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "eip1271SiweContractSignature",
        type: "string",
        description: "The EIP-1271 contract signature for the SIWE message",
    },
];

export const submitRegistrationChallengeParams = [
    {
        key: "challengeId",
        type: "string",
        description: "The challenge ID received from the registration step",
    },
    {
        key: "otpChallenge",
        type: "string",
        description: "The OTP code received via email or SMS",
    },
];

export const submitRegistrationChallengeReturn = [
    {
        key: "registrationId",
        type: "string",
        description: "The unique registration ID for the verified channel",
    },
    {
        key: "guardianAddress",
        type: "string",
        description: "The custodial guardian address assigned to this registration",
    },
];

export const deleteRegistrationSiweParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "registrationId",
        type: "string",
        description: "The registration ID to delete",
    },
];

export const deleteRegistrationParams = [
    {
        key: "registrationId",
        type: "string",
        description: "The registration ID to delete",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "eip1271SiweContractSignature",
        type: "string",
        description: "The EIP-1271 contract signature for the SIWE message",
    },
];

export const requestCustodialGuardianSignatureChallengeParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address to recover",
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
];

export const submitCustodialGuardianSignatureChallengeParams = [
    {
        key: "requestId",
        type: "string",
        description: "The signature request ID from requestCustodialGuardianSignatureChallenge",
    },
    {
        key: "challengeId",
        type: "string",
        description: "The challenge ID for the specific authentication method",
    },
    {
        key: "otpChallenge",
        type: "string",
        description: "The OTP code received via email or SMS",
    },
];

export const submitCustodialGuardianSignatureChallengeReturn = [
    {
        key: "success",
        type: "boolean",
        description: "Whether the OTP verification was successful",
    },
    {
        key: "custodianGuardianAddress",
        type: "string | undefined",
        description: "The custodial guardian address (returned when all required verifications are collected)",
    },
    {
        key: "custodianGuardianSignature",
        type: "string | undefined",
        description: "The recovery signature from the custodial guardian (returned when all required verifications are collected)",
    },
];

export const createAndExecuteRecoveryRequestParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address to recover",
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
        key: "custodianGuardianAddress",
        type: "string",
        description: "The custodial guardian address obtained from signature challenge",
    },
    {
        key: "custodianGuardianSignature",
        type: "string",
        description: "The recovery signature from the custodial guardian",
    },
];

export const registrationType = [
    {
        key: "id",
        type: "string",
        description: "Unique registration ID",
    },
    {
        key: "channel",
        type: "string",
        description: 'The recovery channel: "email" or "sms"',
    },
    {
        key: "target",
        type: "string",
        description: "The email address or phone number registered",
    },
];

export const signatureRequestType = [
    {
        key: "requestId",
        type: "string",
        description: "Unique signature request ID",
    },
    {
        key: "requiredVerifications",
        type: "number",
        description: "Minimum number of OTP challenges required to obtain the guardian signature",
    },
    {
        key: "auths",
        type: [
            {
                key: "challengeId",
                type: "string",
                description: "The challenge ID for this authentication method",
            },
            {
                key: "channel",
                type: "string",
                description: 'The channel type: "email" or "sms"',
            },
            {
                key: "target",
                type: "string",
                description: "The email address or phone number to verify",
            },
        ],
        description: "List of authentication methods that can be used for verification",
    },
];

// ─── Alerts ───

export const alertsConstructorParams = [
    {
        key: "serviceEndpoint",
        type: "string",
        description: "The URL of the Safe Recovery Service endpoint",
    },
    {
        key: "chainId",
        type: "bigint",
        description: "The chain ID of the network (e.g. 1n for Ethereum mainnet)",
    },
    {
        key: "overrides",
        type: "object | undefined",
        description: "Optional overrides for SIWE message generation. Contains siweDomain (string) and siweUri (string)",
    },
];

export const getSubscriptionsSiweParams = [
    {
        key: "ownerAddress",
        type: "string",
        description: "The owner address of the Safe account",
    },
];

export const getActiveSubscriptionsParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address to query subscriptions for",
    },
    {
        key: "ownerAddress",
        type: "string",
        description: "The owner address of the Safe account",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "siweOwnerSignature",
        type: "string",
        description: "The owner's signature for the SIWE message",
    },
];

export const createEmailSubscriptionSiweParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "ownerAddress",
        type: "string",
        description: "The owner address of the Safe account",
    },
    {
        key: "email",
        type: "string",
        description: "The email address for alert notifications",
    },
];

export const createEmailSubscriptionParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "ownerAddress",
        type: "string",
        description: "The owner address of the Safe account",
    },
    {
        key: "email",
        type: "string",
        description: "The email address for alert notifications",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "siweOwnerSignature",
        type: "string",
        description: "The owner's signature for the SIWE message",
    },
];

export const createSubscriptionSiweParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "ownerAddress",
        type: "string",
        description: "The owner address of the Safe account",
    },
    {
        key: "channel",
        type: '"sms" | "email"',
        description: "The notification channel type",
    },
    {
        key: "channelTarget",
        type: "string",
        description: "The email address or phone number",
    },
];

export const createSubscriptionParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The Safe account address",
    },
    {
        key: "ownerAddress",
        type: "string",
        description: "The owner address of the Safe account",
    },
    {
        key: "channel",
        type: '"sms" | "email"',
        description: "The notification channel type",
    },
    {
        key: "channelTarget",
        type: "string",
        description: "The email address or phone number",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "siweOwnerSignature",
        type: "string",
        description: "The owner's signature for the SIWE message",
    },
];

export const activateSubscriptionParams = [
    {
        key: "subscriptionId",
        type: "string",
        description: "The subscription ID to activate",
    },
    {
        key: "otpChallenge",
        type: "string",
        description: "The OTP code received via email or SMS",
    },
];

export const unsubscribeSiweParams = [
    {
        key: "ownerAddress",
        type: "string",
        description: "The owner address of the Safe account",
    },
];

export const unsubscribeParams = [
    {
        key: "subscriptionId",
        type: "string",
        description: "The subscription ID to remove",
    },
    {
        key: "ownerAddress",
        type: "string",
        description: "The owner address of the Safe account",
    },
    {
        key: "siweMessage",
        type: "string",
        description: "The SIWE message to authenticate the request",
    },
    {
        key: "siweOwnerSignature",
        type: "string",
        description: "The owner's signature for the SIWE message",
    },
];

export const alertsSubscriptionType = [
    {
        key: "id",
        type: "string",
        description: "Unique subscription ID",
    },
    {
        key: "channel",
        type: '"email" | "sms"',
        description: "The notification delivery channel",
    },
    {
        key: "target",
        type: "string",
        description: "The email address or phone number receiving notifications",
    },
];

// ─── Utility Functions ───

export const generateSIWEMessageParams = [
    {
        key: "accountAddress",
        type: "string",
        description: "The account address for the SIWE message",
    },
    {
        key: "statement",
        type: "string",
        description: "The human-readable statement for the SIWE message",
    },
    {
        key: "chainId",
        type: "bigint",
        description: "The chain ID of the network",
    },
    {
        key: "siweDomain",
        type: "string",
        description: "The domain for the SIWE message (e.g. 'example.com')",
    },
    {
        key: "siweUri",
        type: "string",
        description: "The URI for the SIWE message (e.g. 'https://example.com')",
    },
];

// ─── Error Types ───

export const safeRecoveryServiceSdkErrorType = [
    {
        key: "code",
        type: "BasicErrorCode",
        description: "The error code identifying the type of error (e.g. HTTP_BAD_REQUEST, SIWE_ERROR, UNKNOWN_ERROR)",
    },
    {
        key: "message",
        type: "string",
        description: "Human-readable error message",
    },
    {
        key: "context",
        type: "Jsonable | undefined",
        description: "Additional context about the error (e.g. URL, request options)",
    },
    {
        key: "errno",
        type: "number | undefined",
        description: "Numeric error code (typically the HTTP status code)",
    },
];

// ─── Grace Period Enum ───

export const socialRecoveryModuleGracePeriodSelectorType = [
    {
        key: "After3Minutes",
        type: "string",
        description: "0x949d01d424bE050D09C16025dd007CB59b3A8c66 (useful for testing)",
    },
    {
        key: "After3Days",
        type: "string",
        description: "0x38275826E1933303E508433dD5f289315Da2541c",
    },
    {
        key: "After7Days",
        type: "string",
        description: "0x088f6cfD8BB1dDb1BB069CCb3fc1A98927D233f2",
    },
    {
        key: "After14Days",
        type: "string",
        description: "0x9BacD92F4687Db306D7ded5d4513a51EA05df25b",
    },
];

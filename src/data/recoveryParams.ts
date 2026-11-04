const createEnableModuleParams = [
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const createConfirmRecoveryParamsV1 = [
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "The new owners' addresses.",
  },
  {
    key: "newThreshold",
    type: "number",
    description: "The new threshold for the safe.",
  },
  {
    key: "execute",
    type: "boolean",
    description: "Whether to auto-start execution of recovery.",
  },
];

const createConfirmRecoveryParamsV2 = [
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "The new owners' addresses.",
  },
  {
    key: "newThreshold",
    type: "number",
    description: "The new threshold for the safe.",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The account's current recovery nonce (see nonce). The module reverts if it changed before the transaction is included.",
  },
  {
    key: "execute",
    type: "boolean",
    description: "Whether to auto-start execution of recovery.",
  },
];

const createMultiConfirmRecoveryParamsV1 = [
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "The new owners' addresses.",
  },
  {
    key: "newThreshold",
    type: "number",
    description: "The new threshold for the safe.",
  },
  {
    key: "signaturePairList",
    type: "RecoverySignaturePair[]",
    description: "The guardians signers and signatures pair list.",
  },
  {
    key: "execute",
    type: "boolean",
    description: "Whether to auto-start execution of recovery.",
  },
];

const createMultiConfirmRecoveryParamsV2 = [
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "The new owners' addresses.",
  },
  {
    key: "newThreshold",
    type: "number",
    description: "The new threshold for the safe.",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The recovery nonce the guardians signed (messageValue.nonce from getRecoveryRequestEip712Data). It must still be the account's current nonce when the transaction is included.",
  },
  {
    key: "signaturePairList",
    type: "RecoverySignaturePair[]",
    description: "The guardians signers and signatures pair list.",
  },
  {
    key: "execute",
    type: "boolean",
    description: "Whether to auto-start execution of recovery.",
  },
];

const createExecuteRecoveryParams = [
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "The new owners' addresses.",
  },
  {
    key: "newThreshold",
    type: "number",
    description: "The new threshold for the safe.",
  },
];

const createFinalizeRecoveryParams = [
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const createCancelRecoveryParams = [];

const createAddGuardianWithThresholdParams = [
  {
    key: "guardianAddress",
    type: "string",
    description: "The guardian to add.",
  },
  {
    key: "threshold",
    type: "bigint",
    description: "The new threshold that will be set after addition.",
  },
];

const createRevokeGuardianWithThresholdParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The JSON-RPC API url for the target chain (to get the prevGuardian parameter).",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account.",
  },
  {
    key: "guardianAddress",
    type: "string",
    description: "The guardian to revoke.",
  },
  {
    key: "threshold",
    type: "bigint",
    description: "The new threshold that will be set after execution of revocation.",
  },
  {
    key: "overrides",
    type: "object",
    description: "Optional overrides object with prevGuardianAddress.",
  },
];

const createStandardRevokeGuardianWithThresholdParams = [
  {
    key: "prevGuardianAddress",
    type: "string",
    description: "The previous guardian linking to the guardian in the linked list.",
  },
  {
    key: "guardianAddress",
    type: "string",
    description: "The guardian to revoke.",
  },
  {
    key: "threshold",
    type: "bigint",
    description: "The new threshold that will be set after execution of revocation.",
  },
];

const createChangeThresholdMetaTransactionParams = [
  {
    key: "threshold",
    type: "bigint",
    description:
      "The new guardian threshold.",
  },
];

const getRecoveryHashParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The JSON-RPC API url for the target chain.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "The new owners' addresses.",
  },
  {
    key: "newThreshold",
    type: "number",
    description: "The new threshold for the safe.",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "Recovery nonce.",
  },
];

const getRecoveryRequestEip712DataParams = [
  {
    key: "rpcNode",
    type: "string | Transport | JsonRpcNode",
    description: "Node to fetch the recovery nonce.",
  },
  {
    key: "chainId",
    type: "bigint",
    description: "Chain ID of the target network.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "Address of account to recover.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "New owners to recover to.",
  },
  {
    key: "newThreshold",
    type: "bigint",
    description: "New threshold.",
  },
  {
    key: "overrides",
    type: "object",
    description: "Optional overrides. recoveryNonce sets the recovery nonce instead of reading it from the node.",
  },
];

const getRecoveryRequestParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const getRecoveryApprovalsParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "The new owners' addresses.",
  },
  {
    key: "newThreshold",
    type: "number",
    description: "The new threshold for the safe.",
  },
];

const hasGuardianApprovedParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "guardian",
    type: "string",
    description: "The guardian.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "The new owners' addresses.",
  },
  {
    key: "newThreshold",
    type: "number",
    description: "The new threshold for the safe.",
  },
];

const isGuardianParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
  {
    key: "guardian",
    type: "string",
    description: "The address to check.",
  },
];

const guardiansCountParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const thresholdParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const getGuardiansParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const nonceParams = [
  {
    key: "nodeRpcUrl",
    type: "string | Transport | JsonRpcNode",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const RecoveryRequestV2Params = [
  {
    key: "guardiansApprovalCount",
    type: "bigint",
    description: "The number of guardian approvals.",
  },
  {
    key: "newThreshold",
    type: "bigint",
    description: "The new threshold for the safe.",
  },
  {
    key: "nonce",
    type: "bigint",
    description: "The recovery nonce the request was approved under.",
  },
  {
    key: "executableAt",
    type: "bigint",
    description: "Unix timestamp (seconds) from which the recovery can be finalized. 0 if no recovery is in progress.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "Array of new owners' addresses.",
  },
];

const RecoveryRequestV1Params = [
  {
    key: "guardiansApprovalCount",
    type: "bigint",
    description: "The number of guardian approvals.",
  },
  {
    key: "newThreshold",
    type: "bigint",
    description: "The new threshold for the safe.",
  },
  {
    key: "executeAfter",
    type: "bigint",
    description: "Unix timestamp (seconds) from which the recovery can be finalized. 0 if not yet executed.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "Array of new owners' addresses.",
  },
];

const getRecoveryRequestEip712DataReturnParams = [
  {
    key: "domain",
    type: "RecoveryRequestTypedDataDomain",
    description: "EIP-712 domain: name \"Social Recovery Module\", version (\"0.2.0\" for V2, \"0.0.1\" for V1), chainId, and the module address as verifyingContract.",
  },
  {
    key: "types",
    type: "Record<string, { name: string; type: string }[]>",
    description: "EIP-712 type definitions for the ExecuteRecovery primary type.",
  },
  {
    key: "messageValue",
    type: "RecoveryRequestTypedMessageValue",
    description: "The message to sign: wallet, newOwners, newThreshold, and nonce. On V2, pass messageValue.nonce to the confirm methods.",
  },
];

const RecoverySignaturePairParams = [
  {
    key: "signer",
    type: "string",
    description: "Guardian address that produced the signature.",
  },
  {
    key: "signature",
    type: "string",
    description: "Hex-encoded signature bytes.",
  },
];

const sendEthCallRequestParams = [
  {
    key: "nodeRpcUrl",
    type: "string",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "ethCallTransaction",
    type: "EthCallTransaction",
    description: "The Ethereum call transaction object.",
  },
  {
    key: "blockNumber",
    type: "string | bigint",
    description: "The block number or 'latest' for the transaction.",
  },
];

export {
  createEnableModuleParams,
  createConfirmRecoveryParamsV1,
  createConfirmRecoveryParamsV2,
  createMultiConfirmRecoveryParamsV1,
  createMultiConfirmRecoveryParamsV2,
  createExecuteRecoveryParams,
  createFinalizeRecoveryParams,
  createCancelRecoveryParams,
  createAddGuardianWithThresholdParams,
  createRevokeGuardianWithThresholdParams,
  createStandardRevokeGuardianWithThresholdParams,
  createChangeThresholdMetaTransactionParams,
  getRecoveryHashParams,
  getRecoveryRequestEip712DataParams,
  getRecoveryRequestEip712DataReturnParams,
  getRecoveryRequestParams,
  getRecoveryApprovalsParams,
  hasGuardianApprovedParams,
  isGuardianParams,
  guardiansCountParams,
  thresholdParams,
  getGuardiansParams,
  nonceParams,
  RecoveryRequestV1Params,
  RecoveryRequestV2Params,
  RecoverySignaturePairParams,
  sendEthCallRequestParams,
};

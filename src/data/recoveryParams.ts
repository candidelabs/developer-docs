const createEnableModuleParams = [
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const createConfirmRecoveryParams = [
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

const createMultiConfirmRecoveryParams = [
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
    type: "string",
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
      "The new threshold that will be set after execution of revokation.",
  },
];

const getRecoveryHashParams = [
  {
    key: "nodeRpcUrl",
    type: "string",
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
    type: "string",
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
    description: "Optional overrides with recoveryNonce.",
  },
];

const getRecoveryRequestParams = [
  {
    key: "nodeUrl",
    type: "string",
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
    key: "nodeUrl",
    type: "string",
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
    key: "nodeURL",
    type: "string",
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
    type: "string",
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
    type: "string",
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
    key: "nodeURL",
    type: "string",
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
    type: "string",
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
    type: "string",
    description: "The Node URL of the Ethereum RPC endpoint.",
  },
  {
    key: "accountAddress",
    type: "string",
    description: "The target account address.",
  },
];

const RecoveryRequestParams = [
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
    description: "Timestamp indicating when the execution can happen.",
  },
  {
    key: "newOwners",
    type: "string[]",
    description: "Array of new owners' addresses.",
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
  createConfirmRecoveryParams,
  createMultiConfirmRecoveryParams,
  createExecuteRecoveryParams,
  createFinalizeRecoveryParams,
  createCancelRecoveryParams,
  createAddGuardianWithThresholdParams,
  createRevokeGuardianWithThresholdParams,
  createStandardRevokeGuardianWithThresholdParams,
  createChangeThresholdMetaTransactionParams,
  getRecoveryHashParams,
  getRecoveryRequestEip712DataParams,
  getRecoveryRequestParams,
  getRecoveryApprovalsParams,
  hasGuardianApprovedParams,
  isGuardianParams,
  guardiansCountParams,
  thresholdParams,
  getGuardiansParams,
  nonceParams,
  RecoveryRequestParams,
  RecoverySignaturePairParams,
  sendEthCallRequestParams,
};

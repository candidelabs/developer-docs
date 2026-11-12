---
title: Installation Guide for running a ERC-4337 Bundler locally or for self-hosting
description: Instructions for running Voltaire ERC-4337 Python Bundler
image: /img/posters/voltaire-meta.png
---

# Install & Self-host Candide's Voltaire 

This guide is intended for developers wishing to spin a instance of Voltaire ERC-4337 Python bundler for handling User Operations. Voltaire is open source and can be found on [github.com/candidelabs/voltaire](https://github.com/candidelabs/voltaire)

:::info
Looking for a quick bundler instance? Use one from our [dashboard](https://dashboard.candide.dev) for your developement
:::

## Docker

The quickest way to get started is to use the docker image.

- Install [docker](https://docs.docker.com/engine/install)
- Find the latest Voltaire [releases](https://github.com/candidelabs/voltaire/releases)
- Run the following command to start the bundler:

```bash
docker run --net=host --rm -d ghcr.io/candidelabs/voltaire/voltaire-bundler:$VOLTAIRE_VERSION --bundler_secret $BUNDLER_SECRET --rpc_url $RPC_URL --ethereum_node_url $ETHEREUM_NODE_URL --chain_id $CHAIN_ID --verbose
```

This command will pull the latest docker image and will then start the bundler to listen for UserOperations. Once running, you can then send User Operations to `http://127.0.0.1:3000/rpc`. `--rpc_url` is the host the server binds to, not a client URL: when it is `0.0.0.0`, remote clients use the server's reachable hostname or IP address. The supported EntryPoint versions (v0.6, v0.7, v0.8 and v0.9) are built in, so there is no EntryPoint flag to pass.

| flags            |Comment                                     
| -----------------| -------------------------------------------
|`--bundler_secret`| Private key of the bundler. Use any EOA's to be the secret and make sure it's funded with some ETH
|`--keystore_file_path`| Bundler Keystore file path. Defaults to first file in keystore folder (optional)
|`--keystore_file_password`| Bundler Keystore file password. Defaults to no password (optional)                
|`--rpc_url`       | Host the RPC server binds to. Defaults to `127.0.0.1`; use `0.0.0.0` to accept external connections (optional)
|`--rpc_port`      | RPC serve port number. Defaults to 3000 (optional)
| `--ethereum_node_url`| Pass the node url of your own instance if you are running a full node [locally](#local-full-node), or a link to a full node endpoint from an [RPC provider](#rpc-provider) - defaults to http://0.0.0.0:8545
|`--chain_id`      | Chain ID of the network the bundler will operate in. Defaults to 1337
|`--verbose`       | To get verbose logs (optional)
|`--debug`         | Expose _debug rpc namespace for testing. Disables auto bundling: trigger bundles manually with `debug_bundler_sendBundleNow` (optional)
| `--unsafe`       | In order to implement the full spec storage access rules and opcode banning, it must run against a go-ethereum or erigon node, which supports `debug_traceCall` with javascript "tracer". Specifically, `hardhat node`, `ganache`, infura and alchemy nodes do NOT support this API. You can still run the bundler with such nodes, but with `--unsafe` so it would skip these security checks (optional)
|`--legacy_mode`   | for networks that don't support EIP-1559 (optional)
|`--bundle_interval`| Set the bundle interval in seconds for the auto bundle mode. Must be strictly positive, defaults to 2. Use `--debug` for manual mode (optional)
|`--disable_v6`    | Disable support for EntryPoint v0.6 (optional)
|`--reputation_whitelist`| Entities that will not be banned or throttled (optional)
|`--metrics`       | enable metrics collection using prometheus and grafana (optional)
|`--version`       | show program's version number and exit (optional)
| `--disable_p2p` | P2P is disabled by default. Pass `--disable_p2p false` to join the shared mempool (optional)
| `--p2p_boot_nodes_enr` | To connect the unified shared mempool. Find all ENRs [in this repo](https://github.com/sherifahmed990/shared_bundler_mempool_4337/). (optional)
| `--eip7702` | To enable EIP-7702 support. (optional)

To know about all flags:

```bash
docker run --rm -it ghcr.io/candidelabs/voltaire/voltaire-bundler:$VOLTAIRE_VERSION -h
```
### RPC Provider
If you want to run voltaire locally and have a paid plan with an RPC provider for a full node that supports debug_traceCall with javascript "tracer", you can simple replace `$ETHEREUM_NODE_URL` with the link to the rpc endpoint. If it doesn't support a javascript tracer, you can run with the `--unsafe` flag for testing purposes. This mode is not meant to be used in production. 

### Local Full Node
If you are running your own full node, simply pass your own node url in `--ethereum_node_url`. If you want to run your own node, which comes with superpowers, see the [go-ethereum docs](https://geth.ethereum.org/docs/getting-started). You can also run a different client implentation.

Voltaire works well with [go-ethereum](https://geth.ethereum.org/) and [erigon](https://github.com/ledgerwatch/erigon/). Contact us if you would like to see Voltaire tested with a different client.

## Development

Ubuntu Instructions

### Install Poetry
```
curl -sSL https://install.python-poetry.org | python3 -
```
#### Install dependencies
```
poetry install
```

#### Make sure you are using the right python version

```
poetry env use python3.13
```

### Install Foundry

The local setup script uses `anvil` and `cast`. Follow the [Foundry installation guide](https://book.getfoundry.sh/getting-started/installation).

### Run the bundler

From the root of the Voltaire repository:

```bash
./scripts/local-dev-setup.sh
```

The script starts a local anvil node (chain ID 1337), deploys the EntryPoint v0.6, v0.7, v0.8 and v0.9 contracts, funds the bundler signer, and launches the bundler. Once running, the bundler RPC is available at `http://127.0.0.1:3000/rpc` and the anvil node at `http://127.0.0.1:8545`.

To run the bundler yourself against a node that already has the EntryPoint contracts deployed:

```bash
poetry run python3 -m voltaire_bundler --bundler_secret $BUNDLER_SECRET --chain_id $CHAIN_ID --ethereum_node_url $ETHEREUM_NODE_URL --verbose --unsafe
```

#### Test the bundler by cloning `eth-infinitism/bundler-spec-tests`

Follow the instruction in <a href='https://github.com/eth-infinitism/bundler-spec-tests'>eth-infinitism/bundler-spec-tests</a> to install dependencies and run the test

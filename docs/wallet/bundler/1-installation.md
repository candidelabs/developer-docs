---
title: Installation Guide for running a ERC-4337 Bundler locally or for self-hosting
description: Instructions for running Voltaire ERC-4337 Python Bundler
image: /img/posters/voltaire-meta.png
---

# Install & Self-host Candide's Voltaire 

This guide is intended for developers wishing to spin a instance of Voltaire ERC-4337 Python bundler for handling User Operations. Voltaire is open source and can be found on [github.com/candidelabs/voltaire](https://github.com/candidelabs/voltaire)

:::info
Looking for a quick bundler instance? Use one of our [public hosted endpoints](./3-rpc-endpoints.mdx) for your developement
:::

## Docker

The quickest way to get started is to use the docker image.

- Install [docker](https://docs.docker.com/engine/install)
- Find the latest Voltaire [releases](https://github.com/candidelabs/voltaire/releases)
- Run the following command to start a geth node and deploy the EntryPoint contract:

```bash
docker run --net=host --rm -d ghcr.io/candidelabs/voltaire/voltaire-bundler:$VOLTAIRE_VERSION --entrypoint $ENTRYPOINT --bundler_secret $BUNDLER_SECRET --rpc_url $RPC_URL --ethereum_node_url $ETHEREUM_NODE_URL --chain_id $CHAIN_ID --verbose
```

This command will pull the latest docker image and will then start the bundler to listen for UserOperations. Once running, you can then send User Operation to the following if you used the default `$RPC_URL`: `0.0.0.0:3000/rpc`

| flags            |Comment                                     
| -----------------| -------------------------------------------
|`--entrypoint`    | Address of the entrypoint contract 
|`--bundler_secret`| Private key of the bundler. Use any EOA's to be the secret and make sure it's funded with some ETH
|`--keystore_file_path`| Bundler Keystore file path. Defaults to first file in keystore folder (optional)
|`--keystore_file_password`| Bundler Keystore file password. Defaults to no password (optional)                
|`--rpc_url`       | URL of the rpc endpoint you will be hosting. Use `0.0.0.0` as default
|`--rpc_port`      | RPC serve port number. Defaults to 3000 (optional)
| `--ethereum_node_url`| Pass the node url of your own instance if you are running a full node [locally](#local-full-node), or a link to a full node endpoint from an [RPC provider](#rpc-provider) - defaults to http://0.0.0.0:8545
|`--chain_id`      | Chain ID of the network the bundler will operate in
|`--verbose`       | To get verbose logs (optional)
|`--debug`         | Expose _debug rpc namespace for testing (optional)
| `--unsafe`       | In order to implement the full spec storage access rules and opcode banning, it must run against a go-ethereum or erigon node, which supports `debug_traceCall` with javascript "tracer". Specifically, `hardhat node`, `ganache`, infura and alchemy nodes do NOT support this API. You can still run the bundler with such nodes, but with `--unsafe` so it would skip these security checks (optional)
|`--legacy_mode`   | for netwroks that doesn't support EIP-1559 (optional)
|`--bundle_interval`| Set the bundle interval in seconds for the auto bundle mode - set to zero for manual mode (optional)
|`--whitelist_entity_storage_access`| list of entities to whitelist for storage access rules (optional)
|`--metrics`       | enable metrics collection using prometheus and grafana (optional)
|`--version`       | show program's version number and exit (optional)

To know about all flags:

```bash
docker run --rm -it ghcr.io/candidelabs/voltaire/voltaire-bundler:$VERSION -h
```
### RPC Provider
If you want to run voltaire locally and have a paid plan with an RPC provider for a full node that supports debug_traceCall with javascript "tracer", you can simple replace `$ETHEREUM_NODE_URL` with the link to the rpc endpoint. If it doesn't support a javascript tracer, you can run with the `--unsafe` flag for testing purposes. This mode is not meant to be used in production. 

### Local Full Node
If you are running your own full node, simply pass your own node url in `--ethereum_node_url`. If you want to run your own node, which comes with superpowers, follow the instruction below to run GETH [using docker](#start-geth). You can also run a different client implentation.

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
poetry env use python3.11
```

### Install Docker

Follow the installation guide to install [docker on ubunutu](https://docs.docker.com/engine/install/ubuntu/)

#### Post docker installation

Follow the instruction for docker's [post linux instalation](https://docs.docker.com/engine/install/linux-postinstall/)  

### Start GETH
```bash
docker run --rm -ti --name geth -p 8545:8545 ethereum/client-go:v1.10.26 \
  --miner.gaslimit 12000000 \
  --http --http.api personal,eth,net,web3,debug \
  --http.vhosts '*,localhost,host.docker.internal' --http.addr "0.0.0.0" \
  --ignore-legacy-receipts --allow-insecure-unlock --rpc.allow-unprotected-txs \
  --dev \
  --verbosity 4 \
  --nodiscover --maxpeers 0 --mine --miner.threads 1 \
  --networkid 1337
```

#### In another terminal, deploy the EntryPoint and fund the signer

```bash
geth --exec 'loadScript("test/deploy.js")' attach http://0.0.0.0:8545
```

#### Set the ENTRYPOINT environment variable

```bash
source test/init-params 
```

### Run the bundler
#### In a new terminal
```
poetry run python3 main.py --entrypoint $ENTRYPOINT --bundler_secret $BUNDLER_SECRET --chain_id $CHAIN_ID --verbos
```

#### Test the bundler by cloning `eth-infinitism/bundler-spec-tests`

Follow the instruction in <a href='https://github.com/eth-infinitism/bundler-spec-tests'>eth-infinitism/bundler-spec-tests</a> to install dependencies and run the test

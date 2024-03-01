## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

### Deploy Wormhole NTT

#### Environment Setup

Copy the sample environment file located in `env/` into the target subdirectory of your choice (currently `testnet` or `mainnet`) and prefix the filename with your blockchain of choice:

```
cp env/.env.sample env/testnet/sepolia.env
```

Do this for each blockchain network that the `NTTManager` and `WormholeTransceiver` contracts will be deployed to. Then configure each `.env` file and set the `RPC` variables.

#### Config Setup

Before deploying the contracts, navigate to the `cfg` directory and copy the sample file. Make sure to preserve the existing name:

```
cd cfg

cp WormholeNttConfig.json.sample WormholeNttConfig.json
```

Configure each network to your liking (including adding/removing networks). We will eventually add the addresses of the deployed contracts to this file.

#### Deploy

Deploy the `NttManager` and `WormholeTransceiver` contracts by running the following command for each target network:

```
bash sh/deploy_wormhole_ntt.sh -n NETWORK_TYPE -c CHAIN_NAME -k PRIVATE_KEY

# Argument examples
-n testnet, mainnet
-c avalanche, ethereum, sepolia
```

Save the deployed proxy contract addresses in the `WormholeNttConfig.json` file.

#### Configuration

Once all of the contracts have been deployed and the addresses have been saved, run the following command for each target network:

```
bash sh/configure_wormhole_ntt.sh -n NETWORK_TYPE -c CHAIN_NAME -k PRIVATE_KEY

# Argument examples
-n testnet, mainnet
-c avalanche, ethereum, sepolia
```

# example-native-token-transfers

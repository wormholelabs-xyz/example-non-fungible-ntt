## NTT: Native Token Transfers

### Overview

Wormhole’s Native Token Transfers (NTT) is an open, flexible, and composable framework for transferring tokens across blockchains without liquidity pools. Integrators have full control over how their Natively Transferred Tokens (NTTs) behave on each chain, including the token standard and metadata. For existing token deployments, the framework can be used in “locking” mode which preserves the original token supply on a single chain. Otherwise, the framework can be used in “burning” mode to deploy natively multichain tokens with supply distributed among multiple chains.

### Design
 - **Transceiver**: This contract module is responsible for sending Ntt transfers forwarded through the NTTManager on the source chain and delivered to a corresponding peer NTTManager on the recipient chain. Transceivers should follow the ITransceiver interface. Transceivers can be instantiated without use of the Wormhole core contracts for message authentication.

 - **NttManager**: The NttManager contract is responsible for managing the token and the transceivers. It also handles the rate limiting and the message attestation logic. Note that each NTTManager corresponds to a single token. However, a single NTTManager can manager can control multiple transceivers.

### Amount trimming

In the payload, amounts are encoded as unsigned 64 bit integers, and capped at 8 decimals.
This means that if on the sending chain, the token has more than 8 decimals, then the amount is trimmed.
The amount that's removed during trimming is referred to as "dust". The contracts make sure to never destroy dust.
The NTT manager contracts additionally keep track of the token decimals of the other connected chains. When sending to a chain whose token decimals are less than 8, the amount is instead truncated to those decimals, in order to ensure that the recipient contract can handle the amount without destroying dust.

The payload includes the trimmed amount, together with the decimals that trimmed amount is expressed in. This number is the minimum of (8, source token decimals, destination token decimals).

# Rate-Limiting and Cancel Flows

Ntt supports rate limiting on the sending. If a trnasfer is rate limited on the source chain and queueing is enabled, transfers are placed into a outbound queue that can be released after a 24-hr window via the [`completeInboundTransferQueue`] method.

Transfers that are rate-limited on the destination chain are added to an InboundTransferQueue that can be released via the [`completeInboundTransferQueue`] method.

If users bridge frequently between an arbitrary source chain and a given destination chain, the capacity could be exhausted quickly, leaving other users rate-limited, potentially delaying transfers. To mitigate this issue, we refilling the inbound rate limit on the source chain by the  equivalent amount of the outbound transfer. We refer to this colloquially as "Cancel Flow".

### NTT Message Lifecycle (EVM)

1. **Send**: A client calls on [`transfer`] to initiate an NTT transfer. The client must specify at minimum, the amount of the transfer, the recipient chain, and the recipient address on the recipient chain. [`transfer`] also supports a flag to specify whether the NTTManager should queue transfers if they are rate-limited. Clients can also include additional instructions to forward along to its peer NTT Manager on the recipient chain to execute. Depending on the mode, transfers are either "locked" or "burned". Once the transfer has been forwarded to the Transceiver, the NttManager emits the following event:

``` solidity
    event TransferSent(
        bytes32 recipient, uint256 amount, uint256 fee, uint16 recipientChain, uint64 msgSequence
    );
```

2. **Rate Limit**: NTT supports rate-limiting of tranfers based on a 24-hr sliding window. This is intended to be a defense-in-depth security measure to mitigate and localize risk.
If a transfer sent from the source chain is rate-limited and queueing is enabled, it is added to a queue of transfers.

The following events are emitted:
``` solidity
event OutboundTransferQueued(uint64 queueSequence);
event OutboundTransferRateLimited(
        address indexed sender, uint64 sequence, uint256 amount, uint256 currentCapacity
    );
```
A transfer can be released from the queue in 2 ways: (1) the capacity available exceeds the transfer amount; (2) the 24 hr period is up. In both cases, the client can call the [`completeOutboundQueuedTransfer`] function to release the transfer from the queue. The client should specify the gas amount here again to ensure that the delivery does not revert.

3. **Transmit**

Once the NttManager forwards the message to the Transceiver the message is transmitted via the [`sendMessage`] method. The method signature if enforced by the [`Transceiver`] but transceivers are free to determine their own implementation for transmitting messages.
(e.g A message routed through the Wormhole Transceiver can be sent via automatic relaying (AR), via a specialized or custom relayer, or via the core bridge).The following event is emitted once the message has been transmitted.
``` solidity
    event SendTransceiverMessage(
        uint16 recipientChain, TransceiverStructs.TransceiverMessage message
    );
```
4. **Receive**

Once a message has been transmitted across the wire, an off-chain process (e.g. a relayer) will forward the message to the corresponding Transceiver on the recipient chain. The relayer interacts with the transceiver via an entrypoint for receiving messages (e.g. Wormhole messages are received through the [`receiveWormholeMessages`] method, which performs the messages verification along with replay protection)
The following event is emitted during this process:
``` solidity
    event ReceivedRelayedMessage(bytes32 digest, uint16 emitterChainId, bytes32 emitterAddress);
```
This method should also forward the message to the NttManager on the recipient chain.
NOTE: The Transceiver interface does not enforce the method signature abstractly because receiving messages may be specific to the way in which a transceiver consumes messages.

    a. Messages received on the destination chains are also rate limited as described in (link to the section on Rate-Limiting and Cancel Flows). If an inbound transfers is rate-limited, the following event is emitted:

``` solidity
event InboundTransferQueued(bytes32 digest);
```

If a user attempts to release the transfers before the rate-limit duration, we revert with the following error messages:

``` solidity
error InboundQueuedTransferStillQueued(bytes32 digest, uint256 transferTimestamp);
```

5. **Attest**

Once the message is delivered to the Ntt Manager, this contract updates its current state to reflect the number of attestations
the message has received from distinct transceivers.
On each attesation, this event is emitted:

``` solidity
event MessageAttestedTo(bytes32 digest, address transceiver, uint8 index);
```

Based on these attestations, the contract decides whether the can be executed.
If not, it simply reverts via [`error TransceiverAlreadyAttestedToMessage(bytes32 digest)`]

Note that attestation is idempotent (bitwise or 1), but we revert anyway to ensure that the client (e.g. a relayer)
does not continue to initiate calls to attest the same message through the same transceiver repeatedly.

[`execute_msg`] is called after a message has been sufficiently verified to execute the command message payload.
Note that this method performs all the necessary security critical checks. As a result, this methods is made public.
Clients can call this method directly to execute messages that were previously approved but have not been executed as a result of
being rate-limited.

[`execute_msg`] contains replay protection; however, instead of reverting, we end execution early to mitigate the possibility of race conditions from transceivers
attempting to deliver the same message when the threshold is strictly less than the number of transceiver messages.
The following event is emitted to notify clients (e.g. an off-chain process) so they don't attempt
redundant message delivery.

```solidity
event MessageAlreadyExecuted(bytes32 indexed sourceNttManager, bytes32 indexed msgHash);
```

6. **Mint or Unlock**
Once the message has been successfully verified, the tokens can be minted or unkocked to the recipient address. The tokens are locked on the source chain adn then unlocked on the destination chain if the integrator wishes to preserve the original token supply on the source chain. If not, the tokens are burned on the source and minted on the destination chain. The following event is emitted when the tokens are either transferred or minted.

Note that the untrimmed amount is what is delivered to the recipient.

```solidity
event TransferRedeemed(bytes32 digest);
```

#### Installation

Install [Foundry](https://book.getfoundry.sh/getting-started/installation)
[Foundry]: https://book.getfoundry.sh/getting-started/installation#using-foundryup

TODO: add installation instructions for solana

Install [rust](https://doc.rust-lang.org/book/ch01-01-installation.html)
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Developer Commands

_Build_

```
$ forge build
```

_Test_

```
$ forge test
```


#### Submitting a PR

Before submitting a PR, please run the following commands:

_Test_
EVM Tests:
```
$ make test-evm
```

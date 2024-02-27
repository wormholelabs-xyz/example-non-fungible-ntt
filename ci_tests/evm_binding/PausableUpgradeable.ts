/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface PausableUpgradeableInterface extends utils.Interface {
  functions: {
    "isPaused()": FunctionFragment;
    "pauser()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "isPaused" | "pauser"): FunctionFragment;

  encodeFunctionData(functionFragment: "isPaused", values?: undefined): string;
  encodeFunctionData(functionFragment: "pauser", values?: undefined): string;

  decodeFunctionResult(functionFragment: "isPaused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pauser", data: BytesLike): Result;

  events: {
    "Initialized(uint64)": EventFragment;
    "NotPaused(bool)": EventFragment;
    "Paused(bool)": EventFragment;
    "PauserTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NotPaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PauserTransferred"): EventFragment;
}

export interface InitializedEventObject {
  version: BigNumber;
}
export type InitializedEvent = TypedEvent<[BigNumber], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface NotPausedEventObject {
  notPaused: boolean;
}
export type NotPausedEvent = TypedEvent<[boolean], NotPausedEventObject>;

export type NotPausedEventFilter = TypedEventFilter<NotPausedEvent>;

export interface PausedEventObject {
  paused: boolean;
}
export type PausedEvent = TypedEvent<[boolean], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface PauserTransferredEventObject {
  oldPauser: string;
  newPauser: string;
}
export type PauserTransferredEvent = TypedEvent<
  [string, string],
  PauserTransferredEventObject
>;

export type PauserTransferredEventFilter =
  TypedEventFilter<PauserTransferredEvent>;

export interface PausableUpgradeable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PausableUpgradeableInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    isPaused(overrides?: CallOverrides): Promise<[boolean]>;

    pauser(overrides?: CallOverrides): Promise<[string]>;
  };

  isPaused(overrides?: CallOverrides): Promise<boolean>;

  pauser(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    isPaused(overrides?: CallOverrides): Promise<boolean>;

    pauser(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Initialized(uint64)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "NotPaused(bool)"(notPaused?: null): NotPausedEventFilter;
    NotPaused(notPaused?: null): NotPausedEventFilter;

    "Paused(bool)"(paused?: null): PausedEventFilter;
    Paused(paused?: null): PausedEventFilter;

    "PauserTransferred(address,address)"(
      oldPauser?: string | null,
      newPauser?: string | null
    ): PauserTransferredEventFilter;
    PauserTransferred(
      oldPauser?: string | null,
      newPauser?: string | null
    ): PauserTransferredEventFilter;
  };

  estimateGas: {
    isPaused(overrides?: CallOverrides): Promise<BigNumber>;

    pauser(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    isPaused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pauser(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
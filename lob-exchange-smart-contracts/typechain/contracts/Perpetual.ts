/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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
} from "../common";

export declare namespace Perpetual {
  export type PositionStruct = {
    user: string;
    amount: BigNumberish;
    isLong: boolean;
    asset: string;
    entryPrice: BigNumberish;
    liquidationPrice: BigNumberish;
    fundingRate: BigNumberish;
  };

  export type PositionStructOutput = [
    string,
    BigNumber,
    boolean,
    string,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    user: string;
    amount: BigNumber;
    isLong: boolean;
    asset: string;
    entryPrice: BigNumber;
    liquidationPrice: BigNumber;
    fundingRate: BigNumber;
  };
}

export interface PerpetualInterface extends utils.Interface {
  functions: {
    "calculateFundingRate(bool)": FunctionFragment;
    "calculateLiquidationPrice(bool,uint256,uint256,uint256)": FunctionFragment;
    "calculateMaintenanceMargin(uint256,uint256)": FunctionFragment;
    "closePosition(uint256)": FunctionFragment;
    "getPosition(address)": FunctionFragment;
    "liquidatePosition(address)": FunctionFragment;
    "longPositions()": FunctionFragment;
    "maxLeverage()": FunctionFragment;
    "openPosition(bool,string,uint256,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "positions(address)": FunctionFragment;
    "setMaxLeverage(uint256)": FunctionFragment;
    "shortPositions()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "calculateFundingRate"
      | "calculateLiquidationPrice"
      | "calculateMaintenanceMargin"
      | "closePosition"
      | "getPosition"
      | "liquidatePosition"
      | "longPositions"
      | "maxLeverage"
      | "openPosition"
      | "owner"
      | "positions"
      | "setMaxLeverage"
      | "shortPositions"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "calculateFundingRate",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateLiquidationPrice",
    values: [boolean, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateMaintenanceMargin",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "closePosition",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getPosition", values: [string]): string;
  encodeFunctionData(
    functionFragment: "liquidatePosition",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "longPositions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxLeverage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "openPosition",
    values: [boolean, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "positions", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setMaxLeverage",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "shortPositions",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "calculateFundingRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateLiquidationPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateMaintenanceMargin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "closePosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "liquidatePosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "longPositions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxLeverage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "openPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "positions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMaxLeverage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "shortPositions",
    data: BytesLike
  ): Result;

  events: {
    "FundingRateAdjusted(address,uint256)": EventFragment;
    "PositionClosed(address,bool,string,uint256,uint256)": EventFragment;
    "PositionLiquidated(address,string,uint256,uint256)": EventFragment;
    "PositionOpened(address,bool,string,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FundingRateAdjusted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PositionClosed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PositionLiquidated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PositionOpened"): EventFragment;
}

export interface FundingRateAdjustedEventObject {
  user: string;
  fundingRate: BigNumber;
}
export type FundingRateAdjustedEvent = TypedEvent<
  [string, BigNumber],
  FundingRateAdjustedEventObject
>;

export type FundingRateAdjustedEventFilter =
  TypedEventFilter<FundingRateAdjustedEvent>;

export interface PositionClosedEventObject {
  user: string;
  isLong: boolean;
  asset: string;
  amount: BigNumber;
  exitPrice: BigNumber;
}
export type PositionClosedEvent = TypedEvent<
  [string, boolean, string, BigNumber, BigNumber],
  PositionClosedEventObject
>;

export type PositionClosedEventFilter = TypedEventFilter<PositionClosedEvent>;

export interface PositionLiquidatedEventObject {
  user: string;
  asset: string;
  amount: BigNumber;
  liquidationPrice: BigNumber;
}
export type PositionLiquidatedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  PositionLiquidatedEventObject
>;

export type PositionLiquidatedEventFilter =
  TypedEventFilter<PositionLiquidatedEvent>;

export interface PositionOpenedEventObject {
  user: string;
  isLong: boolean;
  asset: string;
  amount: BigNumber;
  entryPrice: BigNumber;
  leverage: BigNumber;
}
export type PositionOpenedEvent = TypedEvent<
  [string, boolean, string, BigNumber, BigNumber, BigNumber],
  PositionOpenedEventObject
>;

export type PositionOpenedEventFilter = TypedEventFilter<PositionOpenedEvent>;

export interface Perpetual extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PerpetualInterface;

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
    calculateFundingRate(
      isLong: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculateLiquidationPrice(
      isLong: boolean,
      entryPrice: BigNumberish,
      amount: BigNumberish,
      maintenanceMargin: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculateMaintenanceMargin(
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    closePosition(
      exitPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getPosition(
      user: string,
      overrides?: CallOverrides
    ): Promise<[Perpetual.PositionStructOutput]>;

    liquidatePosition(
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    longPositions(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxLeverage(overrides?: CallOverrides): Promise<[BigNumber]>;

    openPosition(
      isLong: boolean,
      asset: string,
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    positions(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, boolean, string, BigNumber, BigNumber, BigNumber] & {
        user: string;
        amount: BigNumber;
        isLong: boolean;
        asset: string;
        entryPrice: BigNumber;
        liquidationPrice: BigNumber;
        fundingRate: BigNumber;
      }
    >;

    setMaxLeverage(
      _maxLeverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    shortPositions(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  calculateFundingRate(
    isLong: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateLiquidationPrice(
    isLong: boolean,
    entryPrice: BigNumberish,
    amount: BigNumberish,
    maintenanceMargin: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateMaintenanceMargin(
    amount: BigNumberish,
    leverage: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  closePosition(
    exitPrice: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getPosition(
    user: string,
    overrides?: CallOverrides
  ): Promise<Perpetual.PositionStructOutput>;

  liquidatePosition(
    user: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  longPositions(overrides?: CallOverrides): Promise<BigNumber>;

  maxLeverage(overrides?: CallOverrides): Promise<BigNumber>;

  openPosition(
    isLong: boolean,
    asset: string,
    amount: BigNumberish,
    leverage: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  positions(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, boolean, string, BigNumber, BigNumber, BigNumber] & {
      user: string;
      amount: BigNumber;
      isLong: boolean;
      asset: string;
      entryPrice: BigNumber;
      liquidationPrice: BigNumber;
      fundingRate: BigNumber;
    }
  >;

  setMaxLeverage(
    _maxLeverage: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  shortPositions(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    calculateFundingRate(
      isLong: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateLiquidationPrice(
      isLong: boolean,
      entryPrice: BigNumberish,
      amount: BigNumberish,
      maintenanceMargin: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateMaintenanceMargin(
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    closePosition(
      exitPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getPosition(
      user: string,
      overrides?: CallOverrides
    ): Promise<Perpetual.PositionStructOutput>;

    liquidatePosition(user: string, overrides?: CallOverrides): Promise<void>;

    longPositions(overrides?: CallOverrides): Promise<BigNumber>;

    maxLeverage(overrides?: CallOverrides): Promise<BigNumber>;

    openPosition(
      isLong: boolean,
      asset: string,
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    positions(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, boolean, string, BigNumber, BigNumber, BigNumber] & {
        user: string;
        amount: BigNumber;
        isLong: boolean;
        asset: string;
        entryPrice: BigNumber;
        liquidationPrice: BigNumber;
        fundingRate: BigNumber;
      }
    >;

    setMaxLeverage(
      _maxLeverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    shortPositions(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "FundingRateAdjusted(address,uint256)"(
      user?: string | null,
      fundingRate?: null
    ): FundingRateAdjustedEventFilter;
    FundingRateAdjusted(
      user?: string | null,
      fundingRate?: null
    ): FundingRateAdjustedEventFilter;

    "PositionClosed(address,bool,string,uint256,uint256)"(
      user?: string | null,
      isLong?: null,
      asset?: null,
      amount?: null,
      exitPrice?: null
    ): PositionClosedEventFilter;
    PositionClosed(
      user?: string | null,
      isLong?: null,
      asset?: null,
      amount?: null,
      exitPrice?: null
    ): PositionClosedEventFilter;

    "PositionLiquidated(address,string,uint256,uint256)"(
      user?: string | null,
      asset?: null,
      amount?: null,
      liquidationPrice?: null
    ): PositionLiquidatedEventFilter;
    PositionLiquidated(
      user?: string | null,
      asset?: null,
      amount?: null,
      liquidationPrice?: null
    ): PositionLiquidatedEventFilter;

    "PositionOpened(address,bool,string,uint256,uint256,uint256)"(
      user?: string | null,
      isLong?: null,
      asset?: null,
      amount?: null,
      entryPrice?: null,
      leverage?: null
    ): PositionOpenedEventFilter;
    PositionOpened(
      user?: string | null,
      isLong?: null,
      asset?: null,
      amount?: null,
      entryPrice?: null,
      leverage?: null
    ): PositionOpenedEventFilter;
  };

  estimateGas: {
    calculateFundingRate(
      isLong: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateLiquidationPrice(
      isLong: boolean,
      entryPrice: BigNumberish,
      amount: BigNumberish,
      maintenanceMargin: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateMaintenanceMargin(
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    closePosition(
      exitPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getPosition(user: string, overrides?: CallOverrides): Promise<BigNumber>;

    liquidatePosition(
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    longPositions(overrides?: CallOverrides): Promise<BigNumber>;

    maxLeverage(overrides?: CallOverrides): Promise<BigNumber>;

    openPosition(
      isLong: boolean,
      asset: string,
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    positions(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    setMaxLeverage(
      _maxLeverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    shortPositions(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    calculateFundingRate(
      isLong: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateLiquidationPrice(
      isLong: boolean,
      entryPrice: BigNumberish,
      amount: BigNumberish,
      maintenanceMargin: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateMaintenanceMargin(
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    closePosition(
      exitPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getPosition(
      user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    liquidatePosition(
      user: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    longPositions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxLeverage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    openPosition(
      isLong: boolean,
      asset: string,
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    positions(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setMaxLeverage(
      _maxLeverage: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    shortPositions(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

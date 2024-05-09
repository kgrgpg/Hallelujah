/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockPriceOracle,
  MockPriceOracleInterface,
} from "../../contracts/MockPriceOracle";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "asset",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PriceUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "asset",
        type: "string",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "asset",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506102d2806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806322e011921461003b578063524f388914610050575b600080fd5b61004e61004936600461019f565b610075565b005b61006361005e3660046101e4565b6100d5565b60405190815260200160405180910390f35b806000836040516100869190610245565b9081526020016040518091039020819055507f159e83f4712ba2552e68be9d848e49bf6dd35c24f19564ffd523b6549450a2f482826040516100c9929190610261565b60405180910390a15050565b600080826040516100e69190610245565b9081526020016040518091039020549050919050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261012357600080fd5b813567ffffffffffffffff8082111561013e5761013e6100fc565b604051601f8301601f19908116603f01168101908282118183101715610166576101666100fc565b8160405283815286602085880101111561017f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080604083850312156101b257600080fd5b823567ffffffffffffffff8111156101c957600080fd5b6101d585828601610112565b95602094909401359450505050565b6000602082840312156101f657600080fd5b813567ffffffffffffffff81111561020d57600080fd5b61021984828501610112565b949350505050565b60005b8381101561023c578181015183820152602001610224565b50506000910152565b60008251610257818460208701610221565b9190910192915050565b6040815260008351806040840152610280816060850160208801610221565b602083019390935250601f91909101601f19160160600191905056fea26469706673582212209a39cdbb815bd7c375fc908a015f89b91b0c627d0758a97cdd8968d0996f20c264736f6c63430008140033";

type MockPriceOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockPriceOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockPriceOracle__factory extends ContractFactory {
  constructor(...args: MockPriceOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<MockPriceOracle> {
    return super.deploy(overrides || {}) as Promise<MockPriceOracle>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockPriceOracle {
    return super.attach(address) as MockPriceOracle;
  }
  override connect(signer: Signer): MockPriceOracle__factory {
    return super.connect(signer) as MockPriceOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockPriceOracleInterface {
    return new utils.Interface(_abi) as MockPriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockPriceOracle {
    return new Contract(address, _abi, signerOrProvider) as MockPriceOracle;
  }
}
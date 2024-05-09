/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IPriceOracle,
  IPriceOracleInterface,
} from "../../contracts/IPriceOracle";

const _abi = [
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
] as const;

export class IPriceOracle__factory {
  static readonly abi = _abi;
  static createInterface(): IPriceOracleInterface {
    return new utils.Interface(_abi) as IPriceOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPriceOracle {
    return new Contract(address, _abi, signerOrProvider) as IPriceOracle;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CollateralManager,
  CollateralManagerInterface,
} from "../../contracts/CollateralManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_priceOracleAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "asset",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CollateralDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "asset",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CollateralWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "collateralBalances",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositERC20Collateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "asset",
        type: "string",
      },
    ],
    name: "depositNativeCollateral",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "string",
        name: "asset",
        type: "string",
      },
    ],
    name: "getCollateralBalance",
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
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUSDValue",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "setSupportedERC20Asset",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "bool",
        name: "supported",
        type: "bool",
      },
    ],
    name: "setSupportedNativeAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "supportedERC20Assets",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "supportedNativeAssets",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawERC20Collateral",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawNativeCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516112c23803806112c283398101604081905261002f91610174565b338061005557604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61005e81610124565b50600180546001600160a01b03929092166001600160a01b031992831617815560408051635553444360e01b8152600360048083018290528351602493819003840181208054881673a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48179055635742544360e01b815280820183905284519081900390930183208054909616732260fac5e5542a773aa44fbcfedf7c193bc2c599179095556208aa8960eb1b82528101939093525160239281900392909201909120805460ff191690911790556101a4565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561018657600080fd5b81516001600160a01b038116811461019d57600080fd5b9392505050565b61110f806101b36000396000f3fe6080604052600436106100dd5760003560e01c8063a1c99f431161007f578063df07008911610059578063df07008914610285578063e4478551146102c6578063f1bbf432146102e6578063f2fde38b1461030657600080fd5b8063a1c99f43146101fc578063c334c4dd1461021c578063d745c7631461023c57600080fd5b8063412f818b116100bb578063412f818b1461014a578063715018a614610195578063763d9cc6146101aa5780638da5cb5b146101ca57600080fd5b806316694ec5146100e25780631ee6adae146100f75780632339bb8214610117575b600080fd5b6100f56100f0366004610d5a565b610326565b005b34801561010357600080fd5b506100f5610112366004610d97565b610439565b34801561012357600080fd5b50610137610132366004610df8565b6105d2565b6040519081526020015b60405180910390f35b34801561015657600080fd5b50610185610165366004610d5a565b805160208183018101805160048252928201919093012091525460ff1681565b6040519015158152602001610141565b3480156101a157600080fd5b506100f5610610565b3480156101b657600080fd5b506100f56101c5366004610e46565b610624565b3480156101d657600080fd5b506000546001600160a01b03165b6040516001600160a01b039091168152602001610141565b34801561020857600080fd5b506100f5610217366004610ea2565b610670565b34801561022857600080fd5b506100f5610237366004610d97565b6106ad565b34801561024857600080fd5b50610137610257366004610df8565b6002602090815260009283526040909220815180830184018051928152908401929093019190912091525481565b34801561029157600080fd5b506101e46102a0366004610d5a565b80516020818301810180516003825292820191909301209152546001600160a01b031681565b3480156102d257600080fd5b506100f56102e1366004610d97565b610867565b3480156102f257600080fd5b50610137610301366004610ef4565b610a6b565b34801561031257600080fd5b506100f5610321366004610ef4565b610bfc565b806004816040516103379190610f3a565b9081526040519081900360200190205460ff166103965760405162461bcd60e51b8152602060048201526018602482015277155b9cdd5c1c1bdc9d1959081b985d1a5d9948185cdcd95d60421b60448201526064015b60405180910390fd5b600034116103b65760405162461bcd60e51b815260040161038d90610f56565b336000908152600260205260409081902090513491906103d7908590610f3a565b908152602001604051809103902060008282546103f49190610fb4565b909155505060405133907f4a612be4931c2975b74382c145e85f5b8595a529c4a3d581dcd9e85878cbd56a9061042d9085903490610ff3565b60405180910390a25050565b8160048160405161044a9190610f3a565b9081526040519081900360200190205460ff166104a45760405162461bcd60e51b8152602060048201526018602482015277155b9cdd5c1c1bdc9d1959081b985d1a5d9948185cdcd95d60421b604482015260640161038d565b336000908152600260205260409081902090518391906104c5908690610f3a565b90815260200160405180910390205410156105195760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b604482015260640161038d565b3360009081526002602052604090819020905183919061053a908690610f3a565b908152602001604051809103902060008282546105579190611015565b9091555050604051339083156108fc029084906000818181858888f19350505050158015610589573d6000803e3d6000fd5b50336001600160a01b03167f068a41370a5c5efe4903f2e3bdf4c383988b9a381573a36b0c0c5a5e15ff4dd384846040516105c5929190610ff3565b60405180910390a2505050565b6001600160a01b03821660009081526002602052604080822090516105f8908490610f3a565b90815260200160405180910390205490505b92915050565b610618610c3a565b6106226000610c67565b565b61062c610c3a565b8060038360405161063d9190610f3a565b90815260405190819003602001902080546001600160a01b03929092166001600160a01b03199092169190911790555050565b610678610c3a565b806004836040516106899190610f3a565b908152604051908190036020019020805491151560ff199092169190911790555050565b8160006001600160a01b03166003826040516106c99190610f3a565b908152604051908190036020019020546001600160a01b0316036107295760405162461bcd60e51b8152602060048201526017602482015276155b9cdd5c1c1bdc9d195908115490cc8c08185cdcd95d604a1b604482015260640161038d565b600082116107495760405162461bcd60e51b815260040161038d90610f56565b600060038460405161075b9190610f3a565b908152604051908190036020018120546323b872dd60e01b8252336004830152306024830152604482018590526001600160a01b0316915081906323b872dd906064016020604051808303816000875af11580156107bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e19190611028565b5033600090815260026020526040908190209051849190610803908790610f3a565b908152602001604051809103902060008282546108209190610fb4565b909155505060405133907f4a612be4931c2975b74382c145e85f5b8595a529c4a3d581dcd9e85878cbd56a906108599087908790610ff3565b60405180910390a250505050565b8160006001600160a01b03166003826040516108839190610f3a565b908152604051908190036020019020546001600160a01b0316036108e35760405162461bcd60e51b8152602060048201526017602482015276155b9cdd5c1c1bdc9d195908115490cc8c08185cdcd95d604a1b604482015260640161038d565b33600090815260026020526040908190209051839190610904908690610f3a565b90815260200160405180910390205410156109585760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b604482015260640161038d565b33600090815260026020526040908190209051839190610979908690610f3a565b908152602001604051809103902060008282546109969190611015565b9250508190555060006003846040516109af9190610f3a565b9081526040519081900360200181205463a9059cbb60e01b8252336004830152602482018590526001600160a01b03169150819063a9059cbb906044016020604051808303816000875af1158015610a0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2f9190611028565b50336001600160a01b03167f068a41370a5c5efe4903f2e3bdf4c383988b9a381573a36b0c0c5a5e15ff4dd38585604051610859929190610ff3565b6040805160a081018252600460608201818152635553444360e01b6080840152825282518084018452600381526208aa8960eb1b6020828101919091528084019190915283518085018552918252635742544360e01b90820152918101919091526000908190815b6003811015610bf3576001600160a01b0385166000908152600260205260408120838360038110610b0657610b06611045565b6020020151604051610b189190610f3a565b908152604051908190036020019020546001549091506000906001600160a01b031663524f3889858560038110610b5157610b51611045565b60200201516040518263ffffffff1660e01b8152600401610b72919061105b565b602060405180830381865afa158015610b8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb3919061106e565b9050670de0b6b3a7640000610bc88284611087565b610bd2919061109e565b610bdc9086610fb4565b945050508080610beb906110c0565b915050610ad3565b50909392505050565b610c04610c3a565b6001600160a01b038116610c2e57604051631e4fbdf760e01b81526000600482015260240161038d565b610c3781610c67565b50565b6000546001600160a01b031633146106225760405163118cdaa760e01b815233600482015260240161038d565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610cde57600080fd5b813567ffffffffffffffff80821115610cf957610cf9610cb7565b604051601f8301601f19908116603f01168101908282118183101715610d2157610d21610cb7565b81604052838152866020858801011115610d3a57600080fd5b836020870160208301376000602085830101528094505050505092915050565b600060208284031215610d6c57600080fd5b813567ffffffffffffffff811115610d8357600080fd5b610d8f84828501610ccd565b949350505050565b60008060408385031215610daa57600080fd5b823567ffffffffffffffff811115610dc157600080fd5b610dcd85828601610ccd565b95602094909401359450505050565b80356001600160a01b0381168114610df357600080fd5b919050565b60008060408385031215610e0b57600080fd5b610e1483610ddc565b9150602083013567ffffffffffffffff811115610e3057600080fd5b610e3c85828601610ccd565b9150509250929050565b60008060408385031215610e5957600080fd5b823567ffffffffffffffff811115610e7057600080fd5b610e7c85828601610ccd565b925050610e8b60208401610ddc565b90509250929050565b8015158114610c3757600080fd5b60008060408385031215610eb557600080fd5b823567ffffffffffffffff811115610ecc57600080fd5b610ed885828601610ccd565b9250506020830135610ee981610e94565b809150509250929050565b600060208284031215610f0657600080fd5b610f0f82610ddc565b9392505050565b60005b83811015610f31578181015183820152602001610f19565b50506000910152565b60008251610f4c818460208701610f16565b9190910192915050565b60208082526028908201527f4465706f73697420616d6f756e74206d7573742062652067726561746572207460408201526768616e207a65726f60c01b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b8082018082111561060a5761060a610f9e565b60008151808452610fdf816020860160208601610f16565b601f01601f19169290920160200192915050565b6040815260006110066040830185610fc7565b90508260208301529392505050565b8181038181111561060a5761060a610f9e565b60006020828403121561103a57600080fd5b8151610f0f81610e94565b634e487b7160e01b600052603260045260246000fd5b602081526000610f0f6020830184610fc7565b60006020828403121561108057600080fd5b5051919050565b808202811582820484141761060a5761060a610f9e565b6000826110bb57634e487b7160e01b600052601260045260246000fd5b500490565b6000600182016110d2576110d2610f9e565b506001019056fea26469706673582212205c70deaced598d14dcc3c3bd6de2c4fb73773eaf3a45046a81bd3aa860ba737864736f6c63430008140033";

type CollateralManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CollateralManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CollateralManager__factory extends ContractFactory {
  constructor(...args: CollateralManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _priceOracleAddress: string,
    overrides?: Overrides & { from?: string }
  ): Promise<CollateralManager> {
    return super.deploy(
      _priceOracleAddress,
      overrides || {}
    ) as Promise<CollateralManager>;
  }
  override getDeployTransaction(
    _priceOracleAddress: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(_priceOracleAddress, overrides || {});
  }
  override attach(address: string): CollateralManager {
    return super.attach(address) as CollateralManager;
  }
  override connect(signer: Signer): CollateralManager__factory {
    return super.connect(signer) as CollateralManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CollateralManagerInterface {
    return new utils.Interface(_abi) as CollateralManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CollateralManager {
    return new Contract(address, _abi, signerOrProvider) as CollateralManager;
  }
}

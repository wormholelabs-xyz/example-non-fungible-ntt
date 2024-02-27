/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC20Mock,
  ERC20MockInterface,
} from "../../ERC20Mock.sol/ERC20Mock";

const _abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "DOMAIN_SEPARATOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nonces",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "permit",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "v",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "r",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "s",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;

const _bytecode =
  "0x60e0604090808252346200042c576200105a803803809162000022828562000431565b8339810182828203126200042c5781516001600160401b0393908481116200042c57826200005291850162000455565b92602092838201518681116200042c576200006e920162000455565b835193858511620004165760009480620000898754620004cc565b92601f93848111620003c5575b5086908483116001146200035d57889262000351575b50508160011b916000199060031b1c19161785555b8151908682116200033d578190600193620000dd8554620004cc565b828111620002e8575b50869183116001146200028457879262000278575b5050600019600383901b1c191690821b1781555b60126080524660a052815184549181866200012a85620004cc565b92838352878301958882821691826000146200025857505060011462000218575b506200015a9250038262000431565b519020928151928301937f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8552828401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608401524660808401523060a084015260a0835260c08301948386109086111762000204575083905251902060c052610b5090816200050a82396080518161062a015260a05181610959015260c051816109800152f35b634e487b7160e01b81526041600452602490fd5b8791508880528189209089915b8583106200023f5750506200015a9350820101386200014b565b8054838801850152869450899390920191810162000225565b60ff191688526200015a95151560051b85010192503891506200014b9050565b015190503880620000fb565b8488528688208594509190601f198416895b89828210620002d15750508411620002b7575b505050811b0181556200010f565b015160001960f88460031b161c19169055388080620002a9565b838501518655889790950194938401930162000296565b909192508488528688208380860160051c82019289871062000333575b91869588929594930160051c01915b82811062000324575050620000e6565b8a815586955087910162000314565b9250819262000305565b634e487b7160e01b86526041600452602486fd5b015190503880620000ac565b8880528789209250601f198416895b89828210620003ae57505090846001959493921062000394575b505050811b018555620000c1565b015160001960f88460031b161c1916905538808062000386565b60018596829396860151815501950193016200036c565b9091508780528688208480850160051c8201928986106200040c575b9085949392910160051c01905b818110620003fd575062000096565b898155849350600101620003ee565b92508192620003e1565b634e487b7160e01b600052604160045260246000fd5b600080fd5b601f909101601f19168101906001600160401b038211908210176200041657604052565b919080601f840112156200042c578251906001600160401b03821162000416576040519160209162000491601f8301601f191684018562000431565b8184528282870101116200042c5760005b818110620004b857508260009394955001015290565b8581018301518482018401528201620004a2565b90600182811c92168015620004fe575b6020831014620004e857565b634e487b7160e01b600052602260045260246000fd5b91607f1691620004dc56fe6080604081815260048036101561001557600080fd5b600092833560e01c90816306fdde031461079f57508063095ea7b31461073157806318160ddd1461071257806323b872dd1461064e578063313ce567146106105780633644e515146105ec57806340c10f191461057157806370a08231146105395780637ecebe001461050157806395d89b4114610422578381639dc29fac146103c057508063a9059cbb1461034e578063d505accf1461010a5763dd62ed3e146100bf57600080fd5b3461010657816003193601126101065760209282916100dc610900565b6100e461091b565b6001600160a01b03918216845291865283832091168252845220549051908152f35b8280fd5b5091903461034a5760e036600319011261034a57610126610900565b9061012f61091b565b91604435606435926084359260ff84168094036103465742851061030357610155610954565b9560018060a01b038092169586895260209560058752848a209889549960018b01905585519285898501957f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c987528b89870152169a8b606086015288608086015260a085015260c084015260c0835260e0830167ffffffffffffffff94848210868311176102ef578188528451902061010085019261190160f01b845261010286015261012285015260428152610160840194818610908611176102dc57848752519020835261018082015260a4356101a082015260c4356101c0909101528780528490889060809060015afa156102d25786511696871515806102c9575b156102975786977f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259596975283528087208688528352818188205551908152a380f35b83606492519162461bcd60e51b8352820152600e60248201526d24a72b20a624a22fa9a4a3a722a960911b6044820152fd5b50848814610254565b81513d88823e3d90fd5b634e487b7160e01b8c5260418d5260248cfd5b50634e487b7160e01b8c5260418d5260248cfd5b815162461bcd60e51b81526020818a0152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152606490fd5b8680fd5b5080fd5b50503461034a578060031936011261034a5760209161036b610900565b826024359133845260038652818420610385848254610931565b90556001600160a01b031680845260038652922080548201905582519081523390600080516020610afb833981519152908590a35160018152f35b80843461041f578060031936011261041f57600080516020610afb83398151915260206103eb610900565b6024359060018060a01b0316938486526003835280862061040d838254610931565b9055816002540360025551908152a380f35b50fd5b50503461034a578160031936011261034a5780519082600180549161044683610845565b808652928281169081156104d9575060011461047d575b50505061046f8261047994038361087f565b51918291826108b7565b0390f35b94508085527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf65b8286106104c15750505061046f826020610479958201019461045d565b805460208787018101919091529095019481016104a4565b61047997508693506020925061046f94915060ff191682840152151560051b8201019461045d565b50503461034a57602036600319011261034a5760209181906001600160a01b03610529610900565b1681526005845220549051908152f35b50503461034a57602036600319011261034a5760209181906001600160a01b03610561610900565b1681526003845220549051908152f35b503461010657816003193601126101065761058a610900565b60243591600254908382018092116105d957506002556001600160a01b0316808452600360209081528385208054840190559251918252918391600080516020610afb8339815191529190a380f35b634e487b7160e01b865260119052602485fd5b50503461034a578160031936011261034a57602090610609610954565b9051908152f35b50503461034a578160031936011261034a576020905160ff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b50913461070f57606036600319011261070f57610669610900565b600080516020610afb83398151915261068061091b565b6001600160a01b03928316808552602087815286862033875281528686205490979194889360443593899385600182016106ec575b505050868852600385528288206106cd858254610931565b9055169586815260038452208181540190558551908152a35160018152f35b6106f591610931565b90888a528652838920338a528652838920553880856106b5565b80fd5b50503461034a578160031936011261034a576020906002549051908152f35b503461010657816003193601126101065760209261074d610900565b918360243592839233825287528181209460018060a01b0316948582528752205582519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925843392a35160018152f35b849084346101065782600319360112610106578280546107be81610845565b808552916001918083169081156104d957506001146107e95750505061046f8261047994038361087f565b80809650527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5635b82861061082d5750505061046f826020610479958201019461045d565b80546020878701810191909152909501948101610810565b90600182811c92168015610875575b602083101461085f57565b634e487b7160e01b600052602260045260246000fd5b91607f1691610854565b90601f8019910116810190811067ffffffffffffffff8211176108a157604052565b634e487b7160e01b600052604160045260246000fd5b6020808252825181830181905290939260005b8281106108ec57505060409293506000838284010152601f8019910116010190565b8181018601518482016040015285016108ca565b600435906001600160a01b038216820361091657565b600080fd5b602435906001600160a01b038216820361091657565b9190820391821161093e57565b634e487b7160e01b600052601160045260246000fd5b6000467f0000000000000000000000000000000000000000000000000000000000000000036109a257507f000000000000000000000000000000000000000000000000000000000000000090565b604051815482916109b282610845565b8082528160209485820194600190878282169182600014610adc575050600114610a83575b506109e49250038261087f565b51902091604051918201927f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f845260408301527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608301524660808301523060a083015260a0825260c082019082821067ffffffffffffffff831117610a6f575060405251902090565b634e487b7160e01b81526041600452602490fd5b87805286915087907f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5635b858310610ac45750506109e49350820101386109d7565b80548388018501528694508893909201918101610aad565b60ff191688526109e495151560051b85010192503891506109d7905056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220b466c17f28bc7766a45d07412ab4d6480511cf512f375f60305be9bd35ef3d8f64736f6c63430008130033";

type ERC20MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Mock__factory extends ContractFactory {
  constructor(...args: ERC20MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ERC20Mock> {
    return super.deploy(name, symbol, overrides || {}) as Promise<ERC20Mock>;
  }
  override getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override attach(address: string): ERC20Mock {
    return super.attach(address) as ERC20Mock;
  }
  override connect(signer: Signer): ERC20Mock__factory {
    return super.connect(signer) as ERC20Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20MockInterface {
    return new utils.Interface(_abi) as ERC20MockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20Mock {
    return new Contract(address, _abi, signerOrProvider) as ERC20Mock;
  }
}
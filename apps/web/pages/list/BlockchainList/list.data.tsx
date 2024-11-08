export interface Subnet {
  id: string;
  name: string;
  settings: {
    rpcUrl: string;
    chainId: number;
    // другие настройки
  };
}

export interface Blockchain {
  id: string;
  name: string;
  icon?: string;
  subnets: Subnet[];
}

export const blockchainData: Blockchain[] = [
  {
    id: "1",
    name: "Ethereum",
    subnets: [
      {
        id: "1-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://mainnet.infura.io/v3/", chainId: 1 },
      },
      {
        id: "1-2",
        name: "Sepolia",
        settings: { rpcUrl: "https://sepolia.infura.io/v3/", chainId: 11155111 },
      },
      {
        id: "1-3",
        name: "Goerli",
        settings: { rpcUrl: "https://goerli.infura.io/v3/", chainId: 5 },
      },
    ],
  },
  {
    id: "2",
    name: "Polygon",
    subnets: [
      {
        id: "2-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://polygon-rpc.com", chainId: 137 },
      },
      {
        id: "2-2",
        name: "Mumbai",
        settings: { rpcUrl: "https://rpc-mumbai.maticvigil.com", chainId: 80001 },
      },
    ],
  },
  {
    id: "3",
    name: "Binance Smart Chain",
    subnets: [
      {
        id: "3-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://bsc-dataseed.binance.org", chainId: 56 },
      },
      {
        id: "3-2",
        name: "Testnet",
        settings: { rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545", chainId: 97 },
      },
    ],
  },
  {
    id: "4",
    name: "Avalanche",
    subnets: [
      {
        id: "4-1",
        name: "C-Chain",
        settings: { rpcUrl: "https://api.avax.network/ext/bc/C/rpc", chainId: 43114 },
      },
      {
        id: "4-2",
        name: "Fuji",
        settings: { rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc", chainId: 43113 },
      },
    ],
  },
  {
    id: "5",
    name: "Arbitrum",
    subnets: [
      {
        id: "5-1",
        name: "One Mainnet",
        settings: { rpcUrl: "https://arb1.arbitrum.io/rpc", chainId: 42161 },
      },
      {
        id: "5-2",
        name: "Nova",
        settings: { rpcUrl: "https://nova.arbitrum.io/rpc", chainId: 42170 },
      },
    ],
  },
  {
    id: "6",
    name: "Optimism",
    subnets: [
      {
        id: "6-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://mainnet.optimism.io", chainId: 10 },
      },
      {
        id: "6-2",
        name: "Goerli",
        settings: { rpcUrl: "https://goerli.optimism.io", chainId: 420 },
      },
    ],
  },
  {
    id: "7",
    name: "Fantom",
    subnets: [
      {
        id: "7-1",
        name: "Opera Mainnet",
        settings: { rpcUrl: "https://rpc.ftm.tools", chainId: 250 },
      },
      {
        id: "7-2",
        name: "Testnet",
        settings: { rpcUrl: "https://rpc.testnet.fantom.network", chainId: 4002 },
      },
    ],
  },
  {
    id: "8",
    name: "Solana",
    subnets: [
      {
        id: "8-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://api.mainnet-beta.solana.com", chainId: 1 },
      },
      {
        id: "8-2",
        name: "Testnet",
        settings: { rpcUrl: "https://api.testnet.solana.com", chainId: 2 },
      },
    ],
  },
  {
    id: "9",
    name: "Cronos",
    subnets: [
      {
        id: "9-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://evm.cronos.org", chainId: 25 },
      },
      {
        id: "9-2",
        name: "Testnet",
        settings: { rpcUrl: "https://evm-t3.cronos.org", chainId: 338 },
      },
    ],
  },
  {
    id: "10",
    name: "Moonbeam",
    subnets: [
      {
        id: "10-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://rpc.api.moonbeam.network", chainId: 1284 },
      },
      {
        id: "10-2",
        name: "Moonriver",
        settings: { rpcUrl: "https://rpc.api.moonriver.moonbeam.network", chainId: 1285 },
      },
    ],
  },
  {
    id: "11",
    name: "Harmony",
    subnets: [
      {
        id: "11-1",
        name: "Mainnet Shard 0",
        settings: { rpcUrl: "https://api.harmony.one", chainId: 1666600000 },
      },
      {
        id: "11-2",
        name: "Testnet Shard 0",
        settings: { rpcUrl: "https://api.s0.b.hmny.io", chainId: 1666700000 },
      },
    ],
  },
  {
    id: "12",
    name: "Aurora",
    subnets: [
      {
        id: "12-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://mainnet.aurora.dev", chainId: 1313161554 },
      },
      {
        id: "12-2",
        name: "Testnet",
        settings: { rpcUrl: "https://testnet.aurora.dev", chainId: 1313161555 },
      },
    ],
  },
  {
    id: "13",
    name: "Celo",
    subnets: [
      {
        id: "13-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://forno.celo.org", chainId: 42220 },
      },
      {
        id: "13-2",
        name: "Alfajores Testnet",
        settings: { rpcUrl: "https://alfajores-forno.celo-testnet.org", chainId: 44787 },
      },
    ],
  },
  {
    id: "14",
    name: "Gnosis Chain",
    subnets: [
      {
        id: "14-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://rpc.gnosischain.com", chainId: 100 },
      },
      {
        id: "14-2",
        name: "Chiado Testnet",
        settings: { rpcUrl: "https://rpc.chiadochain.net", chainId: 10200 },
      },
    ],
  },
  {
    id: "15",
    name: "Klaytn",
    subnets: [
      {
        id: "15-1",
        name: "Cypress",
        settings: { rpcUrl: "https://public-node-api.klaytnapi.com/v1/cypress", chainId: 8217 },
      },
      {
        id: "15-2",
        name: "Baobab",
        settings: { rpcUrl: "https://public-node-api.klaytnapi.com/v1/baobab", chainId: 1001 },
      },
    ],
  },
  {
    id: "16",
    name: "Metis",
    subnets: [
      {
        id: "16-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://andromeda.metis.io/?owner=1088", chainId: 1088 },
      },
      {
        id: "16-2",
        name: "Stardust Testnet",
        settings: { rpcUrl: "https://stardust.metis.io/?owner=588", chainId: 588 },
      },
    ],
  },
  {
    id: "17",
    name: "IoTeX",
    subnets: [
      {
        id: "17-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://babel-api.mainnet.iotex.io", chainId: 4689 },
      },
      {
        id: "17-2",
        name: "Testnet",
        settings: { rpcUrl: "https://babel-api.testnet.iotex.io", chainId: 4690 },
      },
    ],
  },
  {
    id: "18",
    name: "OKXChain",
    subnets: [
      {
        id: "18-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://exchainrpc.okex.org", chainId: 66 },
      },
      {
        id: "18-2",
        name: "Testnet",
        settings: { rpcUrl: "https://exchaintestrpc.okex.org", chainId: 65 },
      },
    ],
  },
  {
    id: "19",
    name: "Conflux",
    subnets: [
      {
        id: "19-1",
        name: "eSpace",
        settings: { rpcUrl: "https://evm.confluxrpc.com", chainId: 1030 },
      },
      {
        id: "19-2",
        name: "Testnet",
        settings: { rpcUrl: "https://evmtestnet.confluxrpc.com", chainId: 71 },
      },
    ],
  },
  {
    id: "20",
    name: "Evmos",
    subnets: [
      {
        id: "20-1",
        name: "Mainnet",
        settings: { rpcUrl: "https://eth.bd.evmos.org:8545", chainId: 9001 },
      },
      {
        id: "20-2",
        name: "Testnet",
        settings: { rpcUrl: "https://eth.bd.evmos.dev:8545", chainId: 9000 },
      },
    ],
  },
];

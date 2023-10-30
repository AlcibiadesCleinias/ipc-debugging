import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import { config as dotEnvConfig } from "dotenv"
// To work with coverage.
import "solidity-coverage"
// To work with eth-gas-reporter.
import "hardhat-gas-reporter"
// To load all available tasks you should it via manual import.
// Thus, we imported index.ts of the ./tasks module.
import "./tasks"
// Enable deploy.
import "hardhat-deploy";

dotEnvConfig();

const DEFAULT_GAS_PRICE = 100_000_000_000
const PRIVATE_KEYS = process.env?.["PRIVATE_KEY"] ? [process.env?.["PRIVATE_KEY"]] : undefined


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
      ipcsubnet: {
          url: 'http://139.162.187.214:8545',
          accounts: PRIVATE_KEYS,
          chainId: 1404213532111849,
      },
      calibration: {  // Currently this network is use only for debugging.
          url: 'https://api.calibration.node.glif.io/rpc/v1',
          accounts: PRIVATE_KEYS,
          chainId: 314159,
          timeout: 1000000,  // recommended by IPC team.
      },
    testnet: {
      url: process.env["TESTNET_RPC"] ?? "",
      accounts: PRIVATE_KEYS,
      chainId: 80001,
      gasPrice: DEFAULT_GAS_PRICE,
    },
    testnetSepolia: {
      url: process.env["TESTNET_SEPOLIA_RPC"] ?? "",
      accounts: PRIVATE_KEYS,
      chainId: 11155111,
      gasPrice: DEFAULT_GAS_PRICE,
    },
    testnetMumbai: {
      url: process.env["TESTNET_MUMBAI_RPC"] ?? "",
      accounts: PRIVATE_KEYS,
      chainId: 80001,
      gasPrice: DEFAULT_GAS_PRICE,
    },
    // For the Hardhat dev node.
    hardhatDevNode: {
      url: process.env["HARDHAT_DEV_NODE_RPC"] ?? "",
      accounts: process.env?.["HARDHAT_DEV_NODE_PRIVATE_KEY"] ? [process.env?.["HARDHAT_DEV_NODE_PRIVATE_KEY"]] : undefined,
      chainId: 31337,
      gasPrice: DEFAULT_GAS_PRICE,
    },
  },
  gasReporter: {
    enabled: !!(process.env.REPORT_GAS),
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
};

export default config;


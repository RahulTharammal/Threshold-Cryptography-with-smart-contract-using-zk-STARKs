import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  paths: {
    root: "./contracts/",
  },
  abiExporter: {
    path: "./abi",
    clear: true,
    flat: true,
    only: ["zkSDTKG"],
  },
  solidity: "0.8.4",
};

export default config;

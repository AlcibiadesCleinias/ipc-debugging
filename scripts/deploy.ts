// @deprecated
// With hardhat-deploy lib this script should be deprecated, since the lib does all
//  that script does but in more organised manner.

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

import {artifacts, ethers, network} from "hardhat";
import * as path from "path";
import {Token} from "../typechain-types";
import {asyncRuntimeDecorator} from "./utils/asyncRuntimeDecorator";

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy() as Token;
  await token.deployed();

  console.log("Token address:", token.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const contractAddressFile = 'contract-address.json'
  console.log("Write contract address to " + contractAddressFile + "...")
  fs.writeFileSync(
    path.join(contractsDir, contractAddressFile),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  const contractArtifactsFile = 'Token.json'
  console.log("Write contract artifacts to " + contractArtifactsFile + "...")
  fs.writeFileSync(
    path.join(contractsDir, contractArtifactsFile),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

asyncRuntimeDecorator(main)

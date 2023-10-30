import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";

// This file is only here to make interacting with the Dapp easier,
// feel free to ignore it if you don't need it.


type Args = {
    // receiver: string;
};

task("check", "TODO")
  .setAction(async (args: Args, hre: HardhatRuntimeEnvironment) => {
    const tokenAddress = (await hre.deployments.get('Token')).address;

    const token = await hre.ethers.getContractAt("Token", tokenAddress);
    const [sender] = await hre.ethers.getSigners();


    console.log('owner is', await token.owner())
    // await tx.wait();
  });

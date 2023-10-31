import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {getEIP1559Args} from "../scripts/utils/transactions";

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

    const _args = await getEIP1559Args(hre.ethers.provider)

    console.log('owner is', await token.owner({..._args}))
    // await tx.wait();
  });

import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

import {ethers} from "ethers";
import {getEIP1559Args} from "../scripts/utils/transactions";

const WAIT_CONFIRMATIONS = process.env["WAIT_CONFIRMATIONS"] ? parseInt(<string>process.env["WAIT_CONFIRMATIONS"]) : 0;

export const DEFAULT_HARDHAT_DEPLOY_TX_ARGUMENTS = {
    log: true,
    autoMine: true,  // To speed deployment on test network.
    waitConfirmations: WAIT_CONFIRMATIONS,
}

export async function getEIP1559AndHardhatDeployTxArgs(hreProvider: ethers.Provider | any) {
    const eip1559FeeArgs = await getEIP1559Args(hreProvider)
    return {
        ...DEFAULT_HARDHAT_DEPLOY_TX_ARGUMENTS,
        ...eip1559FeeArgs,
    }
}


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const {deployments, getNamedAccounts} = hre;
	const {deploy} = deployments;

	const EIP1559AndHardhatDeployTxArgs = await getEIP1559AndHardhatDeployTxArgs(hre.ethers.provider)

	const {deployer} = await getNamedAccounts();

	await deploy('Token', {
		from: deployer,
		log: true,
		autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
		...EIP1559AndHardhatDeployTxArgs
	});
};

export default func;
func.tags = ['Token'];

import { utils, BigNumber } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useEthers, useCall } from "@usedapp/core";
import map from "../../build/deployments/map.json";
import OpsNFTKovan from "../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"

const CallOpsNFT = (functionName, args) => {

    const { chainId } = useEthers() ?? 42
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);

    let { value, error } = useCall({
        contract: contract,
        method: functionName,
        args: args
    }) ?? {}
    if(error) {
        console.error("error in CallOpsNFT: ", error.message)
        return undefined
    }

    return value ? value : undefined
}
export default CallOpsNFT;
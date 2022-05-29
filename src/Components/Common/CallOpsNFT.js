import { utils, BigNumber } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useEthers, useCall, useContractFunction } from "@usedapp/core";
import map from "../../build/deployments/map.json";
import OpsNFTRinkeby from "../../build/deployments/4/0x869989d09bE0C9CB96eEcf70f1ae92f3aD450ad6.json"
import OpsNFTKovan from "../../build/deployments/42/0x871DF91D90bccE579A3e7A93f1a6142c2C5Bc14E.json"

const CallOpsNFT = (functionName, args) => {

    const { chainId } = useEthers() ?? 42
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[42]["OpsNFT"][0]
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
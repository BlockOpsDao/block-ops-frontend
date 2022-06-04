import { utils } from 'ethers'
import { useContractFunction } from '@usedapp/core'
import CallOpsNFT from "./CallOpsNFT";

import { Contract } from '@ethersproject/contracts'
import { useEthers, shortenAddress, useLookupAddress, useEtherBalance } from '@usedapp/core';
import map from "../../build/deployments/map.json";
import OpsNFTKovan from "../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"

const GetTotalAmountOfEth = () => {
    const { account, chainId } = useEthers()
    const ens = useLookupAddress()
    const etherBalance = useEtherBalance(account)
    const etherBalanceDefined = etherBalance !== undefined


    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);

    // const OpsNFT = LoadOpsNFT();
    const { state, send } = useContractFunction(
        contract, 
        'getTotalBountyAmount',
    )
    const { status } = state
    const runGetTotalBountyAmount = () => {
        void send({"value": 0})
    }
    console.log('status: ', status)



    return (<div>
        <button className="btn btn-primary" onClick={() => runGetTotalBountyAmount()}>getTotalBountyAmount</button>
        <p>Status: {status}</p>
    </div>)
}
export default GetTotalAmountOfEth;
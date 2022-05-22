import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction } from "@usedapp/core";
import map from "../../build/deployments/map.json";
import OpsNFTKovan from "../../build/deployments/42/0x072Cc7F9aBb95780fE3B4Fa4f0333DDf22308E98.json"
import { Icon } from '@iconify/react';
import DisplayNFT from './DisplayNFT';
import { useState, useEffect } from 'react';
import { AnalyticEventTracker } from './AnalyticEventTracker';

const ListProjects = () => {
    const gaEventTracker = AnalyticEventTracker("ListProjects")
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[42]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state: totalSupplyState, send: totalSupplySend } = useContractFunction(contract, 'totalSupply')
    const { status: totalSupplyStatus } = totalSupplyState

    const [totalSupply, setTotalSupply] = useState();

    useEffect(() => {
        // call api or anything
        totalSupplySend()

     });

    return (
        <>
        {totalSupplyState ? 
            <h1>Total Supply: Found</h1> :
            <h1>totalSupplyStatus: {totalSupplyStatus}</h1>
        }
        </>
        // {totalSupplyStatus
        //     ? <h1>totalSupply: {totalSupplyStatus} </h1> 
        //     : <h1>Still PendingSignature...</h1>}
    )

}
export default ListProjects;
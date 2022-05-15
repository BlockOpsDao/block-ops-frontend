import { utils } from 'ethers'
import { useContractFunction } from '@usedapp/core'
import CallOpsNFT from "./CallOpsNFT";

import { Contract } from '@ethersproject/contracts'
import { useEthers, shortenAddress, useLookupAddress, useEtherBalance } from '@usedapp/core';
import map from "../../build/deployments/map.json";
import OpsNFTRinkeby from "../../build/deployments/4/0x869989d09bE0C9CB96eEcf70f1ae92f3aD450ad6.json"

const GetTotalAmountOfEth = () => {
    const { account } = useEthers()
    const ens = useLookupAddress()
    const etherBalance = useEtherBalance(account)
    const etherBalanceDefined = etherBalance !== undefined


    const abi = OpsNFTRinkeby['abi']
    const opsNFTContractAddress = map[4]["OpsNFT"][0]
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
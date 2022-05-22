import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction } from "@usedapp/core";
import map from "../../../build/deployments/map.json";
import OpsNFTKovan from "../../../build/deployments/42/0x072Cc7F9aBb95780fE3B4Fa4f0333DDf22308E98.json"
import { Icon } from '@iconify/react';
import DisplayNFT from '../../../Components/Common/DisplayNFT';


const ListProjects = () => {

    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[42]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state, send, events } = useContractFunction(contract, 'safeMint')
    const { status, receipt } = state
}
export default ListProjects;
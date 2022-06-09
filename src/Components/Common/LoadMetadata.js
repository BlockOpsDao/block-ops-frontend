import React, { useState, useEffect } from 'react';
import CallOpsNFT from '../../Components/Common/CallOpsNFT';
import { useEthers, useCalls } from "@usedapp/core";
import { Contract } from '@ethersproject/contracts'
import map from "../../build/deployments/map.json"
import OpsNFTKovan from "../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"
import { utils } from 'ethers'
import DOMPurify from "dompurify";


const LoadMetadata = () => {

    const { chainId } = useEthers();
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);

    const totalSupply = CallOpsNFT("totalSupply") ?? undefined
    const [arrayOfTokenIds, setArrayOfTokenIds] = useState();
    const calls = arrayOfTokenIds?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'tokenDetails',
        args: [e]
      })) ?? []
    const results = useCalls(calls) ?? []

    const [tokenMetadata, setTokenMetadata] = useState([]);
    const tmpTokenMetadata = []

    async function fetchFromIPFS(ipfsMetadata) {
        let response = await fetch(ipfsMetadata, {headers: {'Accept': 'application/json'}});
        let data = await response.json();
        if (data !== undefined) {
            return [
                data['name'], 
                DOMPurify.sanitize(data["description"], { USE_PROFILES: { html: true } }),
                data['properties']['priority'], 
                data['properties']['skills'],
                data['properties']['deadline'],
                data['image'] !== undefined ? data["image"].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/") : "https://block-ops.infura-ipfs.io/ipfs/bafkreieybp7cct3rtlgeiy2gz5duzq65pgsxlgspbmajcvsnj7etlsls6u"
            ]
        }
    }

    useEffect(() => {
        
        if (totalSupply !== undefined) {
            if (totalSupply[0].toNumber() > 0) {
                let tmpArrayOfTokenIds = [];
                for (let i = 0; i < totalSupply[0].toNumber(); i++) {
                    tmpArrayOfTokenIds.push(i);
                }
                setArrayOfTokenIds(tmpArrayOfTokenIds);
            }
        }

        const loadTokenMetadata = () => {
            results.forEach(async function(result, idx) {
                if(result && result.error) {
                    console.error(`Error encountered calling 'tokenDetails' on ${calls[idx]?.contract.address}: ${result.error.message}`)
                } else {
                    let tmpResult = Object.assign([], result.value)
                    if (tmpResult !== undefined) {
                        
                        tmpResult.push(result.value[1].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/"))
                        let ipfsResults = await fetchFromIPFS(result.value[1].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/"))
                        ipfsResults.forEach(function(r) { 
                            tmpResult.push(r)
                        })
                        tmpTokenMetadata.push(tmpResult)
                    }
                }
            })
            setTokenMetadata(tmpTokenMetadata)
        }
        if (tokenMetadata.length === 0) {
            loadTokenMetadata()
        } 
    }, [totalSupply]);    

    return tokenMetadata;
}

export default LoadMetadata;
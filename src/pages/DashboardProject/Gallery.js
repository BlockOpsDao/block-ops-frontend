import React, { useEffect, useState } from 'react';
import LoadTokenMetadataById from "../../Components/Common/LoadTokenMetadataById"
import DisplayNFTWOCalling from "../../Components/Common/DisplayNFTWoCalling"
import CallOpsNFT from '../../Components/Common/CallOpsNFT';

import { utils } from 'ethers'
import { useEthers, useCalls } from "@usedapp/core";
import { Contract } from '@ethersproject/contracts'
import map from "../../build/deployments/map.json"
import OpsNFTKovan from "../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"

const Gallery = () => {
    const tokenMetadataById = LoadTokenMetadataById()
    const [arrayOfTokenIds, setArrayOfTokenIds] = useState();
    const [tokensToDisplay, setTokensToDisplay] = useState();

    const { account, chainId } = useEthers();
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);

    const arrayOfTokenIdsWithUserSubmission = CallOpsNFT("getTokenIdsWithSubmissionsFromAddress", [account]) ?? undefined

    const calls = arrayOfTokenIds?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'getWinningSubmissionForTokenId',
        args: [e]
      })) ?? []
    const results = useCalls(calls) ?? []

    useEffect(() => {
        if (arrayOfTokenIdsWithUserSubmission !== undefined) {
            if (arrayOfTokenIds === undefined) {
                let tmpArrayOfTokenIds = []
                arrayOfTokenIdsWithUserSubmission[0].map((e) => tmpArrayOfTokenIds.push(e.toNumber()))
                setArrayOfTokenIds(tmpArrayOfTokenIds)
            }
            // let tmpArrayOfTokenIds = []
            // for (const [key, value] of Object.entries(tokenMetadataById)) {
            //     if (value[''])
            // }
        }

        if (results.length > 0) {
            let tmpTokensToDisplay = []
            results.map(function(res, idx) {
                console.log("idx: ", idx)
                console.log("res: ", res)
                if (res !== undefined) {
                    let submitter = res.value[0][0]
                    console.log(submitter)
                    if (account === submitter) {
                        tmpTokensToDisplay.push()
                    }
                }
            })
        }

    }, [arrayOfTokenIdsWithUserSubmission, results]);
    

}
export default Gallery;
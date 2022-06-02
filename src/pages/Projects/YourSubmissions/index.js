import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
//Import Flatepicker
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers, useCalls } from "@usedapp/core";
import map from "../../../build/deployments/map.json";
import OpsNFTKovan from "../../../build/deployments/42/0xD35f33b91cBAf07f1409bc88E5c04256eDdEE955.json"
import CallOpsNFT from '../../../Components/Common/CallOpsNFT';
import DOMPurify from "dompurify";
import DisplayNFTWoCalling from '../../../Components/Common/DisplayNFTWoCalling';
import TweetSubmission from '../../../Components/Common/TweetSubmission';

const YourSubmissions = () => {

document.title="Your Submissions | Block Ops";

    const { account, chainId } = useEthers();
    const arrayOfSubmissions = CallOpsNFT("getTokenIdsWithSubmissionsFromAddress", [account]) ?? undefined
    const [uniqueArrayOfSubmissions, setUniqueArrayOfSubmissions] = useState();
    const [submissionMetadata, setSubmissionMetadata] = useState([]);
    const tmpSubmissionMetadata = useState();

    const totalSupply = CallOpsNFT("totalSupply") ?? undefined

    const calls = uniqueArrayOfSubmissions?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'getSubmissionsFromAddressForTokenId',
        args: [e]
      })) ?? []
    const results = useCalls(calls) ?? []

    useEffect(() => {
        
        if (arrayOfSubmissions !== undefined & arrayOfSubmissions.length > 0) {
            let tmpArrayOfTokenIds = [];
            for (let i = 0; i < arrayOfSubmissions.length; i++) {
                if (!tmpArrayOfTokenIds.includes(arrayOfSubmissions[i])) {
                    tmpArrayOfTokenIds.push(i);
                }
            }
            setUniqueArrayOfSubmissions(tmpArrayOfTokenIds);
        }

        const loadSubmissions = () => {
            results.forEach(function(result, idx) {
                if(result && result.error) {
                    console.error(`Error encountered calling 'tokenDetails' on ${calls[idx]?.contract.address}: ${result.error.message}`)
                } else {
                    let tmpResult = Object.assign([], result.value)
                    if (tmpResult !== undefined) {
                        console.log("tmpResult: ", tmpResult)
                        tmpSubmissionMetadata.push(tmpResult)
                    }
                }
            })
            setSubmissionMetadata(tmpSubmissionMetadata)
        }
        if (submissionMetadata.length === 0) {
            loadSubmissions()
        }
        
    }, [totalSupply]);    

}
export default YourSubmissions;
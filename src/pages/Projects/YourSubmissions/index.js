import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Table } from 'reactstrap';
//Import Flatepicker
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers, useCalls, shortenAddress } from "@usedapp/core";
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
    const [submissionMetadata, setSubmissionMetadata] = useState();
    const tmpSubmissionMetadata = [];
    const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>

    const [submissionTable, setSubmissionTable] = useState();

    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);

    const calls = uniqueArrayOfSubmissions?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'getSubmissionsFromAddressForTokenId',
        args: e
    })) ?? []
    
    
    const results = useCalls(calls) ?? []

    useEffect(() => {
        
        if (arrayOfSubmissions !== undefined) {

            if (arrayOfSubmissions.length > 0) {
                let tmpArrayOfTokenIds = [];
                for (let i = 0; i < arrayOfSubmissions.length; i++) {
                    if (!tmpArrayOfTokenIds.includes(arrayOfSubmissions[i])) {
                        tmpArrayOfTokenIds.push([account, i]);
                    }
                }
                setUniqueArrayOfSubmissions(tmpArrayOfTokenIds);
            }
        }

        const loadSubmissions = () => {
            results.forEach(function(result, idx) {
                if(result && result.error) {
                    console.error(`Error encountered calling 'tokenDetails' on ${calls[idx]?.contract.address}: ${result.error.message}`)
                } else {
                    result.value[0].map(function(result2, jdx) {
                        if(result2 && result2.error) {
                            console.error(`Error encountered calling 'tokenDetails' on ${calls[idx]?.contract.address}: ${result2.error.message}`)
                        } else {
                            let tmpResult = Object.assign([], result2)
                            let addr = tmpResult[0]
                            let ipfs = tmpResult[1].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/")
                            tmpSubmissionMetadata.push([addr, ipfs])
                        }
                    })
                }
            })
            if (tmpSubmissionMetadata.length !== 0) {
                setSubmissionMetadata(tmpSubmissionMetadata)
            }
        }
        
        if (submissionMetadata === undefined) {
            loadSubmissions()
        }

        let tmpSubmissionsTable = submissionMetadata?.map((row, idx) => {
            let key = "my-submissions-table-" + idx
            return (
                <tr key={key}>
                    <th scope="row">{row ? idx : <></>}</th>
                    <td>{row ? row[0] : <></>}</td>
                    <td>{row ? <a className='text text-danger' href={row[1]}>Link To Submission</a> : <></>}</td>
                </tr>
            )
        })
        setSubmissionTable(tmpSubmissionsTable)

    }, [arrayOfSubmissions]);    

    return (
    <React.Fragment>
    <div className="page-content">
    <Container fluid>
        <Row>
            <Col sm={12}>
                <h1>{shortenAddress(account)}'s Submissions</h1>
            </Col>
        </Row>
        <Row>
            <Container>
                <Row>
                    <Col sm={12}>
                    {submissionTable !== undefined ? <>
                        <Table striped size="md" hover={true} responsive={true}>
                            <thead><tr>
                                <th>Submission #</th>    
                                <th>Submitter</th>
                                <th>IPFS</th>
                            </tr></thead>

                            <tbody>{submissionTable}</tbody>
                        </Table>
                    </> : loadingIcon}
                    </Col>
                </Row>
            </Container>
        </Row>
    </Container>
    </div>
    </React.Fragment>
    )

}
export default YourSubmissions;
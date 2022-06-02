import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers, useCalls } from "@usedapp/core";
import map from "../../../build/deployments/map.json";
import OpsNFTKovan from "../../../build/deployments/42/0xa35cb87Fdd3c0DF1B103247381097E540304f985.json"
import { Icon } from '@iconify/react';
import DisplayNFT from "../../../Components/Common/DisplayNFT";
import CallOpsNFT from '../../../Components/Common/CallOpsNFT';
import DOMPurify from "dompurify";
import DisplayNFTWoCalling from '../../../Components/Common/DisplayNFTWoCalling';

const SubmitSolution = () => {

document.title="Submit Solution | Block Ops";
   
    const { chainId } = useEthers();
    const [additionalInstructions, setAdditionalInstructions] = useState("");
    const [zipFile, setZipFile] = useState(null);
    const [ipfsResponse, setIpfsResponse] = useState(null);
    const [submitButtonState, setSubmitButtonState] = useState("ready");

    const [nftMintedOwner, setNftMintedOwner] = useState();
    const [nftMintedMetadata, setNftMintedMetadata] = useState();
    const [nftMintedValue, setNftMintedValue] = useState();
    const [nftMintedTokenId, setNftMintedTokenId] = useState(null);
    const [eventTableFinished, setEventTableFinished] = useState(false);

    const ipfsDefined = ipfsResponse !== null
    const zipFileDefined = zipFile !== null

    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state, send, resetState } = useContractFunction(contract, 'makeSubmission')
    const { status, receipt } = state

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
    const [selectedTokenId, setSelectedTokenId] = useState();

    const tokenOwner = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][0] : undefined) : undefined

    const tokenMetadataURI = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][1] : undefined) : undefined

    const tokenBounty = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? utils.formatEther(tokenMetadata[Number(selectedTokenId)][2]) : undefined) : undefined

    const tokenCreator = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][3] : undefined) : undefined

    const nftTokenId = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? Number(utils.formatEther(tokenMetadata[Number(selectedTokenId)][4])) : undefined) : undefined

    const projectState = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][5] : undefined) : undefined

    const projectSubmissions = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][6] : undefined) : undefined

    const projectName = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][8] : undefined) : undefined

    const projectDescription = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][9] : undefined) : undefined

    const projectPriority = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][10] : undefined) : undefined

    const projectSkills = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][11] : undefined) : undefined

    const projectDeadline = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][12] : undefined) : undefined

    const projectImageURI = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][13] : undefined) : undefined

    const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>

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
        
        if (totalSupply[0].toNumber() > 0 & tokenMetadata.length !== totalSupply[0].toNumber()) {
            let tmpArrayOfTokenIds = [];
            for (let i = 0; i < totalSupply[0].toNumber(); i++) {
                tmpArrayOfTokenIds.push(i);
            }
            setArrayOfTokenIds(tmpArrayOfTokenIds);
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
                        ipfsResults.forEach(r => tmpResult.push(r))
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

    const callMakeSubmission = (tokenMetadataURI) => {
        console.log("inside callMakeSubmission: ", {tokenMetadataURI})
        console.log(Number(selectedTokenId), String(tokenMetadataURI))
        void send(Number(selectedTokenId), String(tokenMetadataURI))
    }

    const uploadToIPFS = (ipfsData) => {
        const header = {
            "Authorization": "Bearer " + process.env.REACT_APP_NFT_STORAGE_KEY
        }
        fetch('https://api.nft.storage/upload', {
            method: 'POST',
            body: ipfsData,
            headers: {
                "Authorization": "Bearer " + process.env.REACT_APP_NFT_STORAGE_KEY
            }
        })
        .then(function(r){
            return r.json()
        })
        .then(data => {
            if (data.ok) {
                setIpfsResponse(data);
                callMakeSubmission(data.value.cid);
            }
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const jsonData = {
            "token_id": selectedTokenId,
            "instructions": additionalInstructions,
        }
        
        let ipfsData = new FormData();
        ipfsData.set("meta", JSON.stringify(jsonData))
        if (zipFileDefined) {
            ipfsData.set("file", zipFile)
        } 
        uploadToIPFS(ipfsData)
    }

    const prepareBetterDisplay = () => {
        return (
            <div key={selectedTokenId}>
                <DisplayNFTWoCalling 
                    owner={tokenOwner} 
                    ipfsMetadata={tokenMetadataURI} 
                    valueInETH={tokenBounty} 
                    tokenId={selectedTokenId}
                    projectState={convertProjectState()}
                    projectName={projectName}
                    projectDescription={projectDescription}
                    projectPriority={projectPriority}
                    projectSkills={projectSkills}
                    projectDeadline={projectDeadline}
                    projectImageURI={projectImageURI}    
                />
                
            </div>
        )
    }

    const convertProjectState = () => {
        if (projectState !== undefined) {
            if (projectState === 0) {
                return "New"
            } else if (projectState === "1") {
                return "Active"
            } else {
                return "Closed"
            }
        }
    }

    const submitButton = () => {
        if (status === undefined | status === "None") {
            return (
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            )
        } else if (status === "Mining" | status === "PendingSignature") {
            return (
                <button className="btn btn-info" onClick={handleSubmit}>
                    Submitting... {loadingIcon}
                </button>
            )
        } else if (status === "Success") {
            return (
                <button className="btn btn-success" onClick={handleSubmit}>
                    Submission Created!
                </button>
            )
        } else {
            <button className="btn btn-danger" onClick={handleSubmit}>
                Failed to Create Submission
            </button>

        }
        if (status === "Success" | status === "Failed" | status === "Fail") {
            setTimeout(3000)
            resetState()
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <div className="mb-3 mb-lg-0">
                                        {tokenMetadata.length === 0 ? loadingIcon : <>
                                        <Label htmlFor="project-input" className="form-label">Project</Label>
                                        <select className="form-select" data-choices data-choices-search-false
                                            id="project-input" onChange={(e) => setSelectedTokenId(e.target.value)}>
                                            <option value="None"></option>
                                            {tokenMetadata.map((row, idx) => {
                                                let nftId = Number(utils.formatEther(row[4]))
                                                let name = row[8]
                                                let bounty = utils.formatEther(row[2]).slice(0, 7)
                                               return (<option key={idx} value={nftId}>#{nftId} - {name} - {bounty} ETH</option>)
                                            })}
                                        </select>
                                        </>}
                                    </div>
                                    <br />
                                    <div className="mb-3">
                                        <Label className="form-label" htmlFor="project-zip-file">Project Zip File</Label>
                                        <Input 
                                            className="form-control" 
                                            id="project-zip-file" 
                                            type="file" 
                                            accept='application/gzip, .tar, .tar.bz2, application/zip, .zip, .tar.gz'
                                            onChange={(event) => {
                                                setZipFile(event.target.files[0]);
                                            }}
                                        />
                                    </div>
                                    <br />

                                    <div className="mb-3">
                                        <Label className="form-label">Additional Instructions</Label>
                                        <CKEditor
                                            id='additional-instructions-ckeditor'
                                            editor={ClassicEditor}
                                            placeholder="<p>Enter a additional instructions here.</p>"
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setAdditionalInstructions(data);
                                            } }
                        
                                            />
                                    </div>

                                    
                                    
                                </CardBody>
                            </Card>
                            <div className="text-end mb-4">
                                    {submitButton()}
                            </div>

                            <div className="text-end mb-4">
                                {tokenMetadata === undefined ? loadingIcon : <></>}
                                {selectedTokenId !== undefined ? prepareBetterDisplay() : <></> }
                            </div>
                            
                        </Col>                        
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default SubmitSolution;
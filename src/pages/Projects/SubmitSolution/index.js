import React, {useState} from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
//Import Flatepicker
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers } from "@usedapp/core";
import map from "../../../build/deployments/map.json";
import OpsNFTKovan from "../../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"
import DisplayNFTWoCalling from '../../../Components/Common/DisplayNFTWoCalling';
import TweetSubmission from '../../../Components/Common/TweetSubmission';
import LoadTokenMetadataById from '../../../Components/Common/LoadTokenMetadataById';


const SubmitSolution = () => {

document.title="Submit Solution | Block Ops";

    const tokenMetadataById = LoadTokenMetadataById()
   
    const { account, chainId } = useEthers();
    const [additionalInstructions, setAdditionalInstructions] = useState("");
    const [zipFile, setZipFile] = useState(null);
    const [ipfsResponse, setIpfsResponse] = useState(null);
    const zipFileDefined = zipFile !== null

    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state, send, resetState } = useContractFunction(contract, 'makeSubmission')
    const { status } = state
    const [selectedTokenId, setSelectedTokenId] = useState(0);

    const tokenOwner = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['owner'] : undefined
    const tokenMetadataURI = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['ipfsURI'] : undefined
    const tokenBounty = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['amountOfEthInNFT'] : undefined
    const tokenCreator = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['creator'] : undefined
    const nftTokenId = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['tokenId'] : undefined
    const projectState = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['projectState'] : undefined
    const projectSubmissions = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['projectSubmissions'] : undefined
    const projectName = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['projectTitle'] : undefined
    const projectDescription = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['projectDescription'] : undefined
    const projectPriority = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['projectPriority'] : undefined
    const projectSkills = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['projectSkills'] : undefined
    const projectDeadline = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['projectDeadline'] : undefined
    const projectImageURI = Object.keys(tokenMetadataById).length > 0 ? tokenMetadataById[selectedTokenId]['ipfsImageURI'] : undefined

    const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>

    const callMakeSubmission = (tokenMetadataURI) => {
        void send(Number(selectedTokenId), String(tokenMetadataURI))
    }

    const uploadToIPFS = (ipfsData) => {
        fetch('https://api.nft.storage/store', {
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
                setIpfsResponse(data.value.url);
                callMakeSubmission(data.value.url);
            }
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const jsonData = {
            "name": projectName,
            "description": projectDescription,
            "image": undefined,
            "properties": {
                "skills": projectSkills,
                "priority": projectPriority,
                "deadline": projectDeadline,
                "instructions": additionalInstructions,
                "submitter": account,
                "nftCreator": tokenCreator,
                "videoClip": undefined
            }
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
                    projectState={projectState}
                    projectName={projectName}
                    projectDescription={projectDescription}
                    projectPriority={projectPriority}
                    projectSkills={projectSkills}
                    projectDeadline={projectDeadline.toString()}
                    projectImageURI={projectImageURI}    
                />
                
            </div>
        )
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

    const tweetOutSubmission = () => {

        if (ipfsResponse !== undefined & ipfsResponse !== null) {
                return (
                    <TweetSubmission 
                        projectId={nftTokenId} 
                        projectName={projectName} 
                        tokenMetadataURI={tokenMetadataURI} 
                    />
                )
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

                                        {
                                            tokenMetadataById !== undefined ? 
                                            Object.keys(tokenMetadataById).length === 0 ? loadingIcon : 
                                            <>
                                                <Label htmlFor="project-input" className="form-label">Project</Label>
                                                <select className="form-select" data-choices data-choices-search-false
                                                    id="project-input" onChange={(e) => setSelectedTokenId(e.target.value)}>
                                                    <option value="None"></option>
                                                    {
                                                        Object.keys(tokenMetadataById).map(function(key, idx) {
                                                            let tmpKey = "option-select-" + idx
                                                            return (
                                                                <option key={tmpKey} value={tokenMetadataById[key]['tokenId']}>
                                                                    {"#" + tokenMetadataById[key]['tokenId'] + " - " + tokenMetadataById[key]['projectTitle'] + " - " + tokenMetadataById[key]['amountOfEthInNFT'] + " ETH"}
                                                                </option>
                                                            )
                                                        })
                                                        
                                                    }
                                                </select>
                                            </>: <></>}
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
                            <Row>
                                <Col md={3} sm={12}></Col>
                                <Col md={3} sm={12}>
                                    <div className='text-end mb-4'>
                                        {tweetOutSubmission()}
                                    </div>
                                </Col>

                                <Col md={3} sm={12}></Col>
                                <Col md={3} sm={12}>
                                    <div className="text-end mb-4">
                                        {submitButton()}
                                    </div>
                                </Col>
                            
                            </Row>

                            <Row>
                                <Col sm={12}>
                                    <div className="text-end mb-4">
                                        {status === "Success" ? prepareBetterDisplay() : <></> }
                                    </div>
                                </Col>
                            </Row>
                            
                        </Col>                        
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default SubmitSolution;
import React, {useState} from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers } from "@usedapp/core";
import map from "../../../build/deployments/map.json";
import OpsNFTKovan from "../../../build/deployments/42/0xD35f33b91cBAf07f1409bc88E5c04256eDdEE955.json"
import { Icon } from '@iconify/react';
import DisplayNFT from '../../../Components/Common/DisplayNFT';
import TweetProject from '../../../Components/Common/TweetProject';

const CreateProject = () => {
    const [selectedMulti, setselectedMulti] = useState(null);
    const { chainId } = useEthers();

    function handleMulti(selectedMulti) {
        setselectedMulti(selectedMulti);
    }  
    
    //Dropzone file upload
    const [selectedFiles, setselectedFiles] = useState([]);
    const [files, setFiles] = useState([]);


    function handleAcceptedFiles(files) {
      files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          formattedSize: formatBytes(file.size),
        })
      );
      setselectedFiles(files);
    }

        /**
     * Formats the size
     */
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

document.title="Create Project | Block Ops";

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectPriority, setProjectPriority] = useState("");
    const [projectDeadline, setProjectDeadline] = useState("");
    const [projectSkill, setProjectSkill] = useState("");
    const [projectSkills, setProjectSkills] = useState([]);
    const [projectImage, setProjectImage] = useState(null);
    const [ipfsResponse, setIpfsResponse] = useState(null);
    const [ethAmount, setEthAmount] = useState();

    const [nftMintedOwner, setNftMintedOwner] = useState();
    const [nftMintedMetadata, setNftMintedMetadata] = useState();
    const [nftMintedValue, setNftMintedValue] = useState();
    const [nftMintedTokenId, setNftMintedTokenId] = useState(null);
    const [eventTableFinished, setEventTableFinished] = useState(false);

    const ipfsDefined = ipfsResponse !== null
    const projectImageDefined = projectImage !== null

    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state, send, events, resetState } = useContractFunction(contract, 'safeMint')
    const { status, receipt } = state
    const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>



    const callSafeMint = (tokenMetadataURI) => {
        let ethAmountWithFees = Number(ethAmount) * (100/99)
        void send(tokenMetadataURI, { 
            value: utils.parseEther(String(ethAmountWithFees)) 
        })
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            setProjectSkills(oldArray => [...oldArray, projectSkill]);
            document.getElementById('required-skills-input').value = '';
        }
    }

    const uploadToIPFS = (ipfsData) => {
        const header = {
            "Authorization": "Bearer " + process.env.REACT_APP_NFT_STORAGE_KEY
        }
        fetch('https://api.nft.storage/store', {
            method: 'POST',
            body: ipfsData,
            headers: {
                "Authorization": "Bearer " + process.env.REACT_APP_NFT_STORAGE_KEY
            }
        })
        .then(r => r.json())
        .then(data => {
            if (data.ok) {
                setIpfsResponse(data);
                callSafeMint(data.value.url);
            }
        })
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        
        const jsonData = {
            "name": projectTitle,
            "description": projectDescription,
            "image": undefined,
            "properties": {
                "skills": projectSkills,
                "priority": projectPriority,
                "deadline": projectDeadline,
                "videoClip": undefined
            }
        }
        
        let ipfsData = new FormData();
        ipfsData.set("meta", JSON.stringify(jsonData))
        if (projectImageDefined) {
            ipfsData.set("image", projectImage)
        } 
        uploadToIPFS(ipfsData)
    }

    const eventsTable = () => {
        events.map((e) => { 
            if (e.name === "NFTMinted" & nftMintedMetadata === undefined) {
                setNftMintedOwner(e.args[0])
                setNftMintedMetadata(e.args[1])
                setNftMintedValue(utils.formatEther(e.args[2]))
                setNftMintedTokenId(e.args._tokenId.toNumber())
                setEventTableFinished(true);
            }
        } ) 
    }

    const submitButton = () => {
        if (state.status === undefined | state.status === "None") {
            return (
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Create Project
                </button>
            )
        } else if (state.status === "Mining" | state.status === "PendingSignature") {
            return (
                <button className="btn btn-info" onClick={handleSubmit}>
                    Creating Project... {loadingIcon}
                </button>
            )
        } else if (state.status === "Success") {
            return (
                <button className="btn btn-success" onClick={handleSubmit}>
                    Project Created!
                </button>
            )
        } else {
            <button className="btn btn-danger" onClick={resetState()}>
                Failed to Close Project
            </button>

        }
        if (state.status === "Success" | state.status === "Failed") {
            setTimeout(3000)
            resetState()
        }
    }

    const tweetOutProject = () => {
        if (
            projectSkills !== undefined & 
            nftMintedTokenId !== undefined &
            projectSkills !== null & 
            nftMintedTokenId !== null 
        ) {
            return (
                <TweetProject projectId={nftMintedTokenId} projectSkills={projectSkills} />
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
                                    <div className="mb-3">
                                        <Label className="form-label" htmlFor="project-title-input">Project Title</Label>
                                        <Input type="text" className="form-control" id="project-title-input"
                                            placeholder="Enter project title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <Label className="form-label" htmlFor="project-thumbnail-img">NFT Image</Label>
                                        <Input 
                                            className="form-control" id="project-thumbnail-img" 
                                            type="file" 
                                            accept="image/png, image/gif, image/jpeg" 
                                            onChange={(event) => {
                                                setProjectImage(event.target.files[0]);
                                            }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <Label className="form-label">Project Description</Label>
                                        <CKEditor
                                            id='project-description-ckeditor'
                                            editor={ClassicEditor}
                                            placeholder="<p>Enter a project description here.</p>"
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setProjectDescription(data);
                                            } }
                        
                                            />
                                    </div>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3 mb-lg-0">
                                                <Label htmlFor="choices-priority-input" className="form-label">Priority</Label>
                                                <select className="form-select" data-choices data-choices-search-false
                                                    id="choices-priority-input" onChange={(e) => setProjectPriority(e.target.value)}>
                                                    <option value="None"></option>
                                                    <option value="Low">Low</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="High">High</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3 mb-lg-0">
                                                <Label htmlFor="datepicker-deadline-input" className="form-label">Deadline</Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                    dateFormat: "d M, Y"
                                                    }}
                                                    placeholder="Selact Date"
                                                    onChange={(e) => setProjectDeadline(e[0])}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <br />
                                                <Label className="form-label" >Bounty Amount <Icon icon="ph:currency-eth" width="17" /></Label>
                                                <Input type="text" className="form-control"
                                                    placeholder="Enter bounty amount in ETH" value={ethAmount} onChange={(e) => setEthAmount(e.target.value)} />
                                            </div>
                                        
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                
                                            <div className='mb-3 mb-lg-0'>
                                                <Label htmlFor="required-skills-input" className="form-label">Required Skills</Label>
                                                <Input type="text" className="form-control" id="required-skills-input"
                                                placeholder="Press 'Enter' to add more skills" onChange={(e) => setProjectSkill(e.target.value)} onKeyPress={(e) => handleEnter(e)} />
                                                <br />

                                            <table className="table table-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Skills</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    

                                            {projectSkills?.map((f) => { return (
                                                <tr key={f + "-skill" + "-"+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) }>
                                                    <th className="fw-semibold">{f}</th>
                                                </tr>
                                            ) } ) }
                                                </tbody>
                                            </table>
                                                
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Row>
                                <Col md={3} sm={12}></Col>
                                <Col md={3} sm={12}>
                                    <div className='text-end mb-4'>
                                        {tweetOutProject()}
                                    </div>
                                </Col>

                                <Col md={3} sm={12}></Col>
                                <Col md={3} sm={12}>
                                    <div className="text-end mb-4">
                                        {submitButton()}
                                    </div>
                                </Col>
                            
                            </Row>

                            <div className="text-end mb-4">
                                {receipt !== undefined ? eventsTable() : <></>}
                                {eventTableFinished ? 
                                <DisplayNFT 
                                    owner={nftMintedOwner} 
                                    ipfsMetadata={nftMintedMetadata} 
                                    valueInETH={nftMintedValue} 
                                    tokenId={nftMintedTokenId} 
                                /> : <></>}
                            </div>
                            
                        </Col>                        
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CreateProject;
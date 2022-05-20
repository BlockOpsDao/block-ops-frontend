import React,{useState} from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row } from 'reactstrap';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction } from "@usedapp/core";
import map from "../../../build/deployments/map.json";
import OpsNFTKovan from "../../../build/deployments/42/0x072Cc7F9aBb95780fE3B4Fa4f0333DDf22308E98.json"
import { Icon } from '@iconify/react';


const CreateProject = () => {

    const SingleOptions = [
        { value: 'Watches', label: 'Watches' },
        { value: 'Headset', label: 'Headset' },
        { value: 'Sweatshirt', label: 'Sweatshirt' },
        { value: '20% off', label: '20% off' },
        { value: '4 star', label: '4 star' },
      ];

    const [selectedMulti, setselectedMulti] = useState(null);

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
    const [submitButtonState, setSubmitButtonState] = useState("ready");
    const [ethAmount, setEthAmount] = useState();
    const ipfsDefined = ipfsResponse !== null
    const projectImageDefined = projectImage !== null

    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[42]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state, send, events } = useContractFunction(contract, 'safeMint')
    const { status, receipt } = state

    const callSafeMint = (tokenMetadataURI) => {
      void send(tokenMetadataURI, { 
          value: utils.parseEther(ethAmount) 
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
                setSubmitButtonState("success");
                changeSubmitButton();
            }
            else {
                setSubmitButtonState("failed");
                changeSubmitButton();
            }
        })
    }

    const changeSubmitButton = () => {
        if (submitButtonState === "ready") {
            return <span><p>Create</p></span>
        } else if (submitButtonState === "pending" | status === "Mining" | status === "PendingSignature") {
            return <span><p>Uploading...</p> <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i></span>
        } else if (submitButtonState === "success" & status === "Success") {
            return <span><p>Success!</p></span>
        } else {
            return <span><p>Failed</p></span>
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitButtonState("pending")
        changeSubmitButton();
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

    const receiptTable = () => {
        return (
            <table className="table table-nowrap">
            <thead>
                <tr>
                    <th scope="col">to</th>
                    <th scope="col">from</th>
                    <th scope="col">address</th>
                    <th scope="col">transactionIndex</th>
                    <th scope="col">effectiveGasPrice</th>
                </tr>
            </thead>
            <tbody>
                    

            {events.map((e) => { return ( <>
                <tr key={e + "-event" + "-"+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) }>
                    <th className="fw-semibold">{e.to}</th>
                    <th className="fw-semibold">{e.from}</th>
                    <th className="fw-semibold">{e.contractAddress}</th>
                    <th className="fw-semibold">{e.transactionIndex}</th>
                    <th className="fw-semibold">{e.effectiveGasPrice}</th>
                </tr>
                </>
            ) } ) }
                </tbody>
            </table>
        )
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={8}>
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
                                                    

                                            {projectSkills.map((f) => { return (
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
                            <div className="text-end mb-4">
                                <button type="submit" className="btn btn-success w-sm" onClick={handleSubmit}>
                                    {changeSubmitButton()}
                                </button>
                            </div>

                            <div className="text-end mb-4">
                                {receipt !== undefined ? receiptTable() : <p>No receipt</p>}
                            </div>
                            
                        </Col>                        
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CreateProject;
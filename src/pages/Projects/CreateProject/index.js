import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
//Import Flatepicker
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Dropzone from "react-dropzone";

//Import Images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import { NFTStorage, File } from 'nft.storage'



const CreateProject = () => {
    //const nftStorageClient = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_KEY })
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

    // async function uploadToIPFS(name, description, image) {
    //     const metadata = await client.store({
    //       name: name,
    //       description: description,
    //       image: new File(
    //         [
    //           image
    //         ],
    //         'pinpie.jpg',
    //         { type: 'image/jpg' }
    //       ),
    //     })
    //     console.log(metadata.url)
    //     return metadata
    //     // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
    //   }
      
  
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
    const [projectImageUri, setProjectImageUri] = useState("");
    const [projectPriority, setProjectPriority] = useState("");
    const [projectDeadline, setProjectDeadline] = useState("");
    const [projectSkill, setProjectSkill] = useState("");
    const [projectSkills, setProjectSkills] = useState([]);
    const [projectImage, setProjectImage] = useState();

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            setProjectSkills(oldArray => [...oldArray, projectSkill]);
            document.getElementById('required-skills-input').value = '';
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        //setProjectPriority(document.getElementById("choices-priority-input"))
        console.log('projectTitle: ', projectTitle)
        console.log('projectImageUri: ', projectImageUri)
        console.log('projectDescription: ', projectDescription)
        console.log('projectPriority: ', projectPriority)
        console.log('projectDeadline: ', projectDeadline)
        console.log('projectSkills: ', projectSkills)

        console.log('selectedFiles: ', selectedFiles)
        console.log('projectImage: ', projectImage)
        // const jsonData = {
        //     "projectTitle",
        // }
        // const fileData = JSON.stringify(jsonData);
        // const blob = new Blob([fileData], {type: "text/plain"});
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.download = `${filename}.json`;
        // link.href = url;
        // link.click();

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
                                                console.log(event.target.files[0]);
                                                setProjectImage(event.target.files[0]);
                                            }}
                                        />

                                        {/* <Label className='form-label' htmlFor="project-image-uri">Image URL</Label>
                                        <Input type="text" className="form-control" id="project-image-uri"
                                            placeholder="Enter URL to your image." value={projectImageUri} onChange={(e) => setProjectImageUri(e.target.value)} /> */}
                                    </div>

                                    <div className="mb-3">
                                        <Label className="form-label">Project Description</Label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data="<p>Enter a project description here.</p>"
                                            onReady={(editor) => {
                                                // You can store the "editor" and use when it is needed.
                                                setProjectDescription(editor.getData());
                                                
                                            }}
                                            onChange={(editor) => {
                                                
                                            }}
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
                                <button type="submit" className="btn btn-success w-sm" onClick={handleSubmit}>Create</button>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CreateProject;
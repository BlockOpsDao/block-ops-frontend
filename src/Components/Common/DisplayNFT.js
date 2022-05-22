import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col, Container, Row, CardTitle } from 'reactstrap';
import { Icon } from '@iconify/react';
import { TourMethods } from 'react-shepherd';
import DOMPurify from "dompurify";


const DisplayNFT = (owner) => {
    const [nftOwner, setNftOwner] = useState();
    const [nftIpfsMetadata, setNftIpfsMetadata] = useState();
    const [nftValueInEth, setNftValueInEth] = useState();
    const [nftTokenId, setNftTokenId] = useState();

    const [projectName, setProjectName] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const [projectImageURI, setProjectImageURI] = useState("https://block-ops.infura-ipfs.io/ipfs/bafkreieybp7cct3rtlgeiy2gz5duzq65pgsxlgspbmajcvsnj7etlsls6u");
    const [projectPriorty, setProjectPriorty] = useState();
    const [projectSkills, setProjectSkills] = useState();
    const [projectDeadline, setProjectDeadline] = useState();
    const [metadata, setMetadata] = useState();
    const ipfsBase = "https://block-ops.infura-ipfs.io/ipfs/"

    async function fetchFromIPFS(owner) {
        console.log("owner: ", owner)
        setNftOwner(owner['owner'])
        setNftIpfsMetadata(owner['ipfsMetadata'].replace("ipfs://", ipfsBase))
        setNftValueInEth(owner['valueInETH'])
        setNftTokenId(owner['tokenId'])

        console.log("nftIpfsMetadata: ", nftIpfsMetadata)
        const response = await fetch(nftIpfsMetadata, {
            headers: {
                // 'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (response.status === 200) {
            setMetadata(await response.json());        
            setProjectName(metadata["name"])
            setProjectDescription(DOMPurify.sanitize(metadata["description"], { USE_PROFILES: { html: true } }))
            setProjectPriorty(metadata["properties"]["priority"])
            setProjectSkills(metadata["properties"]["skills"])
            setProjectDeadline(metadata["properties"]["deadline"])
            try {
                setProjectImageURI(metadata["image"].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/"))
            } catch (error) {
                setProjectImageURI("https://block-ops.infura-ipfs.io/ipfs/bafkreieybp7cct3rtlgeiy2gz5duzq65pgsxlgspbmajcvsnj7etlsls6u")
                console.log("No image submitted for this NFT. ", error)
            }
            return metadata;
        } else {
            console.log("response: ", response)
        }
    }

    useEffect(() => {
        let isMounted = false;

        fetchFromIPFS(owner)
        return () => { isMounted = true };
    }, []);
    
    if (metadata !== undefined) {
        console.log("projectName: ", projectName)
        console.log("projectDescription: ", projectDescription)
        console.log("projectPriorty: ", projectPriorty)
        console.log("projectSkills: ", projectSkills)
        console.log("projectDeadline: ", projectDeadline)
        console.log("projectImageURI: ", projectImageURI)
        return (
            <Container>
                <Row className="justify-content-center">
                <Col lg={8}>
            <Card>
                <CardBody>
                    <div className='d-flex'>
                        <CardTitle><h1 className="card-title-desc mb-2">{projectName}</h1></CardTitle>
                    </div>
                    <img src={projectImageURI} className="figure-img img-fluid rounded" alt="..." />
                    <div className="table-responsive table-card mt-3">
                        <table className="table table-borderless table-sm table-centered align-middle table-nowrap mb-1">
                            <thead className="text-muted border-dashed border border-start-0 border-end-0 bg-soft-light">
                                <tr>
                                    <th>Description</th>
                                    <th style={{ width: "30%" }}><div dangerouslySetInnerHTML={{ __html: projectDescription }} /></th>
                                </tr>
                                
                            </thead>
                            <tbody className="border-0">
                                <tr>
                                    <td>OpsNFT #</td>
                                    <td>{nftTokenId}</td>
                                </tr>
                                <tr>
                                    <td>Value (in ETH)</td>
                                    <td>{nftValueInEth} <Icon icon="ph:currency-eth" width="17" /></td>
                                </tr>
                                <tr>
                                    <td>Priority</td>
                                    <td>{projectPriorty}</td>
                                </tr>
                                <tr>
                                    <td>Deadline</td>
                                    <td>{projectDeadline}</td>
                                </tr>
                                <tr>
                                    <td>Required Skills</td>
                                    <td>
                                    <ul className="list-inline d-flex align-items-center g-3 text-muted fs-14 mb-0">
                                        {projectSkills.map((ps, i) => {
                                            console.log("ps, i: ", ps, i)
                                            return (
                                                <li key={i} className="list-inline-item me-3">
                                                    {ps},
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Submitter</td>
                                    <td>{nftOwner}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </CardBody>
            </Card>
            </Col>
            </Row>
            </Container>
        )
    }

}
export default DisplayNFT;
import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col, Container, Row, CardTitle } from 'reactstrap';
import { Icon } from '@iconify/react';
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

    function fetchFromIPFS(owner) {
        setNftOwner(owner['owner'])
        setNftIpfsMetadata(owner['ipfsMetadata'].replace("ipfs://", ipfsBase))
        setNftValueInEth(owner['valueInETH'])
        setNftTokenId(owner['tokenId'])

        const response = fetch(owner['ipfsMetadata'].replace("ipfs://", ipfsBase), {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            setMetadata(data);        
            setProjectName(data["name"])
            setProjectDescription(DOMPurify.sanitize(data["description"], { USE_PROFILES: { html: true } }))
            setProjectPriorty(data["properties"]["priority"])
            setProjectSkills(data["properties"]["skills"])
            setProjectDeadline(data["properties"]["deadline"])
            try {
                setProjectImageURI(data["image"].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/"))
            } catch (error) {
                setProjectImageURI("https://block-ops.infura-ipfs.io/ipfs/bafkreieybp7cct3rtlgeiy2gz5duzq65pgsxlgspbmajcvsnj7etlsls6u")
                console.log("No image submitted for this NFT. ", error)
            }
        })
    }

    useEffect(() => {
        let isMounted = false;

        fetchFromIPFS(owner)
        return () => { isMounted = true };
    }, []);
    
    if (metadata !== undefined) {
        return (
            <center>
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
                                    <td>{String(nftValueInEth).slice(0, 6)} <Icon icon="ph:currency-eth" width="17" /></td>
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
            </center>
        )
    } else {
        return <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>;
    }

}
export default DisplayNFT;
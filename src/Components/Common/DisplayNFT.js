import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col, Container, Row, CardTitle } from 'reactstrap';
import { Icon } from '@iconify/react';
import { TourMethods } from 'react-shepherd';


const DisplayNFT = (owner) => {

    const [nftOwner, setNftOwner] = useState();
    const [nftIpfsMetadata, setNftIpfsMetadata] = useState();
    const [nftValueInEth, setNftValueInEth] = useState();
    const [nftTokenId, setNftTokenId] = useState();

    const [projectName, setProjectName] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const [projectImageURI, setProjectImageURI] = useState("https://ipfs.io/ipfs/bafkreieybp7cct3rtlgeiy2gz5duzq65pgsxlgspbmajcvsnj7etlsls6u");
    const [projectPriorty, setProjectPriorty] = useState();
    const [projectSkills, setProjectSkills] = useState();
    const [projectDeadline, setProjectDeadline] = useState();
    const [metadata, setMetadata] = useState();

    const ipfsBase = "https://ipfs.io/ipfs/"

    async function fetchFromIPFS(owner) {
        setNftOwner(owner['owner'])
        setNftIpfsMetadata(owner['ipfsMetadata'].replace("ipfs://", ipfsBase))
        setNftValueInEth(owner['valueInETH'])
        setNftTokenId(owner['tokenId'])
        console.log("fetchFromIPFS, nftIpfsMetadata: ", nftIpfsMetadata)
        const response = await fetch(nftIpfsMetadata, {
            headers: {
                // 'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log("response: ", response)
        if (response.status === 200) {
            setMetadata(await response.json());
            console.log("metadata: ", metadata)
        
            setProjectName(metadata["name"])
            setProjectDescription(metadata["description"])
            setProjectPriorty(metadata["properties"]["priority"])
            setProjectSkills(metadata["properties"]["skills"])
            setProjectDeadline(metadata["properties"]["deadline"])
            try {
                setProjectImageURI(metadata["image"])
            } catch (error) {
                console.log("No image submitted for this NFT. ", error)
            }
            return metadata;
        }
    }

    useEffect(() => {
        let isMounted = false;

        fetchFromIPFS(owner)
        return () => { isMounted = true };
    }, []);
    
    if (metadata !== undefined) {
        return (
            <Card>
                <CardTitle>{projectName}</CardTitle>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>OpsNFT #{nftTokenId}</Col>
                            <Col>Value {nftValueInEth}<Icon icon="ph:currency-eth" width="17" /></Col>
                            <Col>
                                <img src={projectImageURI} className="img" alt="project-image" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>Description - {projectDescription}</Col>
                            <Col>Priority - {projectPriorty}</Col>
                            <Col>Deadline - {projectDeadline}</Col>
                            <Col>Skills - {projectSkills}</Col>
                            <Col>Submitter - {nftOwner}</Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        )
    }

}
export default DisplayNFT;
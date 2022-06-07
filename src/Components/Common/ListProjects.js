import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers, shortenAddress } from "@usedapp/core";
import map from "../../build/deployments/map.json";
import OpsNFTKovan from "../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"
import { useState, useEffect } from 'react';
import { AnalyticEventTracker } from './AnalyticEventTracker';
import { Pagination, PaginationItem, PaginationLink, Col, Container, Row, Label } from 'reactstrap';
import { Table } from 'reactstrap';
import DisplayNFTWoCalling from './DisplayNFTWoCalling';
import LoadTokenMetadataById from './LoadTokenMetadataById';

const ListProjects = () => {

    const tokenMetadataById = LoadTokenMetadataById()

    const { account, chainId } = useEthers()
    const gaEventTracker = AnalyticEventTracker("ListProjects")
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    
    const [selectedTokenId, setSelectedTokenId] = useState(0);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(0);

    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state: RedeemState, send: RedeemSend, resetState: RedeemResetState } = useContractFunction(contract, 'redeemEthFromNFT')
    const { state: DeclareWinningState, send: DeclareWinningSend, resetState: DeclareWinningResetState } = useContractFunction(contract, 'declareWinningSubmission')

    const [projectTable, setProjectTable] = useState();
    const [submissionsTable, setSubmissionsTable] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5
    const pagesCount = Object.keys(tokenMetadataById).length !== undefined ? Object.keys(tokenMetadataById).length : undefined
    const [tokenMetadata, setTokenMetadata] = useState([]);

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

    
    useEffect(() => {

        if (Object.keys(tokenMetadataById).length > 0 & projectTable === undefined) {

            let tmpProjectTable = Object.entries(tokenMetadataById).slice(
                currentPage * pageSize,
                (currentPage + 1) * pageSize
              ).map((row, idx) => {
                let key = "project-table-" + idx
                if (row[1]['owner'] == account) {
                    return (
                        <tr key={key} onClick={() => {setSelectedTokenId(row[0]); gaEventTracker('selectedProjectTable', row[1]['ipfsURI'] )}}>

                            <th scope="row">{row[1]['tokenId']}</th>
                            <td>{row[1]['projectState'] ? row[1]['projectState'] : 0}</td>
                            <td>{row[1]['amountOfEthInNFT'] ? row[1]['amountOfEthInNFT'] : 0}</td>
                            <td>{row[1]['projectTitle'] ? row[1]['projectTitle'] : 0}</td>
                            <td>{row[1]['projectSkills'] ? row[1]['projectSkills'].join(', ') : 0}</td>
                            <td>{row[1]['projectDeadline'] ? row[1]['projectDeadline'].toString() : 0}</td>
                        </tr>
                    )
                }
            })
            setProjectTable(tmpProjectTable)
        }

        let tmpSubmissionsTable = projectSubmissions?.slice(
            currentPage * pageSize,
            (currentPage + 1) * pageSize
          ).map((row, idx) => {
            let key = "submissions-table-" + idx
            let ipfsUrl = "https://block-ops.infura-ipfs.io/ipfs/" + row[1]
            
            return (<>
                <tr key={key} onClick={() => {setSelectedSubmissionId(idx + currentPage * pageSize); gaEventTracker('selectedSubmissionsTable', tokenMetadataURI)}}>
                    <th scope="row">{row ? nftTokenId : <p>no token id</p>}</th>
                    <td>{row ? shortenAddress(row[0]) : row[0]}</td>
                    <td>{row ? <a href={ipfsUrl} className="fw-semibold text-info text-decoration-underline">Link to Submission</a> : <></>}</td>
                </tr>
            </>)
        })
        setSubmissionsTable(tmpSubmissionsTable)
        
    }, [tokenMetadataById, projectSubmissions]);

    const handlePaginationClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
    }

    const paginationTable = () => {
        return (
            <div className="pagination-wrapper">
            
                <Pagination aria-label="Page navigation example">
                
                <PaginationItem disabled={currentPage <= 0}>
                    
                    <PaginationLink
                    onClick={e => handlePaginationClick(e, currentPage - 1)}
                    previous
                    href="#"
                    />
                    
                </PaginationItem>

                {[...Array(pagesCount)].map((page, i) => 
                    <PaginationItem active={i === currentPage} key={i}>
                    {
                        i >= 0 & i > currentPage - 5 & i < currentPage + 5 & i < pagesCount / pageSize ? 
                        <PaginationLink onClick={e => handlePaginationClick(e, i)} href="#">
                            {i + 1}
                        </PaginationLink> : <></>
                    }
                    </PaginationItem>
                )}

                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                    
                    <PaginationLink
                    onClick={e => handlePaginationClick(e, currentPage + 1)}
                    next
                    href="#"
                    />
                    
                </PaginationItem>
                
                </Pagination>
        
        </div>
      )
    }

    const closeProject = () => {
        void RedeemSend(nftTokenId)
    }

    const declareWinningSubmission = () => {
        void DeclareWinningSend(
            selectedTokenId, 
            selectedSubmissionId,
        )
    }

    const closeProjectButton = () => {
        if (RedeemState.status === undefined | RedeemState.status === "None") {
            return (
                <button className="btn btn-primary" onClick={closeProject}>
                    Cancel Project
                </button>
            )
        } else if (RedeemState.status === "Mining" | RedeemState.status === "PendingSignature") {
            return (
                <button className="btn btn-info" onClick={closeProject}>
                    Cancelling Project... {loadingIcon}
                </button>
            )
        } else if (RedeemState.status === "Success") {
            return (
                <button className="btn btn-success" onClick={closeProject}>
                    Project Cancelled!
                </button>
            )
        } else {
            return (
                <button className="btn btn-danger" onClick={RedeemResetState}>
                    Failed to Cancel Project
                </button>
            )
        }

        if (RedeemState.status === "Success" | RedeemState.status === "Failed") {
            setTimeout(3000)
            RedeemResetState()
        }
    }

    const declareWinnerButton = () => {
        if (DeclareWinningState.status === undefined | DeclareWinningState.status === "None") {
            return (
                <button className="btn btn-danger" onClick={declareWinningSubmission}>
                    Declare Winner
                </button>
            )
        } else if (DeclareWinningState.status === "Mining" | DeclareWinningState.status === "PendingSignature") {
            return (
                <button className="btn btn-info" onClick={declareWinningSubmission}>
                    Declaring Winner... {loadingIcon}
                </button>
            )
        } else if (DeclareWinningState.status === "Success") {
            return (
                <button className="btn btn-success" onClick={declareWinningSubmission}>
                    Winner Declared!
                </button>
            )
        } else {
            return (
                <button className="btn btn-danger" onClick={DeclareWinningResetState}>
                    Failed to Declare Winner
                </button>
            )

        }
        if (DeclareWinningState.status === "Success" | DeclareWinningState.status === "Failed") {
            setTimeout(3000)
            DeclareWinningResetState()
        }
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

    const submissionDropdown = () => {
        if (projectSubmissions !== undefined) {
            return (<>
                <Label htmlFor="submission-input" className="form-label">Submission</Label>
                <select className="form-select" data-choices data-choices-search-false
                    id="submission-input" onChange={(e) => setSelectedSubmissionId(e.target.value)}>
                    <option value="None"></option>
                    {projectSubmissions.map((row, idx) => {
                        let ipfsUrl = "https://block-ops.infura-ipfs.io/ipfs/" + row[1]
                        return (<option key={"project-submission-row-" + idx} value={idx}>#{idx} - {ipfsUrl}</option>)
                    })}
                </select>
                
            </>)
        }
    }

    return (
        <Container>

            <Row>
                <Col sm={12}><br /><br /></Col>
            </Row>


            <Row>
                <Col sm={12}><h3>Your Projects</h3></Col>
                <Col sm={12}><br /></Col>
                <Col sm={12}>
                    
                        {projectTable !== undefined ? <>
                            <Table striped size="md" hover={true} responsive={true}>
                                <thead><tr>
                                    <th>Project #</th>    
                                    <th>Open/Closed</th>
                                    <th>Bounty</th>
                                    <th>Title</th>
                                    <th>Skills</th>
                                    <th>Deadline</th>
                                </tr></thead>

                                <tbody>{projectTable}</tbody>
                        
                            </Table>
                        </> : <></>}
                </Col>
                
                {projectTable !== undefined ? 
                <>
                    <Col md={3}></Col>
                    <Col sm={12} md={6}>{paginationTable()}</Col>
                    <Col md={3}></Col>
                </> 
                : <></>}
            </Row>

            <Row><br /></Row>
            <Row><br /></Row>
            <Row><br /></Row>

            
            <Row>
                <Col sm={12} md={8}>
                    {
                        tokenOwner !== undefined &
                        tokenMetadataURI !== undefined &
                        tokenBounty !== undefined &
                        tokenCreator !== undefined 
                        ? <Container>{prepareBetterDisplay()}</Container> : tokenMetadata.length === 0 ? <p>You have no projects</p> : loadingIcon
                    }
                </Col>

                <Col md={4}>
                    <Table striped size="md" hover={true} responsive={true}>
                        <thead><tr>
                            <th>Submission #</th>    
                            <th>Submitter</th>
                            <th>IPFS CID</th>
                        </tr></thead>

                        <tbody>
                        {submissionsTable !== undefined ? submissionsTable : <></>}
                        </tbody>
                    </Table>
                    <Row>
                        <Col sm={12}>{submissionDropdown()}</Col>
                        <Col sm={12}><br /></Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12}>{declareWinnerButton()}</Col>
                        <Col md={6} sm={12}>{closeProjectButton()}</Col>
                    </Row>
                    
                        
                </Col>
            </Row>

            <Row></Row>
        
    </Container>
        
    )

}
export default ListProjects;
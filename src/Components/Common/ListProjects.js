import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers, useCalls, shortenAddress } from "@usedapp/core";
import map from "../../build/deployments/map.json";
import OpsNFTKovan from "../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"
import { useState, useEffect } from 'react';
import { AnalyticEventTracker } from './AnalyticEventTracker';
import CallOpsNFT from "../Common/CallOpsNFT";
import { Pagination, PaginationItem, PaginationLink, Col, Container, Row, Label } from 'reactstrap';
import { Table } from 'reactstrap';
import DOMPurify from "dompurify";
import DisplayNFTWoCalling from './DisplayNFTWoCalling';

const ListProjects = () => {

    const { account, chainId } = useEthers()
    const gaEventTracker = AnalyticEventTracker("ListProjects")
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    
    const totalSupply = CallOpsNFT("totalSupply") ?? undefined
    const [creatorsNFTs, setCreatorsNFTs] = useState();
    const [bulkTokenDetails, setBulkTokenDetails] = useState();
    const [selectedTokenId, setSelectedTokenId] = useState(0);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(0);

    const arrayOfNFTsFromCreator = CallOpsNFT("getArrayOfNFTsFromCreator", [account]) ?? undefined
    const calls = creatorsNFTs?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'tokenDetails',
        args: [e]
      })) ?? []
    const results = useCalls(calls) ?? []

    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state: RedeemState, send: RedeemSend, resetState: RedeemResetState } = useContractFunction(contract, 'redeemEthFromNFT')
    const { state: DeclareWinningState, send: DeclareWinningSend, resetState: DeclareWinningResetState } = useContractFunction(contract, 'declareWinningSubmission')

    const [projectTable, setProjectTable] = useState();
    const [submissionsTable, setSubmissionsTable] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5
    const pagesCount = bulkTokenDetails !== undefined ? bulkTokenDetails.length : undefined
    const [tokenMetadata, setTokenMetadata] = useState([]);
    const tmpTokenMetadata = []

    const tokenOwner = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][0] : undefined) : undefined

    const tokenMetadataURI = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][1] : undefined) : undefined

    const tokenBounty = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? utils.formatEther(tokenMetadata[Number(selectedTokenId)][2]) : undefined) : undefined

    const tokenCreator = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][3] : undefined) : undefined

    const nftTokenId = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][4].toNumber() : undefined) : undefined

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
        if (arrayOfNFTsFromCreator !== undefined) {
            let tmpNFTArray = []
            for (let i = 0; i < arrayOfNFTsFromCreator[0].length; i++) {
                let thisTokensId = arrayOfNFTsFromCreator[0][i].toNumber()
                tmpNFTArray.push(thisTokensId)
            }
            setCreatorsNFTs(tmpNFTArray)        
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
        setBulkTokenDetails(results.map(r => r?.value))
        if (tokenMetadata.length === 0) {
            loadTokenMetadata()
        }

        let tmpProjectTable = tokenMetadata?.slice(
            currentPage * pageSize,
            (currentPage + 1) * pageSize
          ).map((row, idx) => {
            let key = "project-table-" + idx
            let pState = "Closed"
            if (row[5] == 0) {
                pState = "New"
            } else if (row[5] == 1) {
                pState = "Active"
            }
            return (
                <tr key={key} onClick={() => {setSelectedTokenId(idx + currentPage * pageSize); gaEventTracker('selectedProjectTable', tokenMetadataURI)}}>
                    <th scope="row">{row ? row[4].toNumber() : <p>no token id</p>}</th>
                    <td>{pState}</td>
                    <td>{row ? utils.formatEther(row[2]) : <></>}</td>
                    <td>{row ? row[8] : <></>}</td>
                    <td>{row ? row[11].join([', ']) : <></>}</td>
                    <td>{row ? row[12].replace("T", " ").replace(".000Z", "") : <></>}</td>
                </tr>
            )
        })
        setProjectTable(tmpProjectTable)

        let tmpSubmissionsTable = projectSubmissions?.slice(
            currentPage * pageSize,
            (currentPage + 1) * pageSize
          ).map((row, idx) => {
            let key = "submissions-table-" + idx
            let ipfsUrl = "https://block-ops.infura-ipfs.io/ipfs/" + row[1]
            
            return (<>
                <tr key={key} onClick={() => {setSelectedSubmissionId(idx + currentPage * pageSize); gaEventTracker('selectedSubmissionsTable', tokenMetadataURI)}}>
                    <th scope="row">{row ? idx : <p>no token id</p>}</th>
                    <td>{row ? shortenAddress(row[0]) : row[0]}</td>
                    <td>{row ? <a href={ipfsUrl} className="fw-semibold text-info text-decoration-underline">Link to Submission</a> : <></>}</td>
                </tr>
            </>)
        })
        setSubmissionsTable(tmpSubmissionsTable)
        
    }, [arrayOfNFTsFromCreator]);

    const convertProjectState = () => {
        if (projectState !== undefined) {
            if (projectState === 0) {
                return "New"
            } else if (projectState === 1) {
                return "Active"
            } else {
                return "Closed"
            }
        }
    }    

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

    const submissionDropdown = () => {
        if (projectSubmissions !== undefined) {
            return (<>
                <Label htmlFor="submission-input" className="form-label">Submission</Label>
                <select className="form-select" data-choices data-choices-search-false
                    id="submission-input" onChange={(e) => setSelectedSubmissionId(e.target.value)}>
                    <option value="None"></option>
                    {projectSubmissions.map((row, idx) => {
                        let ipfsUrl = "https://block-ops.infura-ipfs.io/ipfs/" + row[1]
                        return (<option key={idx} value={idx}>#{idx} - {ipfsUrl}</option>)
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
                    
                        {tokenMetadata !== undefined ? <>
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
                
                {tokenMetadata !== undefined ? 
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
                        tokenMetadata !== undefined &
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
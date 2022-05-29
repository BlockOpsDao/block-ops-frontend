import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useCall, useCalls } from "@usedapp/core";
import map from "../../build/deployments/map.json";
import OpsNFTKovan from "../../build/deployments/42/0x871DF91D90bccE579A3e7A93f1a6142c2C5Bc14E.json"
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { AnalyticEventTracker } from './AnalyticEventTracker';
import CallOpsNFT from "../Common/CallOpsNFT";
import { Pagination, PaginationItem, PaginationLink, Col, Container, Row } from 'reactstrap';
import { Table } from 'reactstrap';

import { useEthers } from "@usedapp/core";
import DOMPurify from "dompurify";
import DisplayNFTWoCalling from './DisplayNFTWoCalling';



const ListProjects = () => {

    const { account } = useEthers()
    const isConnected = account !== undefined
    const [loading, setLoading] = useState(true);

    const gaEventTracker = AnalyticEventTracker("ListProjects")
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[42]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    
    const totalSupply = CallOpsNFT("totalSupply") ?? undefined
    const [creatorsNFTs, setCreatorsNFTs] = useState();
    const [bulkTokenDetails, setBulkTokenDetails] = useState();
    const [selectedTokenId, setSelectedTokenId] = useState(0);

    const arrayOfNFTsFromCreator = CallOpsNFT("getArrayOfNFTsFromCreator", [account]) ?? undefined
    const calls = creatorsNFTs?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'tokenDetails',
        args: [e]
      })) ?? []
    const results = useCalls(calls) ?? []

    const contract = new Contract(opsNFTContractAddress, opsNFTInterface);
    const { state, send, resetState } = useContractFunction(contract, 'redeemEthFromNFT')
    const { status, receipt } = state

    const [projectTable, setProjectTable] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5
    const pagesCount = bulkTokenDetails !== undefined ? bulkTokenDetails.length : undefined
    const [tokenMetadata, setTokenMetadata] = useState([]);
    const tmpTokenMetadata = []

    const tokenOwner = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][0] : undefined) : undefined
    const tokenMetadataURI = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][1] : undefined) : undefined
    const tokenBounty = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? utils.formatEther(tokenMetadata[Number(selectedTokenId)][2]) : undefined) : undefined
    const tokenCreator = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][3] : undefined) : undefined

    const nftTokenId = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? Number(utils.formatEther(tokenMetadata[Number(selectedTokenId)][4])) : undefined) : undefined

    const projectName = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][6] : undefined) : undefined

    const projectDescription = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][7] : undefined) : undefined

    const projectPriority = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][8] : undefined) : undefined

    const projectSkills = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][9] : undefined) : undefined

    const projectDeadline = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][10] : undefined) : undefined

    const projectImageURI = tokenMetadata !== undefined & selectedTokenId !== undefined ? (tokenMetadata.length > Number(selectedTokenId) ? tokenMetadata[Number(selectedTokenId)][11] : undefined) : undefined

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
            setLoading(false)
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
            return (
                <tr key={key} onClick={() => {setSelectedTokenId(idx + currentPage * pageSize); gaEventTracker('selectedProjectTable', tokenMetadataURI)}}>
                    <th scope="row">{row ? Number(utils.formatEther(row[4])) : <p>no token id</p>}</th>
                    <td>{row ? row[0] === row[3] ? "Open" : "Closed" : "Closed"}</td>
                    <td>{row ? utils.formatEther(row[2]) : <></>}</td>
                    <td>{row ? row[6] : <></>}</td>
                    <td>{row ? row[9].join([', ']) : <></>}</td>
                    <td>{row ? row[10].replace("T", " ").replace(".000Z", "") : <></>}</td>
                </tr>
            )
        })
        setProjectTable(tmpProjectTable)
        
    }, [arrayOfNFTsFromCreator]);

    

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

    const getTotalSupply = () => {
        console.log("totalSupply: ", totalSupply[0].toNumber())
    }

    const closeProject = () => {
        void send(nftTokenId)
    }

    const closeProjectButton = () => {
        if (state === undefined) {
            return (
                <button className="btn btn-primary" onClick={closeProject}>
                    Close Project
                </button>
            )
        } else if (state === "Mining" | state === "PendingSignature") {
            return (
                <button className="btn btn-info" onClick={closeProject}>
                    Closing Project... {loadingIcon}
                </button>
            )
        } else if (state === "Success") {
            return (
                <button className="btn btn-success" onClick={closeProject}>
                    Project Closed!
                </button>
            )
        } else {
            <button className="btn btn-danger" onClick={closeProject}>
                Failed to Close Project
            </button>

        }
        if (state === "Success" | state === "Failed") {
            setTimeout(3000)
            resetState()
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

    return (
        <Container>

            <Row>
                <Col sm={12}><br /><br /></Col>
                <Col sm={12}>
                    <button className="btn btn-primary" onClick={getTotalSupply}>
                        Get Total NFTs
                    </button>
                </Col>
            </Row>


            <Row>
                <Col sm={12}><br /><br /></Col>
                <Col sm={12}>
                    <Table striped size="md" hover={true} responsive={true}>
                        <thead><tr>
                            <th>Project #</th>    
                            <th>Open/Closed</th>
                            <th>Bounty</th>
                            <th>Title</th>
                            <th>Skills</th>
                            <th>Deadline</th>
                        </tr></thead>

                        <tbody>
                        {tokenMetadata !== undefined ? projectTable : <></>}
                        </tbody>
                    </Table>
                    {tokenMetadata === undefined ? loadingIcon : <></>}
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
                <Col md={1} ></Col>
                <Col sm={12} md={8}>
                    {
                        tokenMetadata !== undefined &
                        tokenOwner !== undefined &
                        tokenMetadataURI !== undefined &
                        tokenBounty !== undefined &
                        tokenCreator !== undefined
                        ? <Container>{prepareBetterDisplay()}</Container> : loadingIcon
                    }
                </Col>
                <Col sm={12} md={2}>
                    {closeProjectButton}
                </Col>
            </Row>

            <Row></Row>
        
    </Container>
        
    )

}
export default ListProjects;
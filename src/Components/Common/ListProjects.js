import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useCall, useCalls } from "@usedapp/core";
import map from "../../build/deployments/map.json";
import OpsNFTKovan from "../../build/deployments/42/0x072Cc7F9aBb95780fE3B4Fa4f0333DDf22308E98.json"
import { Icon } from '@iconify/react';
// import DisplayNFT from './DisplayNFT';
import { useState, useEffect } from 'react';
import { AnalyticEventTracker } from './AnalyticEventTracker';
import CallOpsNFT from "../Common/CallOpsNFT";
import { Pagination, PaginationItem, PaginationLink, Col, Container, Input, Label, Row } from 'reactstrap';
import { Table } from 'reactstrap';

import { useEthers } from "@usedapp/core";
import DisplayNFT from './DisplayNFT';
import DOMPurify from "dompurify";



const ListProjects = () => {

    const { account } = useEthers()
    const isConnected = account !== undefined
    const [loading, setLoading] = useState(true);

    const gaEventTracker = AnalyticEventTracker("ListProjects")
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[42]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    
    const [tokenId, setTokenId] = useState(0);
    const tokenDetails = CallOpsNFT("tokenDetails", [tokenId]) ?? undefined

    const totalSupply = CallOpsNFT("totalSupply") ?? undefined

    const [creatorsNFTs, setCreatorsNFTs] = useState();
    const [bulkTokenDetails, setBulkTokenDetails] = useState();


    const [selectedTokenId, setSelectedTokenId] = useState(0);
    const newTokenOwner = bulkTokenDetails !== undefined & selectedTokenId !== undefined ? (bulkTokenDetails.length > Number(selectedTokenId) ? bulkTokenDetails[Number(selectedTokenId)][0] : undefined) : undefined
    const newTokenMetadataURI = bulkTokenDetails !== undefined & selectedTokenId !== undefined ? (bulkTokenDetails.length > Number(selectedTokenId) ? bulkTokenDetails[Number(selectedTokenId)][1] : undefined) : undefined
    const newTokenBounty = bulkTokenDetails !== undefined & selectedTokenId !== undefined ? (bulkTokenDetails.length > Number(selectedTokenId) ? utils.formatEther(bulkTokenDetails[Number(selectedTokenId)][2]) : undefined) : undefined
    const newTokenCreator = bulkTokenDetails !== undefined & selectedTokenId !== undefined ? (bulkTokenDetails.length > Number(selectedTokenId) ? bulkTokenDetails[Number(selectedTokenId)][3] : undefined) : undefined

    const arrayOfNFTsFromCreator = CallOpsNFT("getArrayOfNFTsFromCreator", [account]) ?? undefined
    const calls = creatorsNFTs?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'tokenDetails',
        args: [e]
      })) ?? []
    const results = useCalls(calls) ?? []

    const [projectTable, setProjectTable] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5
    const pagesCount = bulkTokenDetails !== undefined ? bulkTokenDetails.length : undefined
    const openOrClosed = bulkTokenDetails[selectedTokenId][0] === bulkTokenDetails[selectedTokenId][0] ? "Open" : "Closed"
    const [tokenMetadata, setTokenMetadata] = useState();


    async function fetchFromIPFS(ipfsMetadata) {
        let url = ipfsMetadata.replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/")
        let response = await fetch(url, {headers: {'Accept': 'application/json'}});
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

        results.forEach(async function(result, idx) {
            if(result && result.error) {
                console.error(`Error encountered calling 'tokenDetails' on ${calls[idx]?.contract.address}: ${result.error.message}`)
            }
        })
        setBulkTokenDetails(
            results.map(r => r?.value)
        )

        let tmpProjectTable = bulkTokenDetails?.slice(
            currentPage * pageSize,
            (currentPage + 1) * pageSize
          ).map((row, idx) => {
            let key = "project-table-" + idx
            return (
                <tr key={key} onClick={() => {setSelectedTokenId(idx + currentPage * pageSize)}}>
                    <th scope="row">{idx + currentPage * pageSize}</th>
                    <td>{openOrClosed}</td>
                    <td>{row ? utils.formatEther(row[2]) : <></>}</td>
                    <td>{row ? row[1] : <></>}</td>
                    <td>{row ? row[4] : <></>}</td>
                </tr>
            )
        })
        setProjectTable(tmpProjectTable)
        
    }, [arrayOfNFTsFromCreator, results,]);

    

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

    const prepareCreatorsNFTsForDisplay = () => {
        return (
            <div key={selectedTokenId}>
                <DisplayNFT 
                    owner={newTokenOwner}
                    ipfsMetadata={newTokenMetadataURI} 
                    valueInETH={newTokenBounty} 
                    tokenId={selectedTokenId} 
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
                            <th>Metadata</th>
                        </tr></thead>

                        <tbody>
                        {bulkTokenDetails !== undefined ? projectTable : <></>}
                        </tbody>
                    </Table>
                    {bulkTokenDetails === undefined ? <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> : <></>}
                </Col>
                
                {bulkTokenDetails !== undefined ? 
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
                        bulkTokenDetails !== undefined &
                        newTokenOwner !== undefined &
                        newTokenMetadataURI !== undefined &
                        newTokenBounty !== undefined &
                        newTokenCreator !== undefined
                        ? <Container>{prepareCreatorsNFTsForDisplay()}</Container> : <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                    }
                </Col>
                <Col sm={12} md={2}>
                    <button className="btn btn-primary" onClick={getTotalSupply}>
                            Close Project
                    </button>
                </Col>
            </Row>
            <Row>
            </Row>
        
    </Container>
        
    )

}
export default ListProjects;
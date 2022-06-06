import React, {useEffect, useState} from 'react';
import { Col, Container, Label, Row, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
//Import Flatepicker
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers } from "@usedapp/core";
import map from "../../../build/deployments/map.json";
import OpsNFTKovan from "../../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"


import LoadTokenMetadataById from '../../../Components/Common/LoadTokenMetadataById';
import { Icon } from '@iconify/react';


const YourSubmissions = () => {

document.title="Your Submissions | Block Ops";
    
    const tokenMetadataById = LoadTokenMetadataById()
    const { account, chainId } = useEthers();
    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);
    const { state: RedeemState, send: RedeemSend } = useContractFunction(
        new Contract(opsNFTContractAddress, opsNFTInterface), 
        'redeemEthFromNFT'
    )

    const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>


    const [currentPage, setCurrentPage] = useState(0);
    const [redemptionTable, setRedemptionTable] = useState();

    const [selectedTokenId, setSelectedTokenId] = useState(0);
    const [readyToRedeem, setReadyToRedeem] = useState()
    const tmpReadyToRedeem = []

    const pagesCount = readyToRedeem ? readyToRedeem.length : 0
    const pageSize = 5

    

    useEffect(() => {

        if (tokenMetadataById !== undefined) {
            for (const [key, value] of Object.entries(tokenMetadataById)) {
                value['projectSubmissions'].forEach(function(sub) {
                    if (
                        sub['submitter'] === value['owner'] &
                        value['owner'] === account & 
                        value['projectState'] !== "New"
                    ) {
                        tmpReadyToRedeem.push([
                            value['tokenId'],
                            value['amountOfEthInNFT'],
                            value['projectTitle'],
                            sub['metadataURI'].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/")
                        ])
                    }
                })
            }
            setReadyToRedeem(tmpReadyToRedeem)
        }
    }, [tokenMetadataById]); 
    
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
                    <PaginationItem active={i === currentPage} key={"pagination-key-" + i}>
                    {
                        i >= 0 & i > currentPage - 5 & i < currentPage + 5 & i < pagesCount / pageSize ? 
                        <PaginationLink onClick={e => handlePaginationClick(e, i)} href="#" key={"pagination-item-key-" + i}>
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
                    key={"pagination-item-key-scroller"}
                    />
                    
                </PaginationItem>
                
                </Pagination>
        
        </div>
      )
    }

    const redeemTable = () => {
        if (readyToRedeem !== undefined) {
            if (readyToRedeem.length > 0) {
                let tmpReadyToRedeemTable = readyToRedeem.map((row, idx) => {
                    let key = "ready-to-redeem-table-" + idx
                    
                    return (<>
                        <tr key={key}>
                            <th scope="row">{row[0]}</th>
                            <td>{row[2]}</td>
                            <td>{row[1]} <Icon icon="ph:currency-eth" width="17" /></td>
                            <td>{<a className='text text-danger' href={row[3]}>Link To Submission</a>}</td>
                        </tr>
                    </>)
                })
                return (tmpReadyToRedeemTable)
            }
        }
    }

    const redeemDropdown = () => {
        if (readyToRedeem !== undefined) {
            if (readyToRedeem.length > 0) {
                return (<>
                    <Label htmlFor="submission-input" className="form-label">Submission</Label>
                    <select className="form-select" data-choices data-choices-search-false
                        id="submission-input" onChange={(e) => setSelectedTokenId(Number(e.target.value) ?? 0)}>
                        <option value="0"></option>

                        {readyToRedeem.map((row, idx) => {
                            return (<option key={idx} value={row[0] ?? 0}>Project #{row[0]} - {row[2]} - {row[1]} ETH</option>)
                        })}

                    </select>
                    
                </>)
            }
        }
    }

    const redemptionButton = () => {
        if (RedeemState.status === "Success" | tokenMetadataById[selectedTokenId]['amountOfEthInNFT'] === 0) {
            return (
                <button className="btn btn-success" onClick={() => {alert("Reward already redeemed for this token.")}}>
                    Reward Redeemed!
                </button>
            )

        } else if (RedeemState.status === undefined | RedeemState.status === "None") {
            return (
                <button className="btn btn-primary" onClick={() => {callRedeemEth()}}>
                    Redeem Reward
                </button>
            )
        } else if (RedeemState.status === "Mining" | RedeemState.status === "PendingSignature") {
            return (
                <button className="btn btn-info" onClick={() => {callRedeemEth()}}>
                    Redeeming Reward... {loadingIcon}
                </button>
            )
        } else {
            return (
                <button className="btn btn-danger" onClick={callRedeemEth()}>
                    Failed to Redeem Reward
                </button>
            )
        }
    }

    const callRedeemEth = () => {
        void RedeemSend(selectedTokenId ?? 0)
    }

    return (
    <React.Fragment>
    <div className="page-content">
    <Container fluid>
        <Row>
            <Col sm={12}>
                <h1>All Submissions</h1>
            </Col>
        </Row>
        <Row>
            <Container>
                <Row>
                    <Col sm={12}>
                    {readyToRedeem !== undefined ? <>
                            <Table striped size="md" hover={true} responsive={true}>
                                <thead><tr key="header-row">
                                    <th>Project #</th>    
                                    <th>Project Title</th>
                                    <th>Bounty</th>
                                    <th>Submission</th>
                                </tr></thead>
                                
                                <tbody>{redeemTable()}</tbody>
                        
                            </Table>
                        </> : loadingIcon}
                    </Col>
                    {readyToRedeem !== undefined ? 
                        <>
                            <Col md={3}></Col>
                            <Col sm={12} md={6}>{paginationTable()}</Col>
                            <Col md={3}></Col>
                        </> 
                        : <></>}
                </Row>
                <Row>
                    <Col md={1}></Col>
                    <Col sm={12} md={6}>
                        {redeemDropdown()}
                    </Col>
                </Row>
                <Row><Col><br /></Col></Row>
                <Row>
                    <Col md={3}></Col>
                    <Col sm={12} md={6}>
                        {readyToRedeem !== undefined ? 
                            readyToRedeem.length > 0 ? redemptionButton() : 
                            <h4>No submissions to redeem at this time...</h4> : <h4>No submissions to redeem at this time...</h4>
                        }
                    </Col>
                </Row>
            </Container>
        </Row>
    </Container>
    </div>
    </React.Fragment>
    )

}
export default YourSubmissions;
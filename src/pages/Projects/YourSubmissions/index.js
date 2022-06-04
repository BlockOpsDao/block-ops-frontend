import React, {useEffect, useState} from 'react';
import { Col, Container, Label, Row, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
//Import Flatepicker
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction, useEthers, useCalls } from "@usedapp/core";
import map from "../../../build/deployments/map.json";
import OpsNFTKovan from "../../../build/deployments/42/0x97C76c926E5bfEE1AA852F4e5986D3554eac5862.json"
import CallOpsNFT from '../../../Components/Common/CallOpsNFT';
import TweetSubmission from '../../../Components/Common/TweetSubmission';


const YourSubmissions = () => {

document.title="Your Submissions | Block Ops";

    const { account, chainId } = useEthers();
    const arrayOfSubmissions = CallOpsNFT("getTokenIdsWithSubmissionsFromAddress", [account]) ?? undefined
    const [uniqueArrayOfTokenIds, setUniqueArrayOfTokenIds] = useState();
    const [tokenMetadata, setTokenMetadata] = useState([]);
    const tmpTokenMetadata = []

    const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>

    const abi = OpsNFTKovan['abi']
    const opsNFTContractAddress = map[chainId]["OpsNFT"][0]
    const opsNFTInterface = new utils.Interface(abi);

    const winningCalls = uniqueArrayOfTokenIds?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'getWinningSubmissionForTokenId',
        args: [e]
    })) ?? []
    const winningResults = useCalls(winningCalls) ?? []

    const tokenMetadataCalls = uniqueArrayOfTokenIds?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'tokenDetails',
        args: [e]
    })) ?? []
    const tokenMetadataResults = useCalls(tokenMetadataCalls) ?? []  

    const [currentPage, setCurrentPage] = useState(0);
    const [projectTable, setProjectTable] = useState();
    const pagesCount = tokenMetadata ? tokenMetadata.length : 0
    const pageSize = 5

    const [selectedTokenId, setSelectedTokenId] = useState(0);
    const [readyToRedeem, setReadyToRedeem] = useState()
    const tmpReadyToRedeem = []

    const amountCalls = uniqueArrayOfTokenIds?.map(e => ({
        contract: new Contract(opsNFTContractAddress, opsNFTInterface),
        method: 'getAmountStoredInNFT',
        args: [e]
    })) ?? []
    const amountResults = useCalls(amountCalls) ?? []

    const amountOfEthStoredInNFT = CallOpsNFT("getAmountStoredInNFT", [selectedTokenId]) ?? undefined

    const { state: RedeemState, send: RedeemSend, resetState: RedeemResetState } = useContractFunction(
        new Contract(opsNFTContractAddress, opsNFTInterface), 
        'redeemEthFromNFT'
    )

    useEffect(() => {

        if (arrayOfSubmissions !== undefined) {
            if (arrayOfSubmissions.length > 0) {
                let tmpArrayOfTokenIds = [];
                arrayOfSubmissions[0]?.forEach(function(sub) {
                    if (!tmpArrayOfTokenIds.includes(sub.toNumber())) {
                        tmpArrayOfTokenIds.push(sub.toNumber());
                    }
                })
                setUniqueArrayOfTokenIds(tmpArrayOfTokenIds);
            }
        }

        const loadTokenMetadata = () => {
            tokenMetadataResults?.forEach(function(result, idx) {
                if(result && result.error) {
                    console.error(`Error encountered calling 'tokenDetails' on ${tokenMetadataCalls[idx]?.contract.address}: ${result.error.message}`)
                } else {
                    let tmpResult = Object.assign([], result.value)
                    let tmpOwner = tmpResult[0]
                    let tmpMetadataURI = tmpResult[1]
                    let tmpBounty = tmpResult[2]
                    let tmpCreator = tmpResult[3]
                    let tmpTokenId = tmpResult[4].toNumber()
                    let tmpProjectState = "Closed"
                    if (tmpResult[5] === 0) {
                        tmpProjectState = "New"
                    } else if (tmpResult[5] === 1) {
                        tmpProjectState = "Active"
                    }
                    let tmpSubmissions = tmpResult[6]
                    
                    tmpSubmissions.map(function(sub) {
                        let subAddr = sub[0]
                        let subIpfs = sub[1].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/")
                        if (subAddr === account) {
                            let tmpObject = [
                                tmpOwner, 
                                tmpMetadataURI, 
                                tmpBounty, 
                                tmpCreator, 
                                tmpTokenId, 
                                tmpProjectState, 
                                subAddr,
                                subIpfs,
                                amountResults[tmpTokenId].value
                            ]
                            tmpTokenMetadata.push(tmpObject)
                        }
                    })
                }
            })
            setTokenMetadata(tmpTokenMetadata)
        }

        let tmpWinningMetadata = winningResults?.forEach(function(result, idx) {
            if(result && result.error) {
                console.error(`Error encountered calling 'tokenDetails' on ${winningCalls[idx]?.contract.address}: ${result.error.message}`)
            } else {
                let tmpResult = Object.assign([], result.value[0])
                let tmpAddr = tmpResult[0]
                let tmpIpfs = tmpResult[1].replace("ipfs://", "https://block-ops.infura-ipfs.io/ipfs/")
               
                tokenMetadata?.forEach(function (row) {
                    if (tmpAddr === row[6] & tmpIpfs === row[7]) {
                        tmpReadyToRedeem.push(row) //(row.push("Won"))
                    }
                })
            }
        })
        setReadyToRedeem(tmpReadyToRedeem)

        if (tokenMetadata.length === 0) {
            loadTokenMetadata()
        }

        let tmpProjectTable = tokenMetadata?.slice(
            currentPage * pageSize,
            (currentPage + 1) * pageSize
          ).map((row, idx) => {
            let key = "return-data-table-" + idx
            let owner = row[0]
            let metadataURI = row[1]
            let bounty = utils.formatEther(row[2]).slice(0, 7)
            let creator = row[3]
            let tmpTokenId = row[4]
            let projectState = row[5]
            let subAddr = row[6]
            let subIpfs = row[7]
            let amountInNFT = Number(utils.formatEther(amountOfEthStoredInNFT[0])) ?? undefined

            return (<>
                <tr key={key}>
                    <th scope="row">{row[4]}</th>
                    <td>{projectState}</td>
                    <td>{bounty}</td>
                    <td>{<a className='text text-danger' href={subIpfs}>Link To Submission</a>}</td>
                </tr>
            </>)
        })
        setProjectTable(tmpProjectTable)

    }, [arrayOfSubmissions]); 
    
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

    const redeemDropdown = () => {
        if (readyToRedeem !== undefined) {
            if (readyToRedeem.length > 0) {
                return (<>
                    <Label htmlFor="submission-input" className="form-label">Submission</Label>
                    <select className="form-select" data-choices data-choices-search-false
                        id="submission-input" onChange={(e) => setSelectedTokenId(Number(e.target.value) ?? 0)}>
                        <option value="0"></option>
                        {readyToRedeem.map((row, idx) => {
                            let bountyInNFT = Number(utils.formatEther(row[2]))
                            let projectId = row[4] ?? 0
                            return (<option key={idx} value={projectId ?? 0}>Project #{projectId} - {bountyInNFT} ETH</option>)
                        })}
                    </select>
                    
                </>)
            }
        }
    }

    const redemptionButton = () => {

        if (RedeemState.status === "Success" | Number(utils.formatEther(amountOfEthStoredInNFT[0])) === 0) {
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
                    {tokenMetadata !== undefined & tokenMetadata.length !== 0 ? <>
                            <Table striped size="md" hover={true} responsive={true}>
                                <thead><tr key="header-row">
                                    <th>Project #</th>    
                                    <th>Open/Closed</th>
                                    <th>Bounty</th>
                                    <th>Submission</th>
                                </tr></thead>

                                <tbody>{projectTable}</tbody>
                        
                            </Table>
                        </> : loadingIcon}
                    </Col>
                    {tokenMetadata !== undefined ? 
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
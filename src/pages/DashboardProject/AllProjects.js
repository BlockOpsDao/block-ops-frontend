import React, { useEffect, useState } from "react";
import { Table, Row, Col, Container, Label } from "reactstrap";
import LoadTokenMetadataById from "../../Components/Common/LoadTokenMetadataById";
import AllSkills from "../../Components/Common/AllSkills";
import Moment from 'moment';
import { shortenAddress } from '@usedapp/core';
import DisplayNFTWOCalling from '../../Components/Common/DisplayNFTWoCalling';



const AllProjects = () => {
    const tokenMetadataById = LoadTokenMetadataById();
    const allskills = AllSkills();

    const [filterSkills, setFilterSkills] = useState("None");
    const [filterState, setFilterState] = useState("None");
    const [selectedTokenId, setSelectedTokenId] = useState();

    const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>

      
    const displayTable = () => {
        if (Object.entries(tokenMetadataById).length > 0 ) {

            var filtered = Object.fromEntries(
                Object.entries(tokenMetadataById)
                    .filter(
                        function([tokenIndex, metadataDict]) {
                            if (filterSkills !== "None") {
                                if (metadataDict !== false) {
                                    metadataDict = metadataDict['projectSkills'].includes(filterSkills)
                                }
                            } 
                            return metadataDict
                        } 
                    ).filter(
                        function([tidx, metadataDict]) {
                            if (filterState !== "None") {
                                if (metadataDict !== false) {
                                    metadataDict = metadataDict['projectState'] === filterState
                                }
                            }
                            return metadataDict
                        }
                    )
                ) ?? [];
                
            if (Object.entries(filtered).length === 0) {
                filtered = undefined
            }
            

            let tableBody = []
            if (filtered !== undefined) {
                for (const [key, value] of Object.entries(filtered) ) {
                    
                    tableBody.push(<tr key={"table-body-key-" + key} onClick={() => {setSelectedTokenId(value['tokenId'])}}>
                        <th scope="row">{value['tokenId']}</th>
                        <td>{value['projectTitle']}</td>
                        <td><a href={value['ipfsURI']} className='text text-info'>Link</a></td>
                        <td>{Moment(value['projectDeadline']).format('YYYY-MM-DD')}</td>
                        <td><a href="#" className='text text-info'>{shortenAddress(value['creator'])}</a></td>
                        <td>{value['projectState']}</td>
                        <td>{value['numberOfSubmissions']}</td>
                        <td>[{value['projectSkills'].join(', ')}]</td>
                        <td>{value['amountOfEthInNFT']}</td>
                    </tr>)
                } 
            } else {
                tableBody.push(<tr key="table-body-key-empty">
                    <th scope="row">-</th>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>)
            }
        
            return (<>
                <Table 
                    striped 
                    size="md" 
                    hover={true} 
                    responsive={true}
                >
                    <thead><tr key="header-row">
                        <th>Project #</th>
                        <th>Project Title</th>
                        <th>Metdata</th>
                        <th>Deadline</th>
                        <th>Project Creator</th>
                        <th>State</th>
                        <th># Submissions</th>
                        <th>Skills</th>
                        <th>Bounty (in ETH)</th>
                    </tr></thead>
                    
                    <tbody>{tableBody}</tbody>
            
                </Table>
            </>)
        } else {
            return (loadingIcon)
        }
    }

    const skillsDropdownValues = () => {
        if (allskills.length > 0) {
            let tmpSkills = [<option value="None" key="first-option-dropdown"></option>]
            allskills.forEach(function(e, idx) {
                tmpSkills.push(<option key={"skills-dropdown-option-" + idx} value={e}>{e}</option>)
            })
            return tmpSkills
        }
    }

    const stateDropdownValues = () => {
        return (<>
            <Label htmlFor="project-state-input" className="form-label">State</Label>
            <select className="form-select" data-choices data-choices-search-false
                id="project-state-input" onChange={(e) => setFilterState(e.target.value)}>
                <option value="None" key="none-state-dropdown"></option>
                <option value="New" key="new-state-dropdown">New</option>
                <option value="Active" key="active-state-dropdown">Active</option>
                <option value="Closed" key="closed-state-dropdown">Closed</option>
            </select>
        </>)
    }

    const displayNFT = () => {
        if (selectedTokenId === undefined) {
            return <></>
        } else {

            return <DisplayNFTWOCalling 
                        owner={tokenMetadataById[selectedTokenId]['owner']}
                        valueInETH={tokenMetadataById[selectedTokenId]['amountOfEthInNFT']}
                        ipfsMetadata={tokenMetadataById[selectedTokenId]['ipfsURI']}
                        tokenId={tokenMetadataById[selectedTokenId]['tokenId']}
                        projectState={tokenMetadataById[selectedTokenId]['projectState']}
                        projectName={tokenMetadataById[selectedTokenId]['projectTitle']}
                        projectDescription={tokenMetadataById[selectedTokenId]['projectDescription']}
                        projectPriority={tokenMetadataById[selectedTokenId]['projectPriority']}
                        projectSkills={tokenMetadataById[selectedTokenId]['projectSkills']}
                        projectDeadline={tokenMetadataById[selectedTokenId]['projectDeadline'].toString()}
                        projectImageURI={tokenMetadataById[selectedTokenId]['ipfsImageURI']}
                    />
        }
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container>
                    <Row>
                        <Col sm={12} md={4}>
                            <Label htmlFor="project-skills-input" className="form-label">Skills</Label>
                            <select className="form-select" data-choices data-choices-search-false
                                id="project-skills-input" onChange={(e) => setFilterSkills(e.target.value)}>
                                
                                {skillsDropdownValues()}
                            </select>
                        </Col>
                        <Col sm={12} md={4}>
                            {stateDropdownValues()}
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={12} md={8}>
                            {displayTable()}
                        </Col>
                        <Col sm={12} md={4}>
                            {displayNFT()}
                        </Col>
                    
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default AllProjects;
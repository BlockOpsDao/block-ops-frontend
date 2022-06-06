import React, {useEffect, useState} from 'react';
import { Card, CardBody, Col, Container, Row, CardTitle } from 'reactstrap';
import { Icon } from '@iconify/react';
import { TourMethods } from 'react-shepherd';
import DOMPurify from "dompurify";


const DisplayNFTWoCalling = (args) => {

    let owner = args['owner']
    let ipfsMetadata = args['ipfsMetadata']
    let valueInETH = args['valueInETH']
    let tokenId = args['tokenId']
    let projectState = args['projectState']
    let projectName = args['projectName']
    let projectDescription = args['projectDescription']
    let projectPriority = args['projectPriority']
    let projectSkills = args['projectSkills']
    let projectDeadline = args['projectDeadline']
    let projectImageURI = args['projectImageURI']

    if (owner !== undefined) {
        return (
            
            <Card>
                <CardBody>
                  <center>
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
                                    <td>{tokenId}</td>
                                </tr>
                                <tr>
                                    <td>Project State</td>
                                    <td>{projectState}</td>
                                </tr>
                                <tr>
                                    <td>Value (in ETH)</td>
                                    <td>{String(valueInETH).slice(0, 7)} <Icon icon="ph:currency-eth" width="17" /></td>
                                </tr>
                                <tr>
                                    <td>Priority</td>
                                    <td>{projectPriority}</td>
                                </tr>
                                <tr>
                                    <td>Deadline</td>
                                    <td>{projectDeadline}</td>
                                </tr>
                                <tr>
                                    <td>Required Skills</td>
                                    <td>
                                    <ul className="list-inline d-flex align-items-center g-3 text-muted fs-14 mb-0">
                                        {projectSkills.join(', ')}
                                    </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Submitter</td>
                                    <td>{owner}</td>
                                </tr>
                                <tr>
                                    <td>IPFS Hash</td>
                                    <td><a href={ipfsMetadata} className="text text-danger">{ipfsMetadata}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  </center>
                </CardBody>
            </Card>
        )
    } else {
        return <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>;
    }

}
export default DisplayNFTWoCalling;
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import CountUp from "react-countup";
import { ProjectsOverviewCharts } from './DashboardProjectCharts';
import CallOpsNFT from '../../Components/Common/CallOpsNFT';
import { Icon } from '@iconify/react';
import { utils } from 'ethers'


const ProjectsOverview = () => {

    const totalEthPaidOut = CallOpsNFT("getTotalEthPaidOut") ?? undefined
    const totalBountyAvailable = CallOpsNFT("totalBountyAmount") ?? undefined
    const totalSupply = CallOpsNFT("totalSupply") ?? undefined

    const [getTotalEthPaidOut, setGetTotalEthPaidOut] = useState();
    const [getTotalBountyAvailable, setGetTotalBountyAvailable] = useState();
    const [getTotalSupply, setGetTotalSupply] = useState();

    useEffect(() => {


        if (getTotalEthPaidOut === undefined) {
            console.log("inside getTotalEthPaidOut")
            if (totalEthPaidOut !== undefined) {
                console.log("Number(utils.formatEther(totalEthPaidOut[0])): ", Number(utils.formatEther(totalEthPaidOut[0])))
                setGetTotalEthPaidOut(Number(utils.formatEther(totalEthPaidOut[0])))
            }
        }

        if (getTotalBountyAvailable === undefined) {
            if (totalBountyAvailable !== undefined) {
                setGetTotalBountyAvailable(Number(utils.formatEther(totalBountyAvailable[0])))
            }
        }

        if (getTotalSupply === undefined) {
            if (totalSupply !== undefined) {
                setGetTotalSupply(Number(totalSupply))
            }
        }
       
    }, [totalSupply]);
    
    
    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader className="border-0 align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Projects Overview</h4>
                            <div className="d-flex gap-1">
                                <button type="button" className="btn btn-soft-secondary btn-sm">
                                    ALL
                                </button>
                                <button type="button" className="btn btn-soft-secondary btn-sm">
                                    1M
                                </button>
                                <button type="button" className="btn btn-soft-secondary btn-sm">
                                    6M
                                </button>
                                <button type="button" className="btn btn-soft-primary btn-sm">
                                    1Y
                                </button>
                            </div>
                        </CardHeader>

                        <CardHeader className="p-0 border-0 bg-soft-light">
                            <Row className="g-0 text-center">
                                <Col xs={6} sm={4}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1"><span className="counter-value" data-target="9851">
                                            <CountUp
                                                start={0}
                                                end={getTotalSupply}
                                                separator={","}
                                                duration={4}
                                            />
                                        </span></h5>
                                        <p className="text-muted mb-0">Number of Projects</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={4}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1"><span className="counter-value">
                                            <CountUp
                                                start={0}
                                                end={getTotalEthPaidOut}
                                                separator={","}
                                                decimals={2}
                                                duration={4}
                                            />
                                        </span><Icon icon="ph:currency-eth" width="17" /> </h5>
                                        <p className="text-muted mb-1">Total ETH Paid Out</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={4}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1"><span className="counter-value" data-target="228.89">
                                            <CountUp
                                                start={0}
                                                end={getTotalBountyAvailable}
                                                decimals={2}
                                                duration={4}
                                            />
                                        </span><Icon icon="ph:currency-eth" width="17" /></h5>
                                        <p className="text-muted mb-0">Total Bounty Available</p>
                                    </div>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="p-0 pb-2">
                            <div>
                                <div dir="ltr" className="apex-charts">
                                    <ProjectsOverviewCharts />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProjectsOverview;
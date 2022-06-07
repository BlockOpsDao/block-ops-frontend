import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import CountUp from "react-countup";
import { ProjectsOverviewCharts } from './DashboardProjectCharts';
import CallOpsNFT from '../../Components/Common/CallOpsNFT';
import { Icon } from '@iconify/react';
import { utils } from 'ethers'
import LoadTokenMetadataById from '../../Components/Common/LoadTokenMetadataById';


const ProjectsOverview = () => {
    const tokenMetadataById = LoadTokenMetadataById()
    
    const tmpTotalEthPaidOut = CallOpsNFT("getTotalEthPaidOut") ?? undefined
    const [totalBountyAmount, setTotalBountyAmount] = useState();
    const [totalSupply, setTotalSupply] = useState();
    const [totalEthPaidOut, setTotalEthPaidOut] = useState();
    

    useEffect(() => {

        if (totalBountyAmount === undefined | totalSupply === undefined) {
            let tmpTotalBountyAmount = 0;
            let tmpTotalSupply = 0;

            for (const [key, value] of Object.entries(tokenMetadataById)) {
                tmpTotalBountyAmount += value['amountOfEthInNFT']
                tmpTotalSupply += 1
            }
            setTotalBountyAmount(tmpTotalBountyAmount)
            setTotalSupply(tmpTotalSupply)
        }

        if (totalEthPaidOut === undefined & tmpTotalEthPaidOut !== undefined) {
            setTotalEthPaidOut(utils.formatEther(tmpTotalEthPaidOut[0]))
        }
       
    }, [tokenMetadataById]);
    
    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader className="border-0 align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Projects Overview</h4>
                            {/* <div className="d-flex gap-1">
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
                            </div> */}
                        </CardHeader>

                        <CardHeader className="p-0 border-0 bg-soft-light">
                            <Row className="g-0 text-center">
                                <Col xs={6} sm={4}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1"><span className="counter-value" data-target="9851">
                                            <CountUp
                                                start={0}
                                                end={totalSupply}
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
                                                end={Number(totalEthPaidOut)}
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
                                                end={totalBountyAmount}
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
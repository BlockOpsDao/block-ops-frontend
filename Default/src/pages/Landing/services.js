import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Icon } from '@iconify/react';

const Services = () => {
    return (
        <React.Fragment>
            <section className="section" id="services">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h1 className="mb-3 ff-secondary fw-semibold lh-base">A decentralized marketplace connecting do-ers with what needs to be done.</h1>
                                <p className="text-muted">To achieve this, we facilitate the creation of test-driven Escrow Contracts as Non-Fungible Tokens (NFTs). Whoever completes the contract receives the Escrow funds to redeem and the NFT to display on their resume.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row className="g-3">
                        <Col lg={4}>
                            <div className="d-flex p-3">
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm icon-effect">
                                        <div className="avatar-title bg-transparent text-success rounded-circle">
                                            <i className="ri-stack-line fs-36"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="fs-18">Trustless Development</h5>
                                    <p className="text-muted my-3 ff-secondary">We remove the hiring bottleneck by connecting developers directly to the work that needs to be done.</p>
                                    
                                    <div>
                                        <Link to="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="d-flex p-3">
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm icon-effect">
                                        <div className="avatar-title bg-transparent text-success rounded-circle">
                                            {/* <Icon icon="icon-park-outline:blockchain" width="100"/> */}
                                            <Icon icon="fluent:payment-28-regular" width="200" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="fs-18">Payment Management</h5>
                                    <p className="text-muted my-3 ff-secondary">All payments are handled natively via Smart Contracts removing the need for expensive fees imposed by recruiting agencies.</p>
                                    <div>
                                        <Link to="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="d-flex p-3">
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm icon-effect">
                                        <div className="avatar-title bg-transparent text-success rounded-circle">
                                            <i className="ri-lightbulb-flash-line fs-36"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="fs-18">First-Rate Solutions</h5>
                                    <p className="text-muted my-3 ff-secondary">Providing requirements to all developers in the world assures the best possible solution rather than any single solution a developer can provide.</p>
                                   
                                    <div>
                                        <Link to="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="d-flex p-3">
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm icon-effect">
                                        <div className="avatar-title bg-transparent text-success rounded-circle">
                                            <Icon icon="ph:currency-eth" width="200" />                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="fs-18">Blockchain Security</h5>
                                    <p className="text-muted my-3 ff-secondary">We ensure that your solution remains your Intellectual Property by leveraging the security of the Ethereum Blockchain.</p>
                                    <div>
                                        <Link to="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="d-flex p-3">
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm icon-effect">
                                        <div className="avatar-title bg-transparent text-success rounded-circle">
                                            <Icon icon="cil:badge" width="200" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="fs-18">Proof of Work</h5>
                                    <p className="text-muted my-3 ff-secondary">The Developer who delivers the solution is provided with an NFT, proving their skillset to the world.</p>
                                    <div>
                                        <Link to="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="d-flex p-3">
                                <div className="flex-shrink-0 me-3">
                                    <div className="avatar-sm icon-effect">
                                        <div className="avatar-title bg-transparent text-success rounded-circle">
                                            <i className="ri-settings-2-line fs-36"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="fs-18">Easy to Customize</h5>
                                    <p className="text-muted my-3 ff-secondary">Our admin portal provides a streamlined interface to post new contracts and solutions without needing to become an expert in Web3 & Blockchain Technologies.</p>
                                    <div>
                                        <Link to="#" className="fs-13 fw-medium">Learn More <i className="ri-arrow-right-s-line align-bottom"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default Services;
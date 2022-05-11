import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

// Import Images
import logolight from "../../assets/images/logo-light.png";
import imagelogo from "../../assets/images/svg/block-ops/block-ops-icon-2048.svg";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="custom-footer bg-dark py-5 position-relative">
                <Container>
                    <Row>
                        <Col lg={4} className="mt-4">
                            <div>
                                <div>
                                    <img src={imagelogo}  alt="logo dark" height="55" /> Block-Ops
                                </div>
                                <div className="mt-4">
                                    <p>Block-Ops</p>
                                    <p className="ff-secondary">A decentralized marketplace connecting do-ers with what needs to be done.</p>
                                </div>
                            </div>
                        </Col>

                        <Col lg={7} className="ms-lg-auto">
                            <Row>
                                <Col sm={4} className="mt-4">
                                    <h5 className="text-white mb-0">Block-Ops</h5>
                                    <div className="text-muted mt-3">
                                        <ul className="list-unstyled ff-secondary footer-list">
                                            <li><a href="#team">About Us</a></li>
                                            <li><a href="#timeline">Timeline</a></li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col sm={4} className="mt-4">
                                    <h5 className="text-white mb-0">Support</h5>
                                    <div className="text-muted mt-3">
                                        <ul className="list-unstyled ff-secondary footer-list">
                                            <li><a href="#faqs">FAQ</a></li>
                                            <li><a href="#contact">Contact</a></li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                    </Row>

                    <Row className="text-center text-sm-start align-items-center mt-5">
                        <Col sm={6}>

                            <div>
                                <p className="copy-rights mb-0">
                                    {new Date().getFullYear()} © BlockOpsDao
                                </p>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end mt-3 mt-sm-0">
                                <ul className="list-inline mb-0 footer-social-link">
                                    <li className="list-inline-item">
                                        <a href="https://github.com/BlockOpsDao" className="avatar-xs d-block">
                                            <div className="avatar-title rounded-circle">
                                                <i className="ri-github-fill"></i>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="https://twitter.com/dao_block" className="avatar-xs d-block">
                                            <div className="avatar-title rounded-circle">
                                                <i className="ri-twitter-line"></i>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment >
    );
};

export default Footer;
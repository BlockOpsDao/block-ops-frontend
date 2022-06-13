import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Web3Wallet from '../../Components/Common/Web3Wallet';
import EnterApp from '../../Components/Common/EnterApp';

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Import Images
import imgpattern from "../../assets/images/landing/img-pattern.png";

const Home = () => {
    return (
        <React.Fragment>
            <section className="section pb-0 hero-section" id="hero">
                <div className="bg-overlay bg-overlay-pattern"></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} sm={10}>
                            <div className="text-center mt-lg-5 pt-5">
                                <h1 className="display-6 fw-semibold mb-3 lh-base">Providing a marketplace for trustless work with  <span
                                    className="text-success">Block-Ops </span></h1>
                                <p className="lead text-muted lh-base">Block-Ops changes the way developers work by allowing everyone to contribute and rewarding those with the best solution.</p>
                                <br />
                                <br />
                                <br />

                                <div className="d-flex gap-2 justify-content-center mt-4">
                                    <Web3Wallet /><br /><br />
                                    
                                    <EnterApp /><br /><br />
                                </div>
                                
                            </div>

                            <div className='mt-4 mt-sm-5 pt-sm-5 mb-sm-n5 demo-carousel'>
                                <div className="demo-img-patten-top d-none d-sm-block">
                                    <img src={imgpattern} className="d-block img-fluid" alt="..." />
                                </div>
                                <div className="demo-img-patten-bottom d-none d-sm-block">
                                    <img src={imgpattern} className="d-block img-fluid" alt="..." />
                                </div>
                                <br />
                                <br />
                                <br />

                            </div>
                        </Col>
                    </Row>
                </Container>

                <div className="position-absolute start-0 end-0 bottom-0 hero-shape-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1440 120">
                        <g mask="url(&quot;#SvgjsMask1003&quot;)" fill="none">
                            <path d="M 0,118 C 288,98.6 1152,40.4 1440,21L1440 140L0 140z">
                            </path>
                        </g>
                    </svg>
                </div>

            </section>
        </React.Fragment>
    );
};

export default Home;
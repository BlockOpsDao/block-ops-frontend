import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Icon } from '@iconify/react';


import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


const ProjectTimeline = () => {
    
    SwiperCore.use([FreeMode, Navigation, Thumbs]);
    const [thumbsSwiper] = useState(null);

    return (
        <React.Fragment>
            <section className="section bg-light" id="timeline">

                <Container>
                    <Row className="mt-4">
                        <Col lg={12}>
                            <div>
                                <div className="text-center mb-5">
                                    <h3 className="mb-3 fw-semibold">Block-Ops <span className="text-danger">Timeline</span></h3>
                                </div>
                                <div className="horizontal-timeline my-3">
                                <Swiper className="timelineSlider"
                                        navigation={true}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        slidesPerView={5}
                                    >                                      
                                        <div className="swiper-wrapper">
                                            <SwiperSlide>
                                                <div className="card pt-2 border-0 item-box text-center">
                                                    <div className="timeline-content p-3 rounded">
                                                        <div>
                                                            <p className="text-muted fw-medium mb-0">January, 2022</p>
                                                            <h6 className="mb-0">Web3 dApp Deployment</h6>
                                                        </div>
                                                    </div>
                                                    <div className="time">
                                                        <Icon icon="bxs:check-circle" />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="card pt-2 border-0 item-box text-center">
                                                    <div className="timeline-content p-3 rounded">
                                                        <div>
                                                            <p className="text-muted mb-1">February, 2022</p>
                                                            <h6 className="mb-0">Smart Contract Development</h6>
                                                        </div>
                                                    </div>
                                                    <div className="time">
                                                        <Icon icon="bxs:check-circle" />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="card pt-2 border-0 item-box text-center">
                                                    <div className="timeline-content p-3 rounded">
                                                        <div>
                                                            <p className="text-muted mb-1">March, 2022</p>
                                                            <h6 className="mb-0">Deploy to Rinkeby</h6>
                                                        </div>
                                                    </div>
                                                    <div className="time"><Icon icon="bxs:check-circle" /></div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="card pt-2 border-0 item-box text-center">
                                                    <div className="timeline-content p-3 rounded">
                                                        <div>
                                                            <p className="text-muted mb-1">May, 2022</p>
                                                            <h6 className="mb-0">Upgrade Escrow functionality</h6>
                                                        </div>
                                                    </div>
                                                    <div className="time"><Icon icon="bxs:check-circle" /></div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="card pt-2 border-0 item-box text-center">
                                                    <div className="timeline-content p-3 rounded">
                                                        <div>
                                                            <p className="text-muted mb-1">June, 2022</p>
                                                            <h6 className="mb-0">Beta-Release on Kovan</h6>
                                                        </div>
                                                    </div>
                                                    <div className="time"><Icon icon="carbon:pending-filled" /></div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="card pt-2 border-0 item-box text-center">
                                                    <div className="timeline-content p-3 rounded">
                                                        <div>
                                                            <p className="text-muted mb-1">July, 2022</p>
                                                            <h6 className="mb-0">zkSync 2.0 Deployment</h6>
                                                        </div>
                                                    </div>
                                                    <div className="time"><Icon icon="carbon:pending-filled" /></div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="card pt-2 border-0 item-box text-center">
                                                    <div className="timeline-content p-3 rounded">
                                                        <div>
                                                            <p className="text-muted mb-1">August, 2022</p>
                                                            <h6 className="mb-0">Block-Ops DAO Token Sale</h6>
                                                        </div>
                                                    </div>
                                                    <div className="time"><Icon icon="carbon:pending-filled" /></div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <div className="card pt-2 border-0 item-box text-center">
                                                    <div className="timeline-content p-3 rounded">
                                                        <div>
                                                            <p className="text-muted mb-1">September, 2022</p>
                                                            <h6 className="mb-0">Mainnet Deployment</h6>
                                                        </div>
                                                    </div>
                                                    <div className="time"><Icon icon="carbon:pending-filled" /></div>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                        {/* <div className="swiper-button-next"></div>
                                        <div className="swiper-button-prev"></div> */}
                                    </Swiper>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
        </React.Fragment>
    )
}

export default ProjectTimeline


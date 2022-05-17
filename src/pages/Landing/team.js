import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import zachbloss from "../../assets/images/team/zach-bloss.jpeg";


const Team = () => {
    return (
        <React.Fragment>
            <section className="section bg-light" id="team">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-semibold">Our <span className="text-danger">Team</span></h3>
                                <p className="text-muted mb-4 ff-secondary">Our core team, and yep it's just Zach...<span className="text-danger"> For Now!</span></p>
                                
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}></Col>
                        <Col lg={4} sm={12}>
                            <Card>
                                <CardBody className="text-center p-4">
                                    <div className="avatar-xl mx-auto mb-4 position-relative">
                                        <img src={zachbloss} alt="" className="img-fluid rounded-circle" />
                                        <a href="mailto:zacharybloss@gmail.com"
                                            className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                            <div className="avatar-title bg-transparent">
                                                <i className="ri-mail-fill align-bottom"></i>
                                            </div>
                                        </a>
                                        <a href="https://www.linkedin.com/in/zachary-bloss/" className="btn btn-primary bottom-0 start-50 btn-sm position-absolute rounded-circle avatar-xs">
                                            <div className='avatar-title bg-transparent'>
                                                <Icon icon="ri:linkedin-box-fill" className="align-bottom" />
                                            </div>
                                        </a>
                                    </div>

                                    {/* <!-- end card body --> */}
                                    <h5 className="mb-1"><Link to="/pages-profile" className="text-body">Zach Bloss</Link></h5>
                                    <p className="text-muted mb-0 ff-secondary">Founder & Lead Developer</p>
                                </CardBody>
                            </Card>

                            {/* <!-- end card --> */}
                        </Col>
                        <Col lg={4}></Col>

                        {/* <!-- end col --> */}
                    </Row>
                    {/* <!-- end row --> */}
                </Container>
            </section>
        </React.Fragment>
    );
};

export default Team;
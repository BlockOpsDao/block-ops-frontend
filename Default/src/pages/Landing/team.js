import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

// Import Images
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar10 from "../../assets/images/users/avatar-10.jpg";
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
                                        <Link to="mailto:zacharybloss@gmail.com"
                                            className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle avatar-xs">
                                            <div className="avatar-title bg-transparent">
                                                <i className="ri-mail-fill align-bottom"></i>
                                            </div>
                                        </Link>
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
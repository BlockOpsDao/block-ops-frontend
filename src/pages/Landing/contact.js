import React from 'react';
import { Col, Container, Form, Row } from 'reactstrap';
import EmailUs from '../../Components/Common/EmailUs';
import TwitterFollow from '../../Components/Common/TwitterFollow';
import TwitterTweet from '../../Components/Common/TwitterTweet';

const Contact = () => {
    return (
        <React.Fragment>
            <section className="section" id="contact">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-semibold">Get In Touch</h3>
                                <p className="text-muted mb-4 ff-secondary">We appreciate any and all feedback, especially as we are a rapidly growing project aiming to provide a first-class experience to both our network of contract posters and the world's developers.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <div className='mb-4'>
                                <EmailUs />
                            </div>
                            <div className='mb-4'>
                                <TwitterTweet />
                            </div>
                            <div className='mb-4'>
                                <TwitterFollow />
                            </div>
                        </Col>
                        <Col lg={8}>
                            <a className="twitter-timeline" data-theme="dark" href="https://twitter.com/dao_block?ref_src=twsrc%5Etfw">Tweets by dao_block</a>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default Contact;
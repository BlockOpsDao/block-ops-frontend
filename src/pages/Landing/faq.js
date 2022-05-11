import React, { useState } from 'react';
import { Col, Container, Row, Collapse } from 'reactstrap';
import classnames from "classnames";
import TwitterTweet from '../../Components/Common/TwitterTweet';
import EmailUs from '../../Components/Common/EmailUs';

const Faqs = () => {

    const [col1, setcol1] = useState(true);
    const [col2, setcol2] = useState(false);
    const [col3, setcol3] = useState(false);
    const [col4, setcol4] = useState(false);

    const [col9, setcol5] = useState(false);
    const [col10, setcol6] = useState(true);
    const [col11, setcol7] = useState(false);
    const [col12, setcol8] = useState(false);

    const t_col1 = () => {
        setcol1(!col1);
        setcol2(false);
        setcol3(false);
        setcol4(false);

    };

    const t_col2 = () => {
        setcol2(!col2);
        setcol1(false);
        setcol3(false);
        setcol4(false);

    };

    const t_col3 = () => {
        setcol3(!col3);
        setcol1(false);
        setcol2(false);
        setcol4(false);

    };

    const t_col4 = () => {
        setcol4(!col4);
        setcol1(false);
        setcol2(false);
        setcol3(false);
    };

    const t_col5 = () => {
        setcol5(!col9);
        setcol6(false);
        setcol7(false);
        setcol8(false);

    };

    const t_col6 = () => {
        setcol6(!col10);
        setcol7(false);
        setcol8(false);
        setcol5(false);

    };

    const t_col7 = () => {
        setcol7(!col11);
        setcol5(false);
        setcol6(false);
        setcol8(false);

    };

    const t_col8 = () => {
        setcol8(!col12);
        setcol5(false);
        setcol6(false);
        setcol7(false);
    };

    return (
        <React.Fragment>
            <section className="section" id="faqs">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <h3 className="mb-3 fw-semibold">Frequently Asked Questions</h3>
                                <p className="text-muted mb-4 ff-secondary">If you can not find answer to your question in our FAQ, you can
                                    always contact us or email us. We will answer you shortly!</p>

                                <div className="">
                                    <EmailUs />
                                    <TwitterTweet />
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="g-lg-5 g-4">
                        <Col lg={6}>
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-shrink-0 me-1">
                                    <i className="ri-question-line fs-24 align-middle text-success me-1"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="mb-0 fw-semibold">General Questions</h5>
                                </div>
                            </div>
                            <div className="accordion custom-accordionwithicon custom-accordion-border accordion-border-box"
                                id="genques-accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="genques-headingOne">
                                        <button
                                            className={classnames(
                                                "accordion-button",
                                                "fw-medium",
                                                { collapsed: !col1 }
                                            )}
                                            type="button"
                                            onClick={t_col1}
                                            style={{ cursor: "pointer" }}
                                        >
                                            Why use Block-Ops vs hiring someone directly?
                                        </button>
                                    </h2>
                                    <Collapse isOpen={col1} className="accordion-collapse">
                                        <div className="accordion-body ff-secondary">
                                            The traditional hiring method of sourcing, recruiting, & interviewing candidates is a long and costly process, and even once completed you entrust a single developer to provide a solution to a problem you have now. By utilizing Block-Ops, you directly engage the entire world of developers to solve your problem, circumventing the recruiting process altogether.
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="genques-headingTwo">
                                        <button
                                            className={classnames(
                                                "accordion-button",
                                                "fw-medium",
                                                { collapsed: !col2 }
                                            )}
                                            type="button"
                                            onClick={t_col2}
                                            style={{ cursor: "pointer" }}
                                        >
                                            What if I want to hire the developer who consistently delivers?
                                        </button>
                                    </h2>
                                    <Collapse isOpen={col2} className="accordion-collapse">
                                        <div className="accordion-body ff-secondary">
                                            That is fantastic! Block-Ops is here to facilitate the relationship between work that needs to be done and those who can do it. We are not in the business of hiring developers directly, but if you are we are very proud to be the platform that spawned the relationship.
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="genques-headingThree">
                                        <button
                                            className={classnames(
                                                "accordion-button",
                                                "fw-medium",
                                                { collapsed: !col3 }
                                            )}
                                            type="button"
                                            onClick={t_col3}
                                            style={{ cursor: "pointer" }}
                                        >
                                            What is the incentive for developers?
                                        </button>
                                    </h2>
                                    <Collapse isOpen={col3} className="accordion-collapse">
                                        <div className="accordion-body ff-secondary">
                                            We have designed our smart contracts as NFTs that double as decentralized escrow accounts as well. Upon creation of a contract, the creator stores a bounty inside the NFT and upon completion of work, the developer can redeem these funds as payment.<br /><br />

                                            Alongside the monetary incentive, the NFT serves as a proof-of-work done that the developer will carry with them forever. This can be displayed on a resume, social media profile, and even here on Block-Ops! 
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="genques-headingFour">
                                        <button
                                            className={classnames(
                                                "accordion-button",
                                                "fw-medium",
                                                { collapsed: !col4 }
                                            )}
                                            type="button"
                                            onClick={t_col4}
                                            style={{ cursor: "pointer" }}
                                        >
                                            Whats the big deal about "Web3" or "Blockchain"?
                                        </button>
                                    </h2>
                                    <Collapse isOpen={col4} className="accordion-collapse">
                                        <div className="accordion-body ff-secondary">
                                            There is a ton of excitement in Web3, Blockchain, and NFTs; some of it is admittedly over-hyped.<br /><br />

                                            That being said, using smart contracts as a secure and cheap way to provide trusted payments between two parties is a use-case this technology has been serving for a decade. When you boil NFTs down past the 8-bit avatars and funky looking apes, they are a means to prove uniqueness and validity which is exactly why we deliberately chose to make them a conerstone of our platform.
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        </Col>

                        <Col lg={6}>
                            <div className="d-flex align-items-center mb-2">
                                <div className="flex-shrink-0 me-1">
                                    <i className="ri-shield-keyhole-line fs-24 align-middle text-success me-1"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="mb-0 fw-semibold">Privacy &amp; Security</h5>
                                </div>
                            </div>

                            <div className="accordion custom-accordionwithicon custom-accordion-border accordion-border-box"
                                id="privacy-accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="privacy-headingOne">
                                        <button
                                            className={classnames(
                                                "accordion-button",
                                                "fw-medium",
                                                { collapsed: !col9 }
                                            )}
                                            type="button"
                                            onClick={t_col5}
                                            style={{ cursor: "pointer" }}
                                        >
                                            Is this platform secure?
                                        </button>
                                    </h2>
                                    <Collapse isOpen={col9} className="accordion-collapse">
                                        <div className="accordion-body ff-secondary">
                                            The short answer is yes. We maintain excellent levels of code coverage and routinely audit our smart contracts for any new exploits or vulnerabilities.
                                            
                                            <br /><br />The longer answer gets into the nitty gritty of ethereum blockchain security, but connect with us on Twitter. We're happy to geek out over the details!<br /><br />

                                            <TwitterTweet />
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="privacy-headingTwo">
                                        <button
                                            className={classnames(
                                                "accordion-button",
                                                "fw-medium",
                                                { collapsed: !col10 }
                                            )}
                                            type="button"
                                            onClick={t_col6}
                                            style={{ cursor: "pointer" }}
                                        >
                                            Is my work publicly-available or is it private?
                                        </button>
                                    </h2>
                                    <Collapse isOpen={col10} className="accordion-collapse">
                                        <div className="accordion-body ff-secondary">
                                            We use a revolutionary technology called <span className="text text-danger">zero-knowledge</span> proofs that ensures that the developer has all the access they need to test solutions against your existing codebase but not enough access to do anything remotely malicious. This allows your problems and solutions remain your Intellectual Property without being publicly available.
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="privacy-headingThree">
                                        <button
                                            className={classnames(
                                                "accordion-button",
                                                "fw-medium",
                                                { collapsed: !col11 }
                                            )}
                                            type="button"
                                            onClick={t_col7}
                                            style={{ cursor: "pointer" }}
                                        >
                                            How long is my code stored?
                                        </button>
                                    </h2>
                                    <Collapse isOpen={col11} className="accordion-collapse">
                                        <div className="accordion-body ff-secondary">
                                            We are excited to say <span className='text text-danger'>Forever!</span>. All history of what work was requested, who performed it, how much was escrowed, is stored natively on the ethereum blockchain.
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="privacy-headingFour">
                                        <button
                                            className={classnames(
                                                "accordion-button",
                                                "fw-medium",
                                                { collapsed: !col12 }
                                            )}
                                            type="button"
                                            onClick={t_col8}
                                            style={{ cursor: "pointer" }}
                                        >
                                            What if I don't need the work done anymore?
                                        </button>
                                    </h2>
                                    <Collapse isOpen={col12} className="accordion-collapse">
                                        <div className="accordion-body ff-secondary">
                                            Because we have designed our payment system on a smart contract, whoever is the present owner of the NFT is able to redeem funds from it at any time. So, say you initially publish a job to be done with a 3Ξ bounty, but the next day you figured out the solution. You as the owner of the NFT are free to redeem those funds at your leisure.<br /><br />

                                            This programmatic payment system means you have complete control over your funds and your work. We've eliminated the need to contact an intermediary, thus eliminating the expenses that go with it. 
                                        </div>
                                    </Collapse>
                                </div>
                            </div>

                            {/* <!--end accordion--> */}
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default Faqs;
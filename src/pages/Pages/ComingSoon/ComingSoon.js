import React from 'react'
import { Col, Container, Input, InputGroup, Row } from 'reactstrap'
import ParticlesAuth from "../../../pages/AuthenticationInner/ParticlesAuth";
import Countdown from "react-countdown"
import Navbar from '../../Landing/navbar';
import { AnalyticEventTracker } from '../../../Components/Common/AnalyticEventTracker';
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'

//import images
import imagelogo from "../../../assets/images/svg/block-ops/block-ops-icon-2048.svg";

const ComingSoon = () => {
    const gaEventTracker = AnalyticEventTracker('ComingSoon');
    const { account } = useEthers()
    const isConnected = account !== undefined
    const ens = useLookupAddress()

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>You are good to go!</span>
        } else {
            return (
                <>
                    <div className="countdownlist">
                        <div className="countdownlist-item">
                            <div className="count-title">Days</div>
                            <div className="count-num">{days}</div></div>
                        <div className="countdownlist-item">
                            <div className="count-title">Hours</div>
                            <div className="count-num">{hours}</div></div>
                        <div className="countdownlist-item"><div className="count-title">Minutes</div>
                            <div className="count-num">{minutes}</div></div><div className="countdownlist-item">
                            <div className="count-title">Seconds</div>
                            <div className="count-num">{seconds}</div></div>
                    </div>
                </>
            )
        }
    }

    const IWasHereOrThankYou = () => {

        return (<>
            {isConnected ? (
                <button className="btn btn-danger" onClick={() => {gaEventTracker('button_iWasHere'); alert("Thank You!")}}>
                    {ens ?? shortenAddress(account)} Was Here
                </button>
            ) : (
                <button className="btn btn-primary" onClick={() => {gaEventTracker('button_enterAppBeforeConnectingWallet')}}>
                    Please Connect Your Wallet First
                </button>
            )}
        
        </>)
    }

document.title ="Coming Soon | Block-Ops";

    return (
        <React.Fragment>
            <Navbar />           
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 pt-4 mb-4">
                                    <div className="mb-sm-5 pb-sm-4 pb-5">
                                        <img src={imagelogo} alt="" height="120" className="move-animation" />
                                    </div>
                                    <div className="mb-5">
                                        <h1 className="display-2 coming-soon-text">Coming Soon</h1>
                                    </div>
                                    <div>
                                        <Row className="justify-content-center mt-5">
                                            <Col lg={8}>
                                                <Countdown date="2022/05/30" renderer={renderer} />
                                            </Col>
                                        </Row>

                                        <div className="mt-5">
                                            <h4>Let us know you stopped by!</h4>
                                            <p className="text-muted">Don't worry we will not spam you 😊</p>
                                            <p className="text-muted">The button below is an analytics tracker that will log your public wallet address letting us know you were here!</p>
                                            
                                            <IWasHereOrThankYou />
                                            
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>

                </div>
            </ParticlesAuth>
        </React.Fragment>
    )
}

export default ComingSoon
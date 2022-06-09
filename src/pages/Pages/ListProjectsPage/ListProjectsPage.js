import React from 'react'
import { Col, Container, Input, InputGroup, Row } from 'reactstrap'
import ListProjects from "../../../Components/Common/ListProjects";
import { AnalyticEventTracker } from "../../../Components/Common/AnalyticEventTracker";
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'


const ListProjectsPage = () => {
    const gaEventTracker = AnalyticEventTracker('ListProjectsPage');
    const { account } = useEthers()
    const isConnected = account !== undefined
    const ens = useLookupAddress()

document.title ="List Projects | Block-Ops";
    return (
        <React.Fragment>
        <div className="page-content">
            <Container>
                <Row>
                    <Col sm={12}>
                        {isConnected ? <h1>Hello {shortenAddress(account)}!</h1> : <h1>Not Connected</h1>}
                    </Col>
                    <Col sm={12}>
                        {isConnected ? <ListProjects /> : <></>}
                    </Col>
                </Row>
            </Container>
        </div>
        </React.Fragment>
    )
}
export default ListProjectsPage;
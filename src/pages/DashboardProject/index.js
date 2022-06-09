import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProjectsOverview from './ProjectsOverview';
import ProjectsStatus from './ProjectsStatus';
import UpcomingSchedules from './UpcomingSchedules';

const DashboardProject = () => {
    document.title="Dashboard | Block Ops";
    return (
        <React.Fragment>
            <div className="page-content">
                
                <Container fluid>
                    <Row className="project-wrapper">
                        <Col sm={12} md={6}>
                            <ProjectsOverview />
                        </Col>
                        <Col sm={12} md={6}>
                            <ProjectsStatus />
                        </Col>
                        <Col sm={12} md={6}>
                            <UpcomingSchedules />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DashboardProject;
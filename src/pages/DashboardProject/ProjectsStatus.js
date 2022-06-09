import React from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { PrjectsStatusCharts } from './DashboardProjectCharts';
import { ProjectStateMetrics } from './DashboardProjectCharts';

const ProjectsStatus = () => {

    const stateMetrics = ProjectStateMetrics()
    const newProjects = stateMetrics !== undefined ? stateMetrics['new'] : 0
    const activeProjects = stateMetrics !== undefined ? stateMetrics['active'] : 0
    const closedProjects = stateMetrics !== undefined ? stateMetrics['closed'] : 0
    const totalProjects = newProjects !== undefined &
                          activeProjects !== undefined &
                          closedProjects !== undefined ? 
                          newProjects + activeProjects + closedProjects : 0

    

    return (
        <React.Fragment>
            <Card className="card-height-100">
                <CardHeader className="align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Projects Status</h4>
                </CardHeader>

                <CardBody>
                    <div id="prjects-status" data-colors='["--vz-success", "--vz-primary", "--vz-warning", "--vz-danger"]' className="apex-charts" dir="ltr">
                        <PrjectsStatusCharts />
                    </div>
                    <div className="mt-3">
                        <div className="d-flex justify-content-center align-items-center mb-4">
                            <h2 className="me-3 ff-secondary mb-0">{totalProjects}</h2>
                            <div>
                                <p className="text-muted mb-0">Total Projects</p>
                                <p className="text-success fw-medium mb-0">
                                    <span className="badge badge-soft-success p-1 rounded-circle"><i className="ri-arrow-right-up-line"></i></span> +{newProjects} New
                                </p>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                            <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-success align-middle me-2"></i> Completed</p>
                            <div>
                                <span className="text-success fw-medium fs-12">{closedProjects} Projects</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                            <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-primary align-middle me-2"></i> In Progress</p>
                            <div>
                                <span className="text-success fw-medium fs-12">{activeProjects} Projects</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                            <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-warning align-middle me-2"></i> Yet to Start</p>
                            <div>
                                <span className="text-success fw-medium fs-12">{newProjects} Projects</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default ProjectsStatus;
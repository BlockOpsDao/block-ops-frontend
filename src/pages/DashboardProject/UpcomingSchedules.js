import React, { useEffect, useState } from 'react';
import Flatpickr from "react-flatpickr";
import { Link } from 'react-router-dom';
import Moment from 'moment';
import LoadTokenMetadataById from '../../Components/Common/LoadTokenMetadataById';

const UpcomingSchedules = () => {

    const tokenMetadataById = LoadTokenMetadataById()

    const [enabledDates, setEnabledDates] = useState();
    const [selectedDate, setSelectedDate] = useState();

    useEffect(() => {

        if (Object.entries(tokenMetadataById).length > 0) {
            let tmpEnabledDates = []
            for (const [key, value] of Object.entries(tokenMetadataById)) {
 
                if (!(tmpEnabledDates.includes(value['projectDeadline']))) {
                    tmpEnabledDates.push(value['projectDeadline'])
                }
            }
            setEnabledDates(tmpEnabledDates)
            setSelectedDate(tmpEnabledDates[0])
        }

    }, [tokenMetadataById]);

    const displayProjectsOnSelectedDate = () => {

        if (enabledDates.length > 0 & selectedDate !== undefined) {
            for (const [key, value] of Object.entries(tokenMetadataById)) {
                if (Moment(value['projectDeadline']).format('YYYY-MM-DD') === Moment(selectedDate).format('YYYY-MM-DD')) {
                    return (
                        <div className="mini-stats-wid d-flex align-items-center mt-3">
                            <div className="flex-shrink-0 avatar-sm">
                                <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                                    {Moment(selectedDate).format('DD')}
                                </span>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <h6 className="mb-1">{value['projectTitle']}</h6>
                                <p className="text-muted mb-0">{value['projectSkills'].join(', ')} </p>
                            </div>
                            <div className="flex-shrink-0">
                                <p className="text-muted mb-0"><span className="text-uppercase">{value['projectState']}</span></p>
                            </div>
                        </div>
                    )
                }
            }

        }
    }


    return (
        <React.Fragment>
            
                <div className="card">
                    <div className="card-header border-0">
                        <h4 className="card-title mb-0">Projects by Deadline</h4>
                    </div>
                    <div className="card-body pt-0">
                        <div className="upcoming-scheduled">
                            <Flatpickr
                                className="form-control"
                                onChange={(e) => setSelectedDate(e[0])}
                                options={{
                                    dateFormat: "d M, Y",
                                    inline: true,
                                    enable: enabledDates ?? []
                                }}
                            />
                        </div>
                        { selectedDate === undefined ?
                        <h6 className="text-uppercase fw-semibold mt-4 mb-3 text-muted">Projects:</h6> :
                        <h6 className="text-uppercase fw-semibold mt-4 mb-3 text-muted">Projects on {Moment(selectedDate).format('YYYY-MM-DD')}:</h6>
                        }
                        {enabledDates !== undefined & selectedDate !== undefined ? displayProjectsOnSelectedDate() : <></>}

                        <div className="mt-3 text-center">
                            <Link to="/all-projects" className="text-muted text-decoration-underline">View all Projects</Link>
                        </div>

                    </div>
                </div>
        </React.Fragment>
    );
};

export default UpcomingSchedules;
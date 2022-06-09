import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import LoadTokenMetadataByMonth from '../../Components/Common/LoadTokenMetadataByMonth';
const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>


const ProjectsOverviewCharts = () => {

    const tokenMetadataByMonth = LoadTokenMetadataByMonth()
    const [arrayOfMonths, setArrayOfMonths] = useState();
    const [arrayOfProjectsByMonth, setArrayOfProjectsByMonth] = useState();
    const [arrayOfSubmissionsByMonth, setArrayOfSubmissionsByMonth] = useState();
    const [arrayOfAmountOfEthInNFTByMonth, setArrayOfAmountOfEthInNFTByMonth] = useState();

    const [projectsMax, setProjectsMax] = useState(1);
    const [submissionsMax, setSubmissionsMax] = useState(1);
    const [amountMax, setAmountMax] = useState(1);
    
    useEffect(() => {
        let tmpArrayOfMonths = []
        let tmpArrayOfProjectsByMonth = []
        let tmpArrayOfSubmissionsByMonth = []
        let tmpArrayOfAmountOfEthInNFTByMonth = []

        if (Object.keys(tokenMetadataByMonth).length !== 0) {

            if (
                arrayOfMonths === undefined | 
                arrayOfProjectsByMonth === undefined | 
                arrayOfSubmissionsByMonth === undefined | 
                arrayOfAmountOfEthInNFTByMonth === undefined     
            ) {
                for (const [key, value] of Object.entries(tokenMetadataByMonth)) {

                    tmpArrayOfMonths.push(key);
                    tmpArrayOfProjectsByMonth.push(value['numberOfProjects'])
                    tmpArrayOfSubmissionsByMonth.push(value['numberOfSubmissions'])
                    tmpArrayOfAmountOfEthInNFTByMonth.push(value['amountOfEthInNFT'])
                }

                setArrayOfMonths(tmpArrayOfMonths)
                setArrayOfProjectsByMonth(tmpArrayOfProjectsByMonth)
                setArrayOfSubmissionsByMonth(tmpArrayOfSubmissionsByMonth)
                setArrayOfAmountOfEthInNFTByMonth(tmpArrayOfAmountOfEthInNFTByMonth)
                
                setProjectsMax(Math.ceil(Math.max(...tmpArrayOfProjectsByMonth)*1.75))
                setSubmissionsMax(Math.ceil(Math.max(...tmpArrayOfSubmissionsByMonth)*1.75))
                setAmountMax(Math.ceil(Math.max(...tmpArrayOfAmountOfEthInNFTByMonth)*1.75))
            }
        }

    }, [tokenMetadataByMonth]);


    const linechartcustomerColors = ["#405189", "#0ab39c", "#f7b84b"];
    const series = [{
        name: 'Number of Projects',
        type: 'bar',
        data: arrayOfProjectsByMonth ?? [0]
    }, {
        name: 'Project Submissions',
        type: 'bar',
        data: arrayOfSubmissionsByMonth ?? [0]
    }, {
        name: 'Available ETH',
        type: 'area',
        data: arrayOfAmountOfEthInNFTByMonth ?? [1]
    }];
    var options = {
        chart: {
            height: 374,
            type: 'line',
            toolbar: {
                show: false,
            }
        },
        stroke: {
            curve: 'smooth',
            dashArray: [0, 0, 3],
            width: [0, 0, 1],
        },
        fill: {
            opacity: [1, 1, 0.5]
        },
        markers: {
            size: [0, 0, 4],
            strokeWidth: 2,
            hover: {
                size: 4,
            }
        },
        xaxis: {
            categories: arrayOfMonths !== undefined ? arrayOfMonths.slice(-12) : ['Loading'],
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        yaxis: [
            {
                seriesName: 'Number of Projects',
                opposite: false,
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: true,
                    color: linechartcustomerColors[0]
                },
                labels: {
                    style: {
                        colors: linechartcustomerColors[0]
                    },
                    formatter: function(val) {
                        return val.toFixed(0);
                    }
                },
                title: {
                    text: "Projects",
                    style: {
                        color: linechartcustomerColors[0]
                    }
                },
                min: 0,
                max: projectsMax > submissionsMax ? projectsMax : submissionsMax,

            
            },
            {
                seriesName: 'Number of Projects',
                show: false,
                labels: {
                    style: {
                        colors: linechartcustomerColors[0]
                    },
                },
            },
            {
                seriesName: 'Available ETH',
                opposite: true,
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: true,
                    color: linechartcustomerColors[2]
                },
                labels: {
                    style: {
                        colors: linechartcustomerColors[2]
                    },
                    formatter: function(val) {
                        return val.toFixed(2);
                    }
                },
                title: {
                    text: "Bounty Available (ETH)",
                    style: {
                        color: linechartcustomerColors[2]
                    }
                },
                min: 0,
                max: amountMax
            },
        ],
        grid: {
            show: true,
            xaxis: {
                lines: {
                    show: true,
                }
            },
            yaxis: {
                lines: {
                    show: false,
                }
            },
            padding: {
                top: 0,
                right: -2,
                bottom: 15,
                left: 10
            },
        },
        legend: {
            show: true,
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: -5,
            markers: {
                width: 9,
                height: 9,
                radius: 6,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '30%',
                barHeight: '70%'
            }
        },
        colors: linechartcustomerColors,
        tooltip: {
            shared: true,
            y: [{
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0);
                    }
                    return y;

                }
            }, {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0);
                    }
                    return y;

                }
            }, {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(2) + " ETH";
                    }
                    return y;

                }
            }]
        }
    };
    if (arrayOfProjectsByMonth !== undefined & arrayOfAmountOfEthInNFTByMonth !== undefined) {
        return (
            <React.Fragment>
                <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    height="374"
                    className="apex-charts"
                />
            </React.Fragment>
        );
    } else {
        return (loadingIcon)
    }
};

const TeamMembersCharts = ({ seriesData, chartsColor }) => {
    // const series=  isApexSeriesData.series,
    const series = [seriesData];

    const options = {
        chart: {
            type: 'radialBar',
            width: 36,
            height: 36,
            sparkline: {
                enabled: !0
            }
        },
        dataLabels: {
            enabled: !1
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '50%'
                },
                track: {
                    margin: 1
                },
                dataLabels: {
                    show: !1
                }
            }
        },
        colors: [chartsColor]
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={[...series]}
                type="radialBar"
                height="36"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

const ProjectStateMetrics = () => {
    
    const tokenMetadataByMonth = LoadTokenMetadataByMonth()
    const [newProjects, setNewProjects] = useState();
    const [activeProjects, setActiveProjects] = useState();
    const [closedProjects, setClosedProjects] = useState();

    useEffect(() => {

        let tmpNewProjects = 0
        let tmpActiveProjects = 0
        let tmpClosedProjects = 0

        if (Object.keys(tokenMetadataByMonth).length !== 0) {
            if (newProjects === undefined | activeProjects === undefined | closedProjects === undefined) {
                for (const [idx, metadata] of Object.entries(tokenMetadataByMonth)) {
                    tmpNewProjects += metadata['projectState']['New']
                    tmpActiveProjects += metadata['projectState']['Active']
                    tmpClosedProjects += metadata['projectState']['Closed']
                }
            }
            setNewProjects(tmpNewProjects)
            setActiveProjects(tmpActiveProjects)
            setClosedProjects(tmpClosedProjects)
        }
        
    }, [tokenMetadataByMonth]);

    if (newProjects !== undefined & activeProjects !== undefined & closedProjects !== undefined) {
        return {
            'new': newProjects,
            'active': activeProjects,
            'closed': closedProjects
        }
    } else {
        return (loadingIcon)
    }

}


const PrjectsStatusCharts = () => {

    const stateMetricsMetadata = ProjectStateMetrics()
    const [newProjects, setNewProjects] = useState()
    const [activeProjects, setActiveProjects] = useState()
    const [closedProjects, setClosedProjects] = useState()
    const [series, setSeries] = useState();


    useEffect(() => {

        if (stateMetricsMetadata !== undefined) {
            if (newProjects === undefined) {
                setNewProjects(stateMetricsMetadata['new'])
            }
            if (activeProjects === undefined) {
                setActiveProjects(stateMetricsMetadata['active'])
            }
            if (closedProjects === undefined) {
                setClosedProjects(stateMetricsMetadata['closed'])
            }

            if (
                series === undefined & 
                newProjects !== undefined &
                activeProjects !== undefined &
                closedProjects !== undefined
            ) {
                setSeries([closedProjects, activeProjects, newProjects])
            }
        }

    }, [stateMetricsMetadata]);

    const donutchartProjectsStatusColors = ["#0ab39c", "#405189", "#f7b84b"];

    var options = {
        labels: ["Completed", "Active", "New",],
        chart: {
            type: "donut",
            height: 230,
        },
        plotOptions: {
            pie: {
                size: 100,
                offsetX: 0,
                offsetY: 0,
                donut: {
                    size: "90%",
                    labels: {
                        show: false,
                    }
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        stroke: {
            lineCap: "round",
            width: 0
        },
        colors: donutchartProjectsStatusColors,
    };
    if (stateMetricsMetadata !== undefined) {
        if (series !== undefined) {
            return (
                <React.Fragment>
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="donut"
                        height="230"
                        className="apex-charts"
                    />
                </React.Fragment>
            );
        } else {
            return (loadingIcon)
        }
    } else {
        return (loadingIcon)
    }
};

export { ProjectsOverviewCharts, TeamMembersCharts, PrjectsStatusCharts, ProjectStateMetrics };
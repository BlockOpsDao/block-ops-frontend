import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import LoadTokenMetadataByDate from '../../Components/Common/LoadTokenMetadataByDate';
import Moment from 'moment';

const loadingIcon = <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>


const ProjectsOverviewCharts = () => {

    const tokenMetadataByDate = LoadTokenMetadataByDate()
    const [items, setItems] = useState();
    const [projectsMax, setProjectsMax] = useState();
    const [submissionsMax, setSubmissionsMax] = useState();
    const [amountMax, setAmountMax] = useState();

    const tmpProjectDict = {}
    useEffect(() => {

        if (Object.keys(tokenMetadataByDate).length !== 0) {

            if (items === undefined) {
                for (const [key, value] of Object.entries(tokenMetadataByDate)) {
                    let dateKey = Date.parse(key)
                    let monthKey = Moment(dateKey).format('MMM-YY')
                    if (!(monthKey in tmpProjectDict)) {
                        tmpProjectDict[monthKey] = {
                            "monthKey": monthKey,
                            "numberOfProjects": value['numberOfProjects'],
                            "numberOfSubmissions": value['numberOfSubmissions'],
                            "amountOfEthInNFT": value['amountOfEthInNFT'],
                            "dateKey": dateKey
                        }
                    } else {
                        tmpProjectDict[monthKey]['numberOfProjects'] += value['numberOfProjects']
                        tmpProjectDict[monthKey]['numberOfSubmissions'] += value['numberOfSubmissions']
                        tmpProjectDict[monthKey]['amountOfEthInNFT'] += value['amountOfEthInNFT']
                    }

                }

                if (Object.entries(tmpProjectDict).length > 0)
                    setItems(Object.keys(tmpProjectDict).map(function(key) {
                        return [key, tmpProjectDict[key]];
                    }).sort(function(first, second) {
                        return first[1]['dateKey'] - second[1]['dateKey'];
                    }))

            }
        }

    }, [tokenMetadataByDate]);

    if (items !== undefined & projectsMax === undefined & submissionsMax === undefined & amountMax === undefined) {

        let tmpArrayOfProjectsByMonth = items.map(x => x[1]['numberOfProjects'])
        let tmpArrayOfSubmissionsByMonth = items.map(x => x[1]['numberOfSubmissions'])
        let tmpArrayOfAmountOfEthInNFTByMonth = items.map(x => x[1]['amountOfEthInNFT'])
        setProjectsMax(Math.ceil(Math.max(...tmpArrayOfProjectsByMonth)*1.75))
        setSubmissionsMax(Math.ceil(Math.max(...tmpArrayOfSubmissionsByMonth)*1.75))
        setAmountMax(Math.ceil(Math.max(...tmpArrayOfAmountOfEthInNFTByMonth)*1.75))
    }

    const linechartcustomerColors = ["#405189", "#0ab39c", "#f7b84b"];
    const series = [{
        name: 'Number of Projects',
        type: 'bar',
        data: items ? items.map(x => x[1]['numberOfProjects']) : undefined ?? [0]
    }, {
        name: 'Project Submissions',
        type: 'bar',
        data: items ? items.map(x => x[1]['numberOfSubmissions']) : undefined ?? [0]
    }, {
        name: 'Available ETH',
        type: 'area',
        data: items ? items.map(x => x[1]['amountOfEthInNFT']) : undefined ?? [1]
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
            categories: items !== undefined ? items.map(x => x[1]['monthKey']).slice(-12) : ['Loading'],
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
                max: projectsMax ? submissionsMax ?  projectsMax > submissionsMax ? projectsMax : submissionsMax : 1 : 1,

            
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
                max: amountMax ? amountMax : 1
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
    if (items !== undefined) {
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
    
    const tokenMetadataByDate = LoadTokenMetadataByDate()
    const [newProjects, setNewProjects] = useState();
    const [activeProjects, setActiveProjects] = useState();
    const [closedProjects, setClosedProjects] = useState();

    useEffect(() => {

        let tmpNewProjects = 0
        let tmpActiveProjects = 0
        let tmpClosedProjects = 0

        if (Object.keys(tokenMetadataByDate).length !== 0) {
            if (newProjects === undefined | activeProjects === undefined | closedProjects === undefined) {
                for (const [idx, metadata] of Object.entries(tokenMetadataByDate)) {
                    tmpNewProjects += metadata['projectState']['New']
                    tmpActiveProjects += metadata['projectState']['Active']
                    tmpClosedProjects += metadata['projectState']['Closed']
                }
            }
            setNewProjects(tmpNewProjects)
            setActiveProjects(tmpActiveProjects)
            setClosedProjects(tmpClosedProjects)
        }
        
    }, [tokenMetadataByDate]);

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
import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import LoadTokenMetadataByMonth from '../../Components/Common/LoadTokenMetadataByMonth';
import AllSkills from '../../Components/Common/AllSkills';
import { useAsyncDebounce } from 'react-table';
// import LoadTokenMetadata from '../../Components/Common/LoadTokenMetadata';


const ProjectsOverviewCharts = () => {

    const tokenMetadataByMonth = LoadTokenMetadataByMonth()
    const allSkills = AllSkills()

    const [arrayOfMonths, setArrayOfMonths] = useState();
    const [arrayOfProjectsByMonth, setArrayOfProjectsByMonth] = useState();
    const [arrayOfSubmissionsByMonth, setArrayOfSubmissionsByMonth] = useState();
    const [arrayOfAmountOfEthInNFTByMonth, setArrayOfAmountOfEthInNFTByMonth] = useState();
    
    useEffect(() => {
        let tmpArrayOfMonths = []
        let tmpArrayOfProjectsByMonth = []
        let tmpArrayOfSubmissionsByMonth = []
        let tmpArrayOfAmountOfEthInNFTByMonth = []
        console.log("tokenMetadataByMonth: ", tokenMetadataByMonth)
        if (Object.keys(tokenMetadataByMonth).length !== 0) {
            console.log("inside tokenMetadataByMonth !== undefined")
            if (
                arrayOfMonths === undefined | 
                arrayOfProjectsByMonth === undefined | 
                arrayOfSubmissionsByMonth === undefined | 
                arrayOfAmountOfEthInNFTByMonth === undefined     
            ) {
                for (const [key, value] of Object.entries(tokenMetadataByMonth)) {
                    console.log("key: ", key, " value: ", value);
                    tmpArrayOfMonths.push(key);
                    tmpArrayOfProjectsByMonth.push(value['numberOfProjects'])
                    tmpArrayOfSubmissionsByMonth.push(value['numberOfSubmissions'])
                    tmpArrayOfAmountOfEthInNFTByMonth.push(value['amountOfEthInNFT'])
                }
                console.log("tmpArrayOfMonths: ", tmpArrayOfMonths)
                setArrayOfMonths(tmpArrayOfMonths)
                setArrayOfProjectsByMonth(tmpArrayOfProjectsByMonth)
                setArrayOfSubmissionsByMonth(tmpArrayOfSubmissionsByMonth)
                setArrayOfAmountOfEthInNFTByMonth(tmpArrayOfAmountOfEthInNFTByMonth)
            }    
        }

    }, [tokenMetadataByMonth]);

    console.log("arrayOfProjectsByMonth: ", arrayOfProjectsByMonth)

    const linechartcustomerColors = ["#405189", "#f7b84b", "#0ab39c"];
    const series = [{
        name: 'Number of Projects',
        type: 'bar',
        data: arrayOfProjectsByMonth ?? [0]
    }, {
        name: 'Available ETH',
        type: 'area',
        data: arrayOfAmountOfEthInNFTByMonth ?? [0]
    }, {
        name: 'Project Submissions',
        type: 'bar',
        data: arrayOfSubmissionsByMonth ?? [0]
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
            dashArray: [0, 3, 0],
            width: [0, 1, 0],
        },
        fill: {
            opacity: [1, 0.1, 1]
        },
        markers: {
            size: [0, 4, 0],
            strokeWidth: 2,
            hover: {
                size: 4,
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
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
                        return "$" + y.toFixed(2) + "k";
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
            }]
        }
    };
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

const PrjectsStatusCharts = () => {
    const donutchartProjectsStatusColors = ["#0ab39c", "#405189", "#f7b84b", "#f06548"];
    const series = [125, 42, 58, 89];
    var options = {
        labels: ["Completed", "In Progress", "Yet to Start", "Cancelled"],
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
};

export { ProjectsOverviewCharts, TeamMembersCharts, PrjectsStatusCharts };
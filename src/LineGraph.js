import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { buildChartData } from "./utils";
import Numeral from "numeral";


//Predefined
const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        interect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return Numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return Numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

function LineGraph({ country, casesType, ...props }) {
    const [data, setData] = useState({});

    const url = country === "worldwide" ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120" : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;
    
    useEffect(() => {
        const fetchData = async () => {
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    const chartData = buildChartData(data, country, casesType);
                    setData(chartData);
                })
        }
        fetchData();
    }, [country, casesType])

    return (
        <div className={props.className}>
            {data?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data: data,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </div>
    )
}

export default LineGraph;
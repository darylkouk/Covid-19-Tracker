import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { buildChartData } from "./utils";

function LineGraph() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then(data => {
                const chartData = buildChartData(data);
                setData(chartData);
            })
    })

    return (
        <div>
            <Line
                data
                options
            />
        </div>
    )
}
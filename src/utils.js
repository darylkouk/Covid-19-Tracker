import React from "react";
import Numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
};


export const sortData = data => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
}


export const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for(let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
}

export const prettyPrintStat = stat => stat ? `+${Numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {Numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {Numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {Numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))    
);
import React, { useState, useEffect } from 'react';
import './App.css';
import InfoBox from "./InfoBox";
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
} from "@material-ui/core";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./utils";
import LineGraph from "./LineGraph";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        //code run once and not again or when countries changes
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then(response => response.json())
                .then(data => {
                    const countries = data.map(country => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2
                        }
                    ));

                    const sortedData = sortData(data);

                    setTableData(sortedData);
                    setMapCountries(data);
                    setCountries(countries);
                });
        }
        getCountriesData();
    }, [countries]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then(response => response.json())
            .then(data => {
                setCountryInfo(data);
            });
    }, []);

    const onChangeCountry = async event => {
        const countryCode = event.target.value;
        
        const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;


        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setCountry(countryCode);
                setCountryInfo(data);

                if (countryCode === "worldwide") {
                    setMapCenter({ lat: 34.80746, lng: -40.4796 });
                    setMapZoom(3);
                }
                else {
                    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                    setMapZoom(4);
                }
            });
    };

  return (
      <div className="app">
          <div className="app__left">
              {/* Header */}
              {/* Title + Select input dropdown */}
              <div className="app__header">
                  <h1>COVID-19 TRACKER</h1>
                  <FormControl className="app__dropdown">
                      <Select
                          variant="outlined"
                          value={country}
                          onChange={onChangeCountry}
                      >
                          <MenuItem value="worldwide">Worldwide</MenuItem>
                          {
                              countries.map(country => 
                                  <MenuItem value={country.value}>{country.name}</MenuItem>
                              )
                          }
                      </Select>
                   </FormControl>
              </div>
              {/* INfoBoxes */}
              <div className="app__stats">
                  <InfoBox isRed active={casesType === "cases"} onClick={e => setCasesType('cases')} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} />
                  <InfoBox active={casesType === "recovered"} onClick={e => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={countryInfo.recovered} />
                  <InfoBox isRed active={casesType === "deaths"} onClick={e => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths} />
              </div>
              {/* Map */}
              <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
          </div>
          <Card className="app__right">
              <CardContent>
                  <h3>Live Cases By Country</h3>
                  {/* Table */}
                  <Table countries={tableData} />
                  <h3>Worldwide New {casesType}</h3>
                  {/* Graph */}
                  <LineGraph casesType={casesType} />
              </CardContent>
          </Card>
    </div>
  );
}

export default App;

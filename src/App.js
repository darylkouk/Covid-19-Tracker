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
import { sortData } from "./utils";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

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
              {/* INfoBoxes */}
              {/* INfoBoxes */}
              <div className="app__stats">
                  <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
                  <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
                  <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
              </div>
            

              
              {/* Graph */}

              {/* Map */}
          </div>
          <Card className="app__right">
              <CardContent>
                  <h3>Cases By Country</h3>
                  {/* Table */}
                  <Table countries={tableData} />
                  <h3>Worldwide New Cases</h3>
                  <LineGraph />
              </CardContent>
          </Card>
    </div>
  );
}

export default App;

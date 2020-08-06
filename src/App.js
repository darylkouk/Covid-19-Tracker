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

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");

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
                    setCountries(countries);
                });
        }
        getCountriesData();
    }, [countries]);
    
    const onChangeCountry = event => {
        const country = event.target.value;
        setCountry(country);
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
                  <InfoBox title="Coronavirus Cases" cases={123} total={1234} />
                  <InfoBox title="Coronavirus Cases" cases={123} total={1234} />
                  <InfoBox title="Coronavirus Cases" cases={123} total={1234} />
              </div>
            

              {/* Table */}
              {/* Graph */}

              {/* Map */}
          </div>
          <Card className="app__right">
              <CardContent>
                  <h3>Cases By Country</h3>
                  <h3>Worldwide New Cases</h3>
              </CardContent>
          </Card>
    </div>
  );
}

export default App;

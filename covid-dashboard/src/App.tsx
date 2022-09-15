import { Card, CardContent, FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
// * Component Imported
import InfoBox from "./components/InfoBox";
import Map from "./components/Map"
import Table from "./components/Table";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [table, setTable] = useState([]);

  useEffect(() => {
    //* This use effect run on the first time page render
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  },[])

  //* useEffect run the code based on given conditions
  useEffect(() => {
    //* useEffect run basically on two conditions
    //* 1. When the component first render or
    //* 2. When the countries variables changes
    //! async --> We need to run the code "async" the function send request to the server and wait for the response.
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          //* Set countries
          setCountries(countries);
          setTable(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("🗺️ :" + countryCode);
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : ` https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
      
    });
    
  };
  

  return (
    <div className="App">
      <div className="app_left">
      <div className="app__header">
        {/* Header */}
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide" key="worldwide">
              Worldwide
            </MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value} key={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Title + Select input dropdown field */}

      <div className="app_stats">
        <InfoBox title="Corona Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
        <InfoBox title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        
      </div>
      {/* Table */}
      {/* Graph */}

      {/* Map */}
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={table}/>
          <h3> Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

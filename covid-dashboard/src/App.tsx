import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  //* useEffect run the code based on given conditions
  useEffect(() => {
   //* useEffect run basically on two conditions
   //* 1. When the component first render or
   //* 2. When the countries variables changes
   //! async --> We need to run the code "async" the function send request to the server and wait for the response.
const getCountriesData = async () => {
  await fetch("https://disease.sh/v3/covid-19/countries")
  .then((response) => response.json())
  .then((data) => {
    const countries = data.map((country) => ({
      name : country.country,
      value: country.countryInfo.iso2,
    }));
    //* Set countries
    setCountries(countries);
  })
};
  getCountriesData();
  }, [countries]);

  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="">
            {countries.map((country) => (
              <MenuItem value="{country.value}" key="{country.name}">{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;

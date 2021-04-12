import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Weather from './Weather'

const CountryDetails = ({country}) => {
    const key= process.env.REACT_APP_API_KEY;
    debugger
    const [weather, setWeather] = useState('');

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current?access_key=${key}&query=${country.capital}`)
        .then((response) => {
            if(response.data.success !== false) {
                setWeather(response.data);
                console.log(response)
                console.log(`http://api.weatherstack.com/current?access_key=${key}&query=${country.capital}`)
            }
        })
    })
    return(
        <div>
            <h2>{country.name}</h2>
            <div>
                <p>Capital: {country.capital}</p>
            </div>
            <div>
                <p>Population: {country.population}</p>
            </div>
            <h2>Languages</h2>
            <ul>
                {country.languages.map((language) => 
                    <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img alt={country.name} src={country.flag} height='150px'/>

            <h2>Weather in {country.capital}</h2>
            <Weather weather={weather} />
        </div>
    )
}
export default CountryDetails;
import { useState, useEffect } from "react";
import weatherService from '../services/weather';

const Weather = ({ lat, lng }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherService
            .get(lat, lng)
            .then(returnedWeather => {
                setWeather(returnedWeather)
            })
    }, [])

    if (!weather) return;

    const weatherIcon = weather.weather?.length > 0 ? weather.weather[0] : null;

    return (
        <div>
            <h2>weather in {weather.name}</h2>
            <p>temperature {weather.main.temp} Celcius</p>
            {weatherIcon && <img alt={weatherIcon.icon} src={`https://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png`} />}
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

const CountryDetail = ({ country }) => (
    <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
            {...Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img alt={country.flags.alt} src={country.flags.png}></img>
    </div>
)

const Country = ({ country }) => {
    if (!country) return;

    return (
        <div>
            <CountryDetail country={country} />
            <Weather lat={country.capitalInfo.latlng[0]} lng={country.capitalInfo.latlng[1]} />
        </div>
    )
}

export default Country;
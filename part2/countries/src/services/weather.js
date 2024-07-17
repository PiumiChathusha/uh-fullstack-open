import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org'
const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_APIKEY;

const get = (lat, lon) => {
    const request = axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`)
    return request.then((response) => response.data)
}

export default {
    get: get,
}
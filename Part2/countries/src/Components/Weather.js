const Weather = ({ weather }) => {
    if(weather !== ''){
        return(
        <div>
            <div>Temperature: {weather.current.temperature} celcius</div>
            <img src={weather.current.weather_icons[0]} />
            <div>Wind: {weather.current.wind_speed} mph {weather.current.wind_dir}</div>
        </div>
    )}
    return <div>Weather data not available</div>
}
export default Weather
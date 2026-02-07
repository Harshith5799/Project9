import React, {useState} from 'react'     
import'./App.css'
const API_KEY = "4785f7ec6205f895dea8dfeacb2f8217"
export default function App(){
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(""); 
  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    try {
      setError
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };
  return (
    <div className='app'>
      <div className='header'>
        <h1 class="card">Weather App</h1>
      </div>
      <div className='section'></div>
      <div className='search'>
        <input type='text' placeholder='Enter a city' value={city} onChange={(e) => setCity(e.target.value)} required />
        <button type='button' onClick={getWeather}>Get Weather</button>
              </div>
              {error && <p className='error'>{error}</p>}
      {weather && (
        <div className='weather-card'>
          <h2>{weather.name}</h2>
          <h2>{weather.main.temp}C</h2>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
      )}
      <div className='footer'>
        <p class="copy">Copyright@2026 Designed By Bollineni Harshith</p>
      </div>
    </div>
  )
}
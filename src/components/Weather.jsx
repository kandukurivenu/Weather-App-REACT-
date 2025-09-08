import React, { useState } from 'react';
import './Weather.css';

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const API = "104caf28b694bb564553279ba3240d98";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">Weather App</h1>
      <input
        type="text"
        placeholder="Enter the city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}   
        className="weather-input"
      />
      <button onClick={fetchWeather} className="weather-button">
        Get Weather
      </button>

      {error && <p className="weather-error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;

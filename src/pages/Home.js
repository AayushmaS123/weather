import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState(
    localStorage.getItem('weatherCity') || 'Kathmandu'
  );

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d1e5d05bc001867f9dd71b36431fe8b7`
        );
        setWeather(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch weather data');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    localStorage.setItem('weatherCity', newCity);
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <select
        value={city}
        onChange={handleCityChange}
        className="city-selector"
      >
        <option value="New York">New York</option>
        <option value="London">London</option>
        <option value="Tokyo">Tokyo</option>
        <option value="New Delhi">New Delhi</option>
        <option value="Kathmandu">Kathmandu</option>
        <option value="Beijing">Beijing</option>
        <option value="Canberra">Canberra</option>
        <option value="Berlin">Berlin</option>

      </select>

      {loading ? (
        <p className="loading">Loading weather data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : weather ? (
        <div className="weather-data">
          <h2>
            {weather.name}, {weather.sys?.country}
          </h2>
          <table className="weather-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🌡️ Temperature</td>
                <td>{weather.main.temp}°C</td>
              </tr>
              <tr>
                <td>🌤️ Conditions</td>
                <td>{weather.weather[0].description}</td>
              </tr>
              <tr>
                <td>💧 Humidity</td>
                <td>{weather.main.humidity}%</td>
              </tr>
              <tr>
                <td>🌬️ Wind Speed</td>
                <td>{weather.wind.speed} m/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
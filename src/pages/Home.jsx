import { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import LocationSelector from '../components/LocationSelector';
import { fetchWeather } from '../services/weatherService';


const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLocationChange = async (location) => {
    try {
      setLoading(true);
      const data = await fetchWeather(location);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem('weatherLocation') || 'London';
    handleLocationChange(savedLocation);
  }, []);

  return (
    <div className="home-page">
      <h1>Weather Forecast</h1>
      <LocationSelector onLocationChange={handleLocationChange} />
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default Home;
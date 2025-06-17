import { useState, useEffect } from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather, loading, error, forecast }) => {
  const [showForecast, setShowForecast] = useState(false);
  const [unit, setUnit] = useState('celsius');
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    if (weather) {
      
      const condition = weather.weather[0].main.toLowerCase();
      if (condition.includes('rain')) setAnimation('rain');
      else if (condition.includes('snow')) setAnimation('snow');
      else if (condition.includes('cloud')) setAnimation('cloud');
      else setAnimation('sun');
    }
  }, [weather]);

  if (loading) return <div className="weather-loading">Loading weather data...</div>;
  if (error) return <div className="weather-error">{error}</div>;
  if (!weather) return <div className="weather-error">No weather data available</div>;

  const convertTemp = (temp) => {
    return unit === 'celsius' ? Math.round(temp) : Math.round((temp * 9/5) + 32);
  };

  const tempUnit = unit === 'celsius' ? '°C' : '°F';

  return (
    <div className={`weather-card ${animation}`}>
      <h2 className="weather-location">{weather.name}</h2>
      
      <div className="weather-main">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].description}
          className="weather-icon"
        />
        <div className="weather-temp">
          <p className="temperature">
            {convertTemp(weather.main.temp)}{tempUnit}
          </p>
          <p className="description">{weather.weather[0].description}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <p><span className="detail-label">Humidity:</span> {weather.main.humidity}%</p>
        <p><span className="detail-label">Wind:</span> {weather.wind.speed} m/s</p>
        <p><span className="detail-label">Pressure:</span> {weather.main.pressure} hPa</p>
        <p><span className="detail-label">Feels Like:</span> {convertTemp(weather.main.feels_like)}{tempUnit}</p>
      </div>
      
      <div className="weather-controls">
        <button 
          onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
          className="unit-toggle"
        >
          Switch to {unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}
        </button>
        
        {forecast && (
          <button 
            onClick={() => setShowForecast(!showForecast)}
            className="forecast-toggle"
          >
            {showForecast ? 'Hide Forecast' : 'Show 5-Day Forecast'}
          </button>
        )}
      </div>
      
      {showForecast && forecast && (
        <div className="weather-forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-items">
            {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((day) => (
              <div key={day.dt} className="forecast-item">
                <p className="forecast-day">
                  {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                  alt={day.weather[0].description}
                  className="forecast-icon"
                />
                <p className="forecast-temp">
                  {convertTemp(day.main.temp_max)}{tempUnit} / {convertTemp(day.main.temp_min)}{tempUnit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
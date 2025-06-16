import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'd1e5d05bc001867f9dd71b36431fe8b7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (location) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        units: 'metric',
        appid: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
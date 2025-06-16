import { useState, useEffect } from 'react';
import { saveLocation, getSavedLocation } from '../utils/storage';
import './LocationSelector.css';

const LocationSelector = ({ onLocationChange }) => {
  const popularCities = [
    'London', 'New York', 'Tokyo', 
    'Paris', 'Sydney', 'Berlin',
    'Moscow', 'Dubai', 'Kathmandu', 'Delhi', 'Singapore'
  ];
  
  const [selectedLocation, setSelectedLocation] = useState(getSavedLocation() || 'London');

  useEffect(() => {
    onLocationChange(selectedLocation);
    saveLocation(selectedLocation);
  }, [selectedLocation, onLocationChange]);

  return (
    <div className="location-selector">
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {popularCities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
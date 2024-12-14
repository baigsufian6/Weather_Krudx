import React from "react";

const WeatherDisplay = ({ weather }) => {
  const weatherIcons = {
    Sunny: "☀️",
    Cloudy: "☁️",
    Rainy: "☂️",
  };

  return (
    <div className="weather-display">
      <div className="weather-icon">{weatherIcons[weather.condition]}</div>
      <h2>{weather.temperature}°C</h2>
      <p>Condition: {weather.condition}</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind: {weather.wind} km/h</p>
    </div>
  );
};

export default WeatherDisplay;

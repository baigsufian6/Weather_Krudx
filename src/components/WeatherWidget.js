import React, { useState, useEffect } from "react";
import CitySelector from "./CitySelector";
import WeatherDisplay from "./WeatherDisplay";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const citiesWeatherData = {
    "New York": { temperature: 25, condition: "Sunny", humidity: 40, wind: 10 },
    London: { temperature: 15, condition: "Cloudy", humidity: 60, wind: 20 },
    Mumbai: { temperature: 30, condition: "Rainy", humidity: 80, wind: 15 },
    Tokyo: { temperature: 20, condition: "Sunny", humidity: 50, wind: 5 },
  };

  const fetchWeatherData = (selectedCity) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      if (citiesWeatherData[selectedCity]) {
        setWeather(citiesWeatherData[selectedCity]);
        setLoading(false);
      } else {
        setError("Failed to fetch weather data.");
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <div className="weather-widget">
      <h1>Weather Dashboard</h1>
      <CitySelector
        cities={Object.keys(citiesWeatherData)}
        selectedCity={city}
        onCityChange={setCity}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && weather && <WeatherDisplay weather={weather} />}
    </div>
  );
};

export default WeatherWidget;

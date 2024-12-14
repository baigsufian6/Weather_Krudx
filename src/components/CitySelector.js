import React from "react";

const CitySelector = ({ cities, selectedCity, onCityChange }) => {
  return (
    <div className="city-selector">
      {cities.map((city) => (
        <button
          key={city}
          className={selectedCity === city ? "selected" : ""}
          onClick={() => onCityChange(city)}
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export default CitySelector;

import React from "react";
import CityWeather from "./CityWeather";

const CityList = ({
  weatherData,
  backgroundColors,
  handleCityClick,
  handleRemoveCity,
}) => {
  return (
    <div className="scroll-container">
      <div className="container">
        {weatherData.length > 0 ? (
          weatherData.map((city, index) => (
            <div
              className="city-container"
              style={{ backgroundColor: backgroundColors[index] }}
              key={city?.id || index}
              onClick={() => handleCityClick(city)}
            >
              {city ? (
                <CityWeather
                  city={city}
                  onRemoveCity={() => handleRemoveCity(city.id)} // Pass the city id to handleRemoveCity
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ))
        ) : (
          <p>No weather data available for the selected cities.</p>
        )}
      </div>
    </div>
  );
};

export default CityList;

import React from "react";
import AdditionalInfo from "./AdditionalInfo";
import closeIcon from "../icons/closeIcon.png";
import weatherIcons from "../utils/WeatherIcons";
import TemperatureInfo from "./TemperatureInfo";
import {
  capitalizeFirstLetter,
  formatTime,
  formatShortDate,
} from "../constants/constants";

// CityWeather component displays weather information for a single city
// This component receives the 'city' object and 'onRemoveCity' function as props
// to show the weather details and allow removal of the city.

const CityWeather = ({ city, onRemoveCity }) => {
  const date = formatShortDate(city.dt);

  const time = formatTime(city.dt);

  const sunriseTime = formatTime(city.sys.sunrise);

  const sunsetTime = formatTime(city.sys.sunset);

  const weatherIconURL = weatherIcons[city.weather[0].main];

  const handleRemoveCityClick = (event) => {
    // Prevent the click event from propagating to the parent element
    event.stopPropagation();
    onRemoveCity(); // Call the provided onRemoveCity function
  };

  return (
    <div className="city-weather">
      <div className="column" id="function-col">
        <img
          src={closeIcon}
          alt="Close"
          id="closeIcon"
          className="icon"
          onClick={handleRemoveCityClick}
        />
      </div>

      <div className="column" id="weather-info">
        <div className="row" id="row-city">
          <br />
          <br />
          <h3>
            {city.name}, {city.sys.country}
          </h3>
          <p>
            {time}, {date}
          </p>
          <br />
          <p>
            <img
              src={weatherIconURL}
              alt={city.weather[0].main}
              className="wIcon-1"
            />
            <span>{capitalizeFirstLetter(city.weather[0].description)}</span>
          </p>
        </div>

        <TemperatureInfo city={city} />
      </div>

      <AdditionalInfo
        city={city}
        sunriseTime={sunriseTime}
        sunsetTime={sunsetTime}
      />
    </div>
  );
};

export default CityWeather;

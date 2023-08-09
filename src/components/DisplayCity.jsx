import React from "react";
import AdditionalInfo from "./AdditionalInfo";
import backArrow from "../icons/backArrow.png";
import weatherIcons from "../utils/WeatherIcons";
import TemperatureInfo from "./TemperatureInfo";
import {
  capitalizeFirstLetter,
  formatTime,
  formatShortDate,
} from "../constants/constants";

// DisplayCity component shows detailed weather information for a selected city
// This component receives the 'city' object and 'onBackClick' function as props
// to show the detailed weather info and allow going back to the main screen.

const DisplayCity = ({ city, onBackClick, WeatherData, weatherDataColors }) => {
  const indexInWeatherData = WeatherData.findIndex(
    (item) => item.id === city.id
  );

  let backgroundColor = weatherDataColors[indexInWeatherData];

  const date = formatShortDate(city.dt);

  const time = formatTime(city.dt);

  const sunriseTime = formatTime(city.sys.sunrise);
  const sunsetTime = formatTime(city.sys.sunset);

  const weatherIconURL = weatherIcons[city.weather[0].main];

  return (
    <div className="display-city" style={{ backgroundColor }}>
      <div className="column" id="function-col">
        <img src={backArrow} alt="Back" id="backArrow" onClick={onBackClick} />
      </div>

      <div className="row" id="city-info">
        <h3>
          {city.name}, {city.sys.country}
        </h3>
        <p>
          {time}, {date}
        </p>
      </div>

      <div className="column" id="weather-info">
        <div className="row" id="weather-icon">
          <img
            src={weatherIconURL}
            alt={city.weather[0].main}
            className="wIcon-2"
          />
          <br />
          <br />
          <b id="w-descri">
            {capitalizeFirstLetter(city.weather[0].description)}
          </b>
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

export default DisplayCity;

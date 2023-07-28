import React from 'react';
import cursorImg from "./icons/cursorImg.png";
import backArrow from "./icons/backArrow.png";
import weatherIcons from "./WeatherIcons";


// DisplayCity component shows detailed weather information for a selected city
// This component receives the 'city' object and 'onBackClick' function as props
// to show the detailed weather info and allow going back to the main screen.

const DisplayCity = ({ city, onBackClick , WeatherData}) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
const weatherDataColors = ["#388ee7", "#6249cc", "#de944e", "#CCCC00", "#40b681", "#9c3a3a", "#660066", "#191970"];
const defaultColor = weatherDataColors[Math.floor(Math.random() * 8)]; // Default color if there are more cities than colors

  let backgroundColor = defaultColor;

 // findIndex() searches for the index of the first element in WeatherData that passes the test
  const indexInWeatherData = WeatherData.findIndex((item) => item.id === city.id);

  // If the city exists in the WeatherData array and a valid color is available, use that color; otherwise, use the default color
  if (indexInWeatherData !== -1 && indexInWeatherData < weatherDataColors.length) {
    backgroundColor = weatherDataColors[indexInWeatherData];
  };
  
  const date = new Date(city.dt * 1000).toLocaleDateString([], { month: "short", day: "numeric" });
  const time = new Date(city.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunriseTime = new Date(city.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunsetTime = new Date(city.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const weatherIconURL = weatherIcons[city.weather[0].main];

  return (
    <div className="display-city" style={{ backgroundColor }}>
      <div className="column" id="function-col" >
        <img
          src={backArrow}
          alt="Back"
          id="backArrow"
          onClick={onBackClick}
        />
      </div>

      <div className="row" id="city-info">
        <h3>{city.name}, {city.sys.country}</h3>
        <p>{time}, {date}</p>
      </div>

      <div className="column" id="weather-info" style={{ backgroundImage: 'url("./icons/boxBackgroungImg.png")' }}>

        <div className="row" id="weather-icon" >
          <img
            src={weatherIconURL}
            alt={city.weather[0].main}
            className="wIcon-2"
            
          />
          <br />
          <br />
          <b>{capitalizeFirstLetter(city.weather[0].description)}</b>

        </div>

        <div className="row" id="temp-info-2">
          <h2>{Math.round(city.main.temp)}°C</h2>
          <p id = "p-1"><b>Temp Min: </b>{Math.round(city.main.temp_min)}°C</p>
          <p><b>Temp Max: </b>{Math.round(city.main.temp_max)}°C</p>
        </div>

      </div>

      <div className="column" id="additional-info">

        <div className="row" id="pressure-info">
          <p><b>Pressure: </b>{city.main.pressure}hPa</p>
          <p><b>Humidity: </b>{city.main.humidity}%</p>
          <p><b>Visibility: </b>{city.visibility / 1000}km</p>
        </div>

        <div className="row" id="wind-info">
          <br />
          <img src={cursorImg} alt="icon" className="icon" />
          <p>{city.wind.speed}m/s {city.wind.deg} Degree</p>
        </div>

        <SunriseAndSunset sunriseTime={sunriseTime} sunsetTime={sunsetTime}/>

      </div>
    </div>
  )
}
// SunriseAndSunset component displays sunrise and sunset time for a city
// This component receives 'sunriseTime' and 'sunsetTime' as props
const SunriseAndSunset = ({ sunriseTime, sunsetTime }) => {
    return (
      <div className="row" id="sun-colum">
        <p><b>Sunrise: </b>{sunriseTime}</p>
        <b>Sunset: </b>{sunsetTime}
      </div>
    );
  };

export default DisplayCity;

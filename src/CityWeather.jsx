import React from 'react';
import cursorImg from "./icons/cursorImg.png";
import closeIcon from "./icons/closeIcon.png";
import weatherIcons from "./WeatherIcons";


// CityWeather component displays weather information for a single city
// This component receives the 'city' object and 'onRemoveCity' function as props
// to show the weather details and allow removal of the city.

const CityWeather = ({ city, onRemoveCity }) => {
 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const date = new Date(city.dt * 1000).toLocaleDateString([], { month: "short", day: "numeric" });
  const time = new Date(city.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunriseTime = new Date(city.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunsetTime = new Date(city.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
                    className='icon'
                    onClick={handleRemoveCityClick}
                />
            </div>
      

      <div className="column" id="weather-info" >
        <div className="row" id="row-city">
          <br />
          <br />
          <h3>{city.name}, {city.sys.country}</h3>
          <p>{time}, {date}</p>
          <br />
          <p>
          <img
            src={weatherIconURL}
            alt={city.weather[0].main}
            className="wIcon-1"

            />
            {' '} 
            <span style={{
               fontSize: "12px",
               paddingTop: "-10px"
              }}>{capitalizeFirstLetter(city.weather[0].description)}</span>

          </p>
        </div>

        <div className="row" id="temp-info-1">
          <h2>{Math.round(city.main.temp)}°C</h2>
          <p><b>Temp Min: </b>{Math.round(city.main.temp_min)}°C</p>
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

        <SunriseAndSunset sunriseTime={sunriseTime} sunsetTime={sunsetTime} />
      </div>
    </div>
  )
}

const SunriseAndSunset = ({ sunriseTime, sunsetTime }) => {
  return (
    <div className="row" id="sun-column">
      <p><b>Sunrise: </b>{sunriseTime}</p>
      <b>Sunset: </b>{sunsetTime}
    </div>
  );
};

export default CityWeather;

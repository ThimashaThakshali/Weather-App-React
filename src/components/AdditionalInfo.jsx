// AdditionalInfo.jsx
import React from "react";
import cursorImg from "../icons/cursorImg.png";

const AdditionalInfo = ({ city, sunriseTime, sunsetTime }) => {
  return (
    <div className="column" id="additional-info">
      <div className="row" id="pressure-info">
        <p>
          <b>Pressure: </b>
          {city.main.pressure}hPa
        </p>
        <p>
          <b>Humidity: </b>
          {city.main.humidity}%
        </p>
        <p>
          <b>Visibility: </b>
          {city.visibility / 1000}km
        </p>
      </div>

      <div className="row" id="wind-info">
        <br />
        <img src={cursorImg} alt="icon" className="icon" />
        <p>
          {city.wind.speed}m/s {city.wind.deg} Degree
        </p>
      </div>

      <div className="row" id="sun-colum">
        <p>
          <b>Sunrise: </b>
          {sunriseTime}
        </p>
        <b>Sunset: </b>
        {sunsetTime}
      </div>
    </div>
  );
};

export default AdditionalInfo;

import React from "react";

const TemperatureInfo = ({ city }) => {
  return (
    <div className="row" id="temp-info">
      <h2>{Math.round(city.main.temp)}°C</h2>
      <p>
        <b>Temp Min: </b>
        {Math.round(city.main.temp_min)}°C
      </p>
      <p>
        <b>Temp Max: </b>
        {Math.round(city.main.temp_max)}°C
      </p>
    </div>
  );
};

export default TemperatureInfo;

import React, { useState, useEffect } from "react";
import "../styles/weather-app-styles.css";
import CityList from "./cityList";
import DisplayCity from "./DisplayCity";
import CitySearchForm from "./citySearchForm";
import { fetchWeatherData, fetchCityWeather } from "./api";

import {
  DEFAULT_WEATHER_DATA_COLORS,
  CACHE_EXPIRATION_TIME,
} from "../constants/constants";

const WeatherApp = () => {
  const [cityCodes, setCityCodes] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [weatherDataColors, setWeatherDataColors] = useState(
    DEFAULT_WEATHER_DATA_COLORS
  );

  // Function to handle click on a city card
  const handleCityClick = (city) => {
    setSelectedCity(city);
    setIsCitySelected(true);
  };

  // Function to handle click on the back arrow to return to the main screen
  const handleBackClick = () => {
    setIsCitySelected(false);
    setSelectedCity(null);
  };

  const handleRemoveCity = (cityId) => {
    // Filter out the city with the given cityId and update the weatherData state
    setWeatherData((prevWeatherData) =>
      prevWeatherData.filter((city) => city.id !== cityId)
    );
  };

  // Step 1: Load city codes from cities.json file into an array
  // useState hook is used to store the city codes in the 'cityCodes' state.

  useEffect(() => {
    // Fetch cities.json and extract CityCodes
    const fetchCitiesFile = async () => {
      try {
        const response = await fetch("./cities.json");
        const data = await response.json();
        const cityCodes = data.List.map((city) => city.CityCode);

        setCityCodes(cityCodes); // Update the 'cityCodes' state with the extracted codes
      } catch (error) {
        console.error("Error fetching cities.json:", error);
      }
    };
    fetchCitiesFile();
  }, []);

  // useEffect hook is ussed to fetch weather data based on the 'cityCodes' state.

  useEffect(() => {
    // Check if weather data exists in the cache
    const cachedData = JSON.parse(localStorage.getItem("weatherCache"));
    if (
      cachedData &&
      Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME
    ) {
      setWeatherData(cachedData.data);
    } else {
      if (cityCodes.length > 0) {
        fetchWeatherData(cityCodes) // Use the fetchWeatherData function
          .then((weatherData) => {
            setWeatherData(weatherData);

            // Save the fetched data along with the timestamp in local storage
            const cacheData = {
              data: weatherData,
              // Current timestamp in milliseconds
              timestamp: Date.now(),
            };
            localStorage.setItem("weatherCache", JSON.stringify(cacheData));
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      }
    }
  }, [cityCodes]);

  const createCityObject = (apiData) => {
    return {
      id: apiData.id,
      name: apiData.name,
      sys: {
        country: apiData.sys.country,
        sunrise: apiData.sys.sunrise,
        sunset: apiData.sys.sunset,
      },
      main: {
        temp: apiData.main.temp - 273.15,
        temp_min: apiData.main.temp_min - 273.15,
        temp_max: apiData.main.temp_max - 273.15,
        pressure: apiData.main.pressure,
        humidity: apiData.main.humidity,
      },
      visibility: apiData.visibility,
      weather: [
        {
          main: apiData.weather[0].main,
          description: apiData.weather[0].description,
        },
      ],
      wind: {
        speed: apiData.wind.speed,
        deg: apiData.wind.deg,
      },
      dt: apiData.dt,
    };
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Filter weatherData array to include only the required indices
  //const filteredWeatherData = [0, 1, 2, 4, 5].map((index) => weatherData[index]);

  const backgroundColors = weatherData
    ? weatherData.map((city, index) => {
        if (index < weatherDataColors.length) {
          return weatherDataColors[index];
        } else {
          return getRandomColor(); // Provide a default color if index is out of range
        }
      })
    : [];

  //add city
  const addCity = async (title) => {
    try {
      // Check if the city already exists in the weatherData array
      const existingCity = weatherData.find(
        (city) => city.name.toLowerCase() === title.toLowerCase()
      );

      if (existingCity) {
        console.log("City already exists:", existingCity);
        return;
      }

      const cityWeatherData = await fetchCityWeather(title);
      // Create a new city object from the fetched data
      const newCity = createCityObject(cityWeatherData);

      // Generate a random color for the city each time a city is added
      const newColor = getRandomColor();
      setWeatherDataColors((prevColors) => [...prevColors, newColor]);

      // Update the weatherData state by including the new city
      setWeatherData((prevWeatherData) => [...prevWeatherData, newCity]);
    } catch (error) {
      console.error("Error adding the city:", error);
      // If there's an error, you may show a message to the user or handle it accordingly.
    }
  };

  // Step 3: Created the UI using the fetched weather data and provided UI design

  return (
    <div className="app">
      {isCitySelected ? (
        <DisplayCity
          city={selectedCity}
          WeatherData={weatherData}
          onBackClick={handleBackClick}
          weatherDataColors={weatherDataColors}
        />
      ) : (
        <>
          <CitySearchForm addCity={addCity} />
          <br />
          {weatherData && weatherData.length > 0 ? ( // Check if weatherData has data before mapping
            <CityList
              weatherData={weatherData}
              backgroundColors={backgroundColors}
              handleCityClick={handleCityClick}
              handleRemoveCity={handleRemoveCity}
            />
          ) : (
            <p>No weather data available for the selected cities.</p>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherApp;

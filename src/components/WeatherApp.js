import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import CityWeather from "./components/CityWeather";
import DisplayCity from "./components/DisplayCity";

const apiKey = "f5178c482d6b31e2e8fa6af8bb150c79";
const API_URL = "http://api.openweathermap.org/data/2.5/group";

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

const WeatherApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityCodes, setCityCodes] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCitySelected, setIsCitySelected] = useState(false);

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

  // Function to handle the key press event in the input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addCity(searchTerm); // Call the addCity function when Enter key is pressed
    }
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

  // Step 2: Fetch weather data using the OpenWeatherMap API
  // useEffect hook is ussed to fetch weather data based on the 'cityCodes' state.

  // Function to fetch weather data for a list of city codes
  const fetchWeatherData = async () => {
    if (cityCodes.length === 0) return;

    try {
      const response = await fetch(
        `${API_URL}?id=${cityCodes.join(",")}&units=metric&appid=${apiKey}`
      );
      const weatherData = await response.json();
      setWeatherData(weatherData.list);

      //Step 4:
      // Save the fetched data along with the timestamp in local storage
      const cacheData = {
        data: weatherData.list,
        // Current timestamp in milliseconds
        timestamp: Date.now(),
      };
      //after stringifying the data, store data in localStorage
      localStorage.setItem("weatherCache", JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // Check if weather data exists in the cache
    const cachedData = JSON.parse(localStorage.getItem("weatherCache"));
    if (
      cachedData &&
      Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME
    ) {
      setWeatherData(cachedData.data);
    } else {
      // Fetch weather data from the API and cache it
      if (cityCodes.length > 0) {
        fetchWeatherData();
      }
    }
  }, [cityCodes]);

  const [weatherDataColors, setWeatherDataColors] = useState([
    "#388ee7",
    "#6249cc",
    "#de944e",
    "#CCCC00",
    "#40b681",
    "#9c3a3a",
    "#660066",
    "#191970",
  ]);

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

  const backgroundColors = weatherData.map((city, index) => {
    if (index < weatherDataColors.length) {
      return weatherDataColors[index];
    }
  });

  //add city
  const addCity = async (title) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${title}&appid=${apiKey}`
      );
      const data = await response.json();

      // Create a new city object from the fetched data
      const newCity = {
        id: data.id,
        name: data.name,
        sys: {
          country: data.sys.country,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        },
        main: {
          temp: data.main.temp - 273.15,
          temp_min: data.main.temp_min - 273.15,
          temp_max: data.main.temp_max - 273.15,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
        },
        visibility: data.visibility,
        weather: [
          {
            main: data.weather[0].main,
            description: data.weather[0].description,
          },
        ],
        wind: {
          speed: data.wind.speed,
          deg: data.wind.deg,
        },
        dt: data.dt,
      };

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
          <div className="search">
            <input
              placeholder="Enter a city"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="submit"
              alt="search"
              onClick={() => addCity(searchTerm)}
            >
              Add City
            </button>
          </div>
          <br />
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
        </>
      )}
    </div>
  );
};

export default WeatherApp;

import { API_BASE_URL, API_KEY, API_ENDPOINTS } from "../APIHelper";

// Step 2: Fetch weather data using the OpenWeatherMap API
// Function to fetch weather data for a list of city codes
const fetchWeatherData = async (cityCodes) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.GET_CITIES}?id=${cityCodes.join(
        ","
      )}&units=metric&appid=${API_KEY}`
    );

    const weatherData = await response.json();

    return weatherData.list;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
export { fetchWeatherData };

// Function to fetch weather data for a single city
const fetchCityWeather = async (cityName) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.GET_CITY}?q=${cityName}&appid=${API_KEY}`
    );

    const cityWeatherData = await response.json();

    return cityWeatherData;
  } catch (error) {
    console.error("Error fetching city weather:", error);
    throw error;
  }
};

export { fetchCityWeather };

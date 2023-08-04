import appSettings from "./appSetting.json";
export const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
export const API_ENDPOINTS = {
  GET_CITIES: "/group",
  GET_CITY: "/weather",
};
export const API_KEY = appSettings.apiKeys.openWeatherMapAPI;

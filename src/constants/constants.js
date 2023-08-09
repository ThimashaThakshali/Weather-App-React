export const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export const DEFAULT_WEATHER_DATA_COLORS = [
  "#388ee7",
  "#6249cc",
  "#de944e",
  "#CCCC00",
  "#40b681",
  "#9c3a3a",
  "#660066",
  "#191970",
];

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatShortDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};

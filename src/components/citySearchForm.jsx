import React, { useState } from "react";

const CitySearchForm = ({ addCity }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addCity(searchTerm);
    }
  };

  return (
    <div className="search">
      <input
        placeholder="Enter a city"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button type="submit" alt="search" onClick={() => addCity(searchTerm)}>
        Add City
      </button>
    </div>
  );
};

export default CitySearchForm;

import React from "react";

const AppHeader = () => {
  return (
    <div
      style={{
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>
        <img src="/LOGO.png" alt="app logo" /> Weather App
      </h1>
    </div>
  );
};

export default AppHeader;

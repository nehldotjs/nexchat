// src/contexts/PropContext.js
import React, { createContext, useContext, useState } from "react";

// 1. Create the Context Object
const PropContext = createContext();

// 2. Create the Provider Component
const PropProvider = ({ children }) => {
  let text = "HELLOO WORLD";
  
  const contextValue = {
    text
  };

  return (
    <PropContext.Provider value={contextValue}>{children}</PropContext.Provider>
  );
};

export default PropProvider;

// 3. Create a Custom Hook for Consuming the Context
const useData = () => {
  const context = useContext(PropContext);
  if (!context) {
    throw new Error("useData must be used within a PropProvider");
  }
  return context;
};

export { useData };

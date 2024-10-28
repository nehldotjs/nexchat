 import React, { createContext, useContext, useState } from "react";

// 1. Create the Context Object
const PropContext = createContext();

// 3. Create a Custom Hook for Consuming the Context
export const useData = () => {
  const context = useContext(PropContext);
  if (!context) {
    throw new Error("useData must be used within a PropProvider");
  }
  return context;
};

// 2. Create the Provider Component

const PropProvider = ({ children }) => {
  const [info, setInfo] = useState(false);
  const [mobileScreenList, setMobileScreenList] = useState(false);
  const windowWidth = window.screen.width <= 900;
  const contextValue = {
    info,
    setInfo,
    mobileScreenList,
    setMobileScreenList,
    windowWidth
  };

  return (
    <PropContext.Provider value={contextValue}>{children}</PropContext.Provider>
  );
};

export default PropProvider;

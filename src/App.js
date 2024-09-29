import React from "react";
import "./App.css";
import Screens from "./Components/Screens";

import bg from "../src/Assets/20230317_225254.jpg";
function App() {
  return (
    <div className="App">
      <div className="bgImageWrapper">
        <img src={bg} alt="" />
      </div>
      <Screens />
    </div>
  );
}

export default App;

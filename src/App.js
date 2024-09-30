import React, { useState } from "react";
import "./App.css";
import Screens from "./Components/Screens";
import bg from "../src/Assets/20230317_225254.jpg";
import UserAuthenticationScreen from "./Components/Login/UserAuthenticationScreen";
import userEvent from "@testing-library/user-event";

function App() {
  const [userAuth, setUserAuth] = useState(true);
  return (
    <div className="App">
      {!userAuth ? (
        <UserAuthenticationScreen />
      ) : (
        <>
          <div className="bgImageWrapper">
            <img src={bg} alt="" />
          </div>
          <Screens />
        </>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import Screens from "./Components/Screens";
import UserAuthenticationScreen from "./Components/Login/UserAuthenticationScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/Firebase";

import myGif from "./Assets/l2.gif";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useUserStore } from "./lib/UseStore";
import { useData } from "./context/PropContext";
import doodleImg from "./Assets/pngwing.com (2).png";

function App() {
   const { isLoading, fetchUserInfo, currentUser } = useUserStore();
  const { windowWidth } = useData();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        toast.success("Logged in successfully");
        fetchUserInfo(user.uid);
       } else {
        fetchUserInfo(null);
       }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return (
      <div className="loadingContainer">
        <img
          src={myGif}
          alt="Local Example GIF"
          style={windowWidth ? { width: "60%" } : { width: "auto" }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="backgroundDoodleImage">
        <img src={doodleImg} alt="" className="doodleImg" />
      </div>
      <div className="App">
        {currentUser ? <Screens /> : <UserAuthenticationScreen />}
        <ToastContainer
          style={{ position: "absolute", bottom: "10px", right: "10px" }}
        />
      </div>
    </>
  );
}

export default App;

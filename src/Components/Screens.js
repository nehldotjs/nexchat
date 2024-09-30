import React from "react";
import List from "./List/List";
import Chat from "./chat/Chat"; 

import "./screens.css";
import Details from "./Details/Details";

function Screens() {
  return (
    <div className="screen">
      <List />
      <Chat />
      <Details />
    </div>
  );
}

export default Screens;

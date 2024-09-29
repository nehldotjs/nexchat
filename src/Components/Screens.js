import React from "react";
import List from "./List/List";
import Chat from "./chat/Chat";
import Details from "./Details/Details";

import "./screens.css";

function Screens() {
  return (
    <div className="screen">
      <List />
       <Chat />
    </div>
  );
}

export default Screens;

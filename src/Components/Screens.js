import React from "react";
import List from "./List/List";
import Chat from "./chat/Chat";

import "./screens.css";
import Details from "./Details/Details";
import { useChatStore } from "../lib/chatStore";
import { useData } from "../context/PropContext";

function Screens() {
  const { mobileScreenList, windowWidth } = useData();
  const { chatId } = useChatStore();
  return (
    <div className="screen">
      <List />

      <div
        className={
          !windowWidth
            ? "userChatInfoContainer"
            : mobileScreenList && windowWidth
            ? "userChatInfoContainer"
            : "display"
        }>
        {chatId && <Chat />}
        <Details />
      </div>
    </div>
  );
}

export default Screens;

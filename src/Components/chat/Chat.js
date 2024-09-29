import React from "react";
import Details from "../Details/Details";

import { FaCamera, FaImage, FaMicrophone } from "react-icons/fa";
import { VscSmiley } from "react-icons/vsc";
import { FiSend } from "react-icons/fi";


import "./Chat.css";

function Chat() {
  return (
    <div className="chatContainer">
      <div className="chatMsgWrapper">
        <div className="friendHeader">
          
        </div>
        <div className="messagesWrapper">2</div>
        <div className="messagesInputWrapper">
          <div className="messageTabs mediaChatIconsWrapper">
            <button className="mediaIcon">
              <FaImage />
            </button>
            <button className="mediaIcon">
              <FaCamera />
            </button>
            <button className="mediaIcon">
              <FaMicrophone />
            </button>
          </div>
          <div className="messageTabs">
            <input type="text" name="message" className="messageInput" />
          </div>
          <div className="messageTabs mediaChatIconsWrapper">
            <button className="mediaIcon">
              <VscSmiley />
            </button>
            <button className="mediaIcon sendIcon">
              <FiSend  size={30}/>
            </button>
          </div>
        </div>
      </div>
      <Details />
    </div>
  );
}

export default Chat;

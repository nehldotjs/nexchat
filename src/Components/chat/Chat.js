import React from "react";
import Details from "../Details/Details";
import avatar from "../../Assets/userImage.jpg";

import { FaCamera, FaImage, FaMicrophone, FaVideo } from "react-icons/fa";
import { VscSmiley } from "react-icons/vsc";
import { FiAlertCircle, FiSend } from "react-icons/fi";

import "./Chat.css";
import { IoCall } from "react-icons/io5";
import { useData } from "../../context/PropContext";

function Chat() {
  // const { text } = useData();

  const chats = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa enim animi repellendus maxime quisquam explicabo temporibus harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: true
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa enim animi repellendus maxime quisquam explicabo temporibus harum reiciendis autemeveniet.",
      time: "2:00",
      image: avatar,
      friend: true
    },
    {
      id: 3,
      text: "harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: true
    },
    {
      id: 4,
      text: "harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: false
    },
    {
      id: 5,
      text: "harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: true
    },
    {
      id: 6,
      text: "harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: false
    },
    {
      id: 7,
      text: "harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: false
    },
    {
      id: 8,
      text: "harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: false
    },
    {
      id: 9,
      text: "harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: true
    },
    {
      id: 10,
      text: "harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.harum reiciendis autemeveniet.",
      time: "1:30",
      image: avatar,
      friend: true
    }
  ];
  return (
    <div className="chatContainer">
      <div className="chatMsgWrapper">
        <div className="friendHeader">
          <div className="friendInfo">
            <div className="avatarWrapper">
              <img src={avatar} alt="" />
            </div>
            <div className="friendInfoDetail">
              <h5>pizu</h5>
              <div className="activityWrapper">
                <div className="indicatorWrapper"></div>
                <p>online </p>
              </div>
            </div>
          </div>
          <div className="connectFriendIconWrapper">
            <button>
              <IoCall />
            </button>
            <button>
              <FaVideo />
            </button>
            <button>
              <FiAlertCircle />
            </button>
          </div>
        </div>

        <div className="messagesContainer">
          {/* <div className="messagesWrapper"> */}
          {chats.map((x) => {
            const { id, friend, text, image, time } = x;
            return (
              <div
                className={friend ? "userMessage" : "userMessage chatB"}
                key={id}>
                {friend && (
                  <div className="chatAvatarContainer">
                    <div className="chatAvatarWrapper">
                      <img src={image} alt="" />
                    </div>
                  </div>
                )}
                <p>
                  {text}
                  <span>
                    {time} <span className="messageTime">pm</span>
                  </span>
                </p>
              </div>
            );
          })}
        </div>

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
              <FiSend size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

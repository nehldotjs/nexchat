import React, { useEffect, useState, useRef } from "react";
import {
  FaArrowLeft,
  FaCamera,
  FaImage,
  FaMicrophone,
  FaVideo
} from "react-icons/fa";
import { VscSmiley } from "react-icons/vsc";
import { FiAlertCircle, FiSend } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import "./Chat.css";
import { IoCall } from "react-icons/io5";
import { useUserStore } from "../../lib/UseStore";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { db } from "../../lib/Firebase.jsx";
import { useChatStore } from "../../lib/chatStore.jsx";
import { toast } from "react-toastify";
import Upload from "../../lib/Upload.jsx";

import { useData } from "../../context/PropContext.js";
import { MdDownload } from "react-icons/md";

function Chat() {
  const [chats, setChats] = useState({ messages: [] });
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState({
    file: null,
    url: ""
  });

  const { setInfo, setMobileScreenList, windowWidth } = useData();
  const { chatId, user, isReceiverBlocked, isCurrentUserBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef();

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg((prevState) => ({
        ...prevState,
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      }));
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    if (!chatId) return;
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (!text && !img.file) return;
    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await Upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          senderId: currentUser.uid,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl })
        })
      });

      const userIDs = [currentUser.uid, user.uid];
      for (const id of userIDs) {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text || "Image";
          userChatsData.chats[chatIndex].isSeen =
            id === user.uid ? false : true;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats
          });
        }
      }
    } catch (err) {
      toast.error("Message not sent, check network connection");
      console.error(err.message);
    }

    setText(""); // Clear text input
    setImg({ file: null, url: "" }); // Reset image
  };

  const handleUserInfo = () => {
    setInfo((prev) => !prev);
  };

  const goBack = () => {
    setMobileScreenList((prev) => !prev);
  };
  return (
    <div className="chatContainer">
      <div className="chatMsgWrapper">
        <div className="friendHeader">

          {windowWidth && (
            <div className="backButton" onClick={goBack}>
              <FaArrowLeft color="white" size={20} />
            </div>
          )}

          <div className="friendInfo" onClick={handleUserInfo}>
            <div className="avatarWrapper">
              <img src={user?.avatar} alt="" />
            </div>
            <div className="friendInfoDetail">
              <h5>{user?.username} </h5>
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
          <div className="messagesWrapper">
            {chats?.message?.map(({ text, createdAt, senderId, img }) => (
              <div
                className={
                  senderId === currentUser.uid
                    ? "userMessage chatB"
                    : "userMessage"
                }
                key={createdAt}>
                {/* Only show avatar for received messages */}
                {senderId !== currentUser.uid && (
                  <div className="chatAvatarContainer">
                    <div className="chatAvatarWrapper">
                      <img src={user?.avatar} alt="" />
                    </div>
                  </div>
                )}

                <div className="userMessageWrapper">
                  {text && <p>{text}</p>}
                  {img && (
                    <div className="imgSentWrapper">
                      <a href={img} download="myImage.jpg"></a>
                      <img src={img} alt="Sent content" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={endRef}></div>
          </div>
        </div>

        {img.url && (
          <div className="textImageWrapper">
            <div className="textImageContainer">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}

        <div className="messagesInputWrapper">
          {isReceiverBlocked ? (
            <h2 className="chatErrMessage">Unblock user to send message</h2>
          ) : isCurrentUserBlocked ? (
            <h2 className="chatErrMessage">can not send message</h2>
          ) : (
            <>
              <div className="messageTabs mediaChatIconsWrapper">
                <label htmlFor="upload" className="mediaIcon">
                  <FaImage />
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  placeholder="Upload file"
                  id="upload"
                  name="upload"
                  onChange={handleImage}></input>
                <button className="mediaIcon">
                  <FaCamera />
                </button>
                <button className="mediaIcon">
                  <FaMicrophone />
                </button>
              </div>
              <div className="messageTabs textMssgWrapper">
                <input
                  type="type something"
                  name="message"
                  className="messageInput"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              

              <div className="messageTabs mediaChatIconsWrapper">
                <div className="emojiWrapper">
                  {open && (
                    <EmojiPicker onEmojiClick={handleEmoji} className="emoji" />
                  )}
                </div>
                <button
                  className="mediaIcon"
                  onClick={() => setOpen((prev) => !prev)}>
                  <VscSmiley />
                </button>
                <button
                  className="mediaIcon sendIcon"
                  onClick={handleSend}
                  // disabled={isReceiverBlocked || isCurrentUserBlocked}
                >
                  <FiSend size={30} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;

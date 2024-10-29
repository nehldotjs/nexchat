// List.js
import React, { useEffect, useState } from "react";
import "./List.css";
import { FaPlus, FaMinus, FaUser } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { TbUsersPlus } from "react-icons/tb";
import { RiSearchLine } from "react-icons/ri";
import { useUserStore } from "../../lib/UseStore";
import { useChatStore } from "../../lib/chatStore";
import { useData } from "../../context/PropContext";

import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "../../lib/Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List() {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [hideList, setHideList] = useState(false);
  const [addUserName, setAddUserName] = useState("");

  const { changeChat } = useChatStore();
  const { currentUser } = useUserStore();
  const { mobileScreenList, setMobileScreenList, windowWidth } = useData();

  useEffect(() => {
    if (!currentUser?.uid) {
      console.warn("currentUser.uid is undefined");
      setChats([]);
      return;
    }
    const chatDocRef = doc(db, "userchats", currentUser.uid);

    const unSub = onSnapshot(
      chatDocRef,
      async (res) => {
        try {
          if (!res.exists()) {
            console.warn(`No chats found for user ID: ${currentUser.uid}`);
            setChats([]);
            return;
          }

          const items = res.data().chats;

          if (!Array.isArray(items)) {
            console.warn("'chats' is not an array in document");
            setChats([]);
            return;
          }

          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "user", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
              console.warn(
                `No user data found for receiverId: ${item.receiverId}`
              );
              return { ...item, user: null };
            }

            const user = userDocSnap.data();
            return { ...item, user };
          });

          const chatData = await Promise.all(promises);

          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        } catch (error) {
          console.error("Error processing chat data:", error);
          setChats([]);
        }
      },
      (error) => {
        console.error("Error with onSnapshot listener:", error);
        setChats([]);
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser]);

  const handleAddUserInput = (e) => {
    const { value } = e.target;
    setAddUserName(value.toLowerCase());
  };

  const handleSubmitNewUser = async () => {
    const username = addUserName.trim();
    if (!username) {
      toast.error("Username cannot be empty.");
      return;
    }

    try {
      const usersRef = collection(db, "user");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("User not found.");
        setUser(null);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const receiverId = userDoc.id; // Fixed this, should be doc.id not .uid
      const receiverData = userDoc.data();

      if (receiverId === currentUser.uid) {
        toast.error("You cannot add yourself.");
        setUser(null);
        return;
      }

      setUser({ ...receiverData, uid: receiverId });
      toast.success(
        `User "${username}" found. Click the add button to start chat.`
      );
    } catch (err) {
      console.log("Error in handleSubmitNewUser:", err.message);
      toast.error("An error occurred while searching for the user.");
    }
  };

  const handleFriend = async () => {
    if (!user?.uid) {
      toast.error("Invalid user data.");
      return;
    }

    const chatsCollectionRef = collection(db, "chats");
    const userChatCollectionRef = collection(db, "userchats");

    try {
      const chatId =
        currentUser.uid > user.uid
          ? `${currentUser.uid}_${user.uid}`
          : `${user.uid}_${currentUser.uid}`;

      const chatDocRef = doc(chatsCollectionRef, chatId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (!chatDocSnap.exists()) {
        await setDoc(chatDocRef, {
          createdAt: serverTimestamp(),
          messages: []
        });
        toast.success(`Chat with "${user.username}" has been created.`);
      } else {
        toast.info(`Chat with "${user.username}" already exists.`);
      }

      const DocRef1 = doc(userChatCollectionRef, currentUser.uid);
      const DocRef2 = doc(userChatCollectionRef, user.uid);

      await updateDoc(DocRef1, {
        chats: arrayUnion({
          chatId: chatId,
          lastMessage: "",
          receiverId: user.uid,
          updatedAt: Date.now()
        })
      });

      await updateDoc(DocRef2, {
        chats: arrayUnion({
          chatId: chatId,
          lastMessage: "",
          receiverId: currentUser.uid,
          updatedAt: Date.now()
        })
      });

      setUser(null);
      setAddUserName("");
    } catch (err) {
      console.log("Error in handleFriend:", err.message);
      toast.error("An error occurred while starting the chat.");
    }
  };

  const handleSelect = async (chatId) => {
    const selectedChat = chats.find((chat) => chat.chatId === chatId);
    if (selectedChat) {
      changeChat(selectedChat.chatId, selectedChat.user);
    }

    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === selectedChat.chatId
    );

    userChats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userchats", currentUser.uid);
    try {
      await updateDoc(userChatRef, { chats: userChats });
    } catch (err) {
      console.log(err.message);
    }

    windowWidth && setMobileScreenList(true);
  };

  return (
    <div
      className={
        !windowWidth
          ? "listContainer"
          : mobileScreenList && windowWidth
          ? "display"
          : "listContainer"
      }>
      <div className="userHeaderWrapper">
        <div className="userDetail">
          <div className="user">
            {currentUser ? (
              <img
                src={currentUser?.avatar}
                alt="User Avatar"
                className="userImage"
              />
            ) : (
              <FaUser className=" userImageIcon " />
            )}
          </div>
          <h6>{currentUser?.username || "Loading ..."}</h6>
        </div>
        <div className="iconsWrapper">
          <button className="headerIcon">
            <SlOptions />
          </button>
          <button className="headerIcon">
            <IoVideocam />
          </button>
          <button className="headerIcon">
            <FaArrowUpRightFromSquare />
          </button>
        </div>
      </div>

      <div className="searchSection">
        <div className="chatSearchWrapper">
          <input
            type="text"
            name="search"
            placeholder="Search chat"
            className="searchInput"
          />
        </div>
        <div className="addFriendWrapper">
          <button onClick={() => setHideList((prev) => !prev)}>
            {!hideList ? <FaPlus /> : <FaMinus />}
          </button>
        </div>
      </div>

      <div className="chatListContainer">
        <div className="addFriendContainer">
          <div
            className={
              hideList
                ? "addFriendResultWrapper"
                : "addFriendResultWrapper hideList"
            }>
            <div className="newSearchContainer">
              <input
                type="text"
                placeholder="Add username"
                onChange={handleAddUserInput}
                value={addUserName}
              />
              <button onClick={handleSubmitNewUser}>
                <RiSearchLine />
              </button>
            </div>
            {user && (
              <div className="newfriendSearchResult">
                <div className="newFriendResult">
                  <div className="newfriendInfo">
                    <div className="newFriendImageWrapper">
                      <img src={user.avatar} alt="New User Avatar" />
                    </div>
                    <h4>{user.username}</h4>
                  </div>
                  <button onClick={handleFriend}>
                    <TbUsersPlus size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {chats.map((chat) => {
          const { chatId, lastMessage, user } = chat;
          return (
            <div
              style={{
                backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"
              }}
              className="ChatListWrapper"
              key={chatId}
              onClick={() => handleSelect(chatId)}>
              <div className="userFriend">
                <div className="avatarWrapper">
                  <img
                    src={user?.avatar}
                    alt="Friend Avatar"
                    className="friendAvatar"
                  />
                </div>
              </div>
              <div className="chatMessageWrapper">
                <h4>{user?.username || "Unknown User"}</h4>
                <p>
                  {lastMessage.split(" ").slice(0, 5).join(" ")}
                  {lastMessage.split(" ").length > 5 && "  ..."}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default List;

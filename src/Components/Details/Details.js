import React, { useEffect, useState } from "react";
import "./Details.css";
import { useData } from "../../context/PropContext";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth, db } from "../../lib/Firebase";
import { useUserStore } from "../../lib/UseStore";
import { FaUser } from "react-icons/fa";
import { useChatStore } from "../../lib/chatStore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

function Details() {
  const [chatImgs, setChatImgs] = useState([]);
  const { info, setInfo } = useData();

  const { currentUser, setIsLoading } = useUserStore();
  const {
    user,
    chatId,
    isReceiverBlocked,
    isCurrentUserBlocked,
    changeBlocked
  } = useChatStore();

  useEffect(() => {
    if (!chatId) return;
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChatImgs(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  const handleBlock = async () => {
    if (!user) {
      return;
    }

    const userDocRef = doc(db, "user", currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(user.uid)
          : arrayUnion(user.uid)
      });

      changeBlocked();
    } catch (err) {
      console.log(err.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-Out Error:", error);
      toast.error("Please check your network connection and try again.");
    } finally {
      toast.success("Logged out successfully");
    }
  };

  const handleDiv = () => {
    setInfo((prev) => !prev);
  };

  return (
    <>
      <div
        className="detailClickabeDiv"
        onClick={handleDiv}
        style={{ display: info ? "flex" : "none" }}></div>
      <div
        className={
          !info ? "detailsContainer" : "detailsContainer detailVisible"
        }>
        <div className="detailSection1">
          <div className="detailAvatar">
            {user?.avatar ? (
              <img src={user?.avatar} alt="" />
            ) : (
              <FaUser size={100} color={"white"} />
            )}
          </div>
          <div className="detailUserInfo">
            <h4>{user?.username || "loading ..."}</h4>
            <p className="statusQuote">{user?.bio || ""}</p>
          </div>
        </div>
        <div className="detailLine"></div>
        <div className="detailSection2">
          <p>shared media :</p>
          <div className="detailImgsFileConatiner">
            {chatImgs?.message?.map(
              ({ img, createdAt }) =>
                img && (
                  <div className="detailImgsFile" key={createdAt}>
                    <img src={img} alt="" />
                  </div>
                )
            )}
          </div>
        </div>
        <div className="detailLine"></div>
        <div className="detailSection3">
          <button onClick={handleBlock}>
            {isCurrentUserBlocked ? (
              <h5>you are blocked</h5>
            ) : isReceiverBlocked ? (
              <h5>user blocked</h5>
            ) : (
              <h5>block user</h5>
            )}
          </button>
          <button onClick={signOutUser}>
            <h5>log out</h5>
          </button>
        </div>
      </div>
    </>
  );
}

export default Details;

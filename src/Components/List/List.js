import React, { useState } from "react";
import "./List.css";
import { FaPlus } from "react-icons/fa";
import avatar from "../../Assets/userImage.jpg";
import { FaArrowUpRightFromSquare, FaMinus } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { TbUsersPlus } from "react-icons/tb";
import { RiSearchLine } from "react-icons/ri";

function List() {
  const [hideList, setHideList] = useState(false);
  return (
    <div className="listContainer">
      <div className="userHeaderWrapper">
        <div className="userDetail">
          <div className="user">
            <img src={avatar} alt="" className="userImage" />
          </div>
          <h6>John Doe</h6>
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
          <button
            onClick={() => {
              setHideList((prev) => !prev);
            }}>
            {!hideList ? <FaPlus /> : <FaMinus />}
          </button>
        </div>
      </div>

      <div className="chatListContainer">
        <div className="addFriendContainer">
          <div
            className={
              !hideList
                ? "addFriendResultWrapper hideList"
                : "addFriendResultWrapper "
            }>
            <div className="newSearchContainer">
              <input type="text" placeholder="Add username" />
              <button>
                <RiSearchLine />
              </button>
            </div>
            <div className="newfriendSearchResult">
              <div className="newFriendResult">
                <div className="newfriendInfo">
                  <div className="newFriendImageWrapper">
                    <img src={avatar} alt="" />
                  </div>
                  <h4>pizu</h4>
                </div>
                <button>
                  <TbUsersPlus size={20} />
                </button>
              </div>
              <div className="newFriendResult">
                <div className="newfriendInfo">
                  <div className="newFriendImageWrapper">
                    <img src={avatar} alt="" />
                  </div>
                  <h4>pizu</h4>
                </div>
                <button>
                  <TbUsersPlus size={20} />
                </button>
              </div>
              <div className="newFriendResult">
                <div className="newfriendInfo">
                  <div className="newFriendImageWrapper">
                    <img src={avatar} alt="" />
                  </div>
                  <h4>pizu</h4>
                </div>
                <button>
                  <TbUsersPlus size={20} />
                </button>
              </div>
              <div className="newFriendResult">
                <div className="newfriendInfo">
                  <div className="newFriendImageWrapper">
                    <img src={avatar} alt="" />
                  </div>
                  <h4>pizu</h4>
                </div>
                <button>
                  <TbUsersPlus size={20} />
                </button>
              </div>
              <div className="newFriendResult">
                <div className="newfriendInfo">
                  <div className="newFriendImageWrapper">
                    <img src={avatar} alt="" />
                  </div>
                  <h4>pizu</h4>
                </div>
                <button>
                  <TbUsersPlus size={20} />
                </button>
              </div>
              <div className="newFriendResult">
                <div className="newfriendInfo">
                  <div className="newFriendImageWrapper">
                    <img src={avatar} alt="" />
                  </div>
                  <h4>pizu</h4>
                </div>
                <button>
                  <TbUsersPlus size={20} />
                </button>
              </div>
              <div className="newFriendResult">
                <div className="newfriendInfo">
                  <div className="newFriendImageWrapper">
                    <img src={avatar} alt="" />
                  </div>
                  <h4>pizu</h4>
                </div>
                <button>
                  <TbUsersPlus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="ChatListWrapper">
          <div className="userFriend">
            <div className="avatarWrapper">
              <img src={avatar} alt="" className="friendAvatar" />
            </div>
          </div>
          <div className="chatMessageWrapper">
            <h4>jane Doe</h4>
            <p>Where the money @ ??</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;

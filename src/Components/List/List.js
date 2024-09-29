import React from "react";
import "./List.css";
import { FaPlus } from "react-icons/fa";
import avatar from "../../Assets/userImage.jpg";

function List() {
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
          <div className="headerIcon"></div>
          <div className="headerIcon"></div>
          <div className="headerIcon"></div>
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
          <button>
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="chatListContainer">
        <div className="ChatListWrapper">
          <div className="userFriend">
            <div className="avatarWrapper">
              <img src={avatar} alt="" className="friendAvatar" />
            </div>
          </div>
          <div className="chatMessageWrapper">
            <h4>jane Doe</h4>
            <p>
              Where the money @ ??  
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;

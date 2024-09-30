import React from "react";
import "./Details.css";

import avatar from "../../Assets/userImage.jpg";

function Details() { 
  return (
    <div className="detailsContainer">
      <div className="detailSection1">
        <div className="detailAvatar">
          <img src={avatar} alt="" />
        </div>
        <div className="detailUserInfo">
          <h4>nelson</h4>
          <p className="statusQuote">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
            soluta.
          </p>
        </div>
      </div>
      <div className="detailLine"></div>
      <div className="detailSection2">2</div>
      <div className="detailLine"></div>
      <div className="detailSection3">
        <button>
          <h5>block user</h5>
        </button>
        <button>
          <h5>log out</h5>
        </button>
      </div>
    </div>
  );
}

export default Details;

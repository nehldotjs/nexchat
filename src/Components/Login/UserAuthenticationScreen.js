import React, { useState } from "react";
import "./UserAuthenticationScreen.css";

import loginImg from "../../Assets/login.jpg";
import signUpImg from "../../Assets/signup.jpg";
import crumpledPaper from "../../Assets/view-white-crumpled-paper.jpg";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

function UserAuthenticationScreen() {
  const [animation, setAnimation] = useState(true);
  const [state, setState] = useState({
    password: false
  });

  return (
    <div className="authContainer">
      <img src={crumpledPaper} alt="" className="doodle" />

      <div className="authWrapper">
        <div
          className={
            animation
              ? "authImageContainer plusAnimation"
              : "authImageContainer"
          }>
          <div className={"authImageWrapper"}>
            <img src={loginImg} alt="" />
          </div>

          <div
            className={
              animation ? "authImageWrapper minusAnimation" : "authImageWrapper"
            }>
            <img src={signUpImg} alt="" />
          </div>
        </div>

        <div
          className={
            animation ? " authInputWrapper minusAnimation" : "authInputWrapper"
          }>
          <div
            className={
              !animation
                ? "signUpInputsWrapper inputPlusAnimation"
                : "signUpInputsWrapper"
            }>
            <h1>sign up</h1>
            <button
              onClick={() => {
                setAnimation((prev) => !prev);
              }}>
              sign up
            </button>
          </div>
          <div
            className={
              animation
                ? "loginInputWrapper inputPlusAnimation"
                : "loginInputWrapper"
            }>
            <div className="loginWriteUp">
              <h1>Welcome</h1>
            </div>

            <div className="l-inputsWrapper">
              <p>log into your account</p>
              <div className="form">
                <div className="i-wrapper">
                  <input type="email" placeholder="Email" name="email" />
                </div>
                <div className="i-wrapper">
                  <input
                    type={!state.password ? "password" : "text"}
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    className="passwordVisibilityToggleBtn"
                    onClick={() => setState({ password: !state.password })}>
                    {state.password ? (
                      <IoEyeOffSharp className="loginIcon" />
                    ) : (
                      <FaEye className="loginIcon" />
                    )}
                  </button>
                </div>
              </div>
              <button className="loginBtn">login</button>

              <button
                className="signUpBtn"
                onClick={() => {
                  setAnimation((prev) => !prev);
                }}>
                don't have an account yet? Sign Up
              </button>

              <div className="horizontalLine"></div>

              <button className="loginWithGoogle">
                <span>
                  <FcGoogle size={25} />
                  Login with google
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAuthenticationScreen;

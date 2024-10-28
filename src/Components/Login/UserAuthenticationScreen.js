import React, { useState } from "react";
import "./UserAuthenticationScreen.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, db, GOOGLE_PROVIDER } from "../../lib/Firebase";
import { doc, setDoc } from "firebase/firestore";

import { useData } from "../../context/PropContext";
import loginImg from "../../Assets/login.jpg";
import signUpImg from "../../Assets/signup.jpg";

import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Upload from "../../lib/Upload";

function UserAuthenticationScreen() {
  const { loading, setLoading, windowWidth } = useData();
  const [animation, setAnimation] = useState(true);

  // Separate state for sign-up
  const [signUpState, setSignUpState] = useState({
    passwordVisible: false,
    file: null,
    url: "",
    username: "",
    email: "",
    password: ""
  });

  // Separate state for login
  const [loginState, setLoginState] = useState({
    passwordVisible: false,
    username: "",
    password: ""
  });

  // Handle Login Form Submission
  const handleLogin = () => {
    const { username, password } = loginState;
    try {
      signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  // Handle Sign-Up Form Submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, email, password, file } = signUpState;
    if (!email || !password || password.length < 6) {
      toast.error(
        "Ensure all fields are filled and the password is at least 6 characters."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await Upload(file);

      const userData = {
        username,
        email,
        bio: "",
        avatar: imgUrl,
        uid: res.user.uid,
        blocked: []
      };

      await setDoc(doc(db, "user", res.user.uid), userData);
      await setDoc(doc(db, "userchats", res.user.uid), { chats: [] });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("An error occurred during sign-up");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Avatar Upload
  const handleSignUpAvatar = (e) => {
    if (e.target.files[0]) {
      setSignUpState((prevState) => ({
        ...prevState,
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      }));
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, GOOGLE_PROVIDER);
      const user = result.user;
      console.log("Google signed in user:", user);
    } catch (error) {
      console.error("Error with Google sign-in:", error.message);
      // Optionally, set error state to display to the user
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, GOOGLE_PROVIDER);
      const user = result.user;
      console.log("Google signed up user:", user);
    } catch (error) {
      console.error("Error with Google sign-up:", error.message);
      // Optionally, set error state to display to the user
    }
  };

  const toggleSignUpPasswordVisibility = () => {
    setSignUpState((prevState) => ({
      ...prevState,
      passwordVisible: !prevState.passwordVisible
    }));
  };

  const toggleLoginPasswordVisibility = () => {
    setLoginState((prevState) => ({
      ...prevState,
      passwordVisible: !prevState.passwordVisible
    }));
  };

  // Handle input changes for Sign-Up form
  const handleSignUpInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle input changes for Login form
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="authContainer">
      <div className="authWrapper">
        <div
          style={{ display: !windowWidth ? "flex" : "none" }}
          className={
            animation
              ? "authImageContainer plusAnimation"
              : "authImageContainer"
          }>
          <div className="authImageWrapper">
            <img src={loginImg} alt="Login Illustration" />
          </div>

          <div
            className={
              animation ? "authImageWrapper minusAnimation" : "authImageWrapper"
            }>
            <img src={signUpImg} alt="Sign Up Illustration" />
          </div>
        </div>
        {/* _____________________SIGN UP______ */}

        <div
          style={{ width: windowWidth ? "100%" : "" }}
          className={
            !windowWidth && animation
              ? "authInputWrapper minusAnimation"
              : "authInputWrapper"
          }>
          <div
            className={
              !animation
                ? "signUpInputsWrapper inputPlusAnimation"
                : "signUpInputsWrapper"
            }>
            <div className="signUpWriteUp">
              <h1>NexChat</h1>
            </div>

            <div className="s-inputsWrapper">
              <p>Create an account</p>
              <div className="form">
                <div className="fileWrapper">
                  <label htmlFor="upload">Upload image</label>
                  <input
                    type="file"
                    placeholder="Upload file"
                    id="upload"
                    name="upload"
                    onChange={handleSignUpAvatar}
                  />
                  <div className="uploadAvatarContainer">
                    {signUpState.url && (
                      <img src={signUpState.url} alt="Uploaded Avatar" />
                    )}
                  </div>
                </div>
                <div className="s-wrapper">
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={signUpState.username}
                    onChange={handleSignUpInputChange}
                    required
                  />
                </div>
                <div className="s-wrapper">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={signUpState.email}
                    onChange={handleSignUpInputChange}
                    required
                  />
                </div>
                <div className="s-wrapper">
                  <input
                    type={signUpState.passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={signUpState.password}
                    onChange={handleSignUpInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="passwordVisibilityToggleBtn"
                    onClick={toggleSignUpPasswordVisibility}
                    aria-label={
                      signUpState.passwordVisible
                        ? "Hide password"
                        : "Show password"
                    }>
                    {signUpState.passwordVisible ? (
                      <IoEyeOffSharp className="signUpIcon" />
                    ) : (
                      <FaEye className="signUpIcon" />
                    )}
                  </button>
                </div>
              </div>
              <button
                className="signUpBtn"
                onClick={handleSignUp}
                disabled={loading}>
                Sign up
              </button>

              <button
                type="button"
                className="loginPage"
                onClick={() => {
                  setAnimation((prev) => !prev);
                }}>
                Already have an account? <span>Login</span>
              </button>

              <div className="horizontalLine"></div>

              <button
                type="button"
                className="signupWithGoogle"
                onClick={handleSignUpWithGoogle}>
                <span>
                  <FcGoogle size={25} />
                  Sign up with Google
                </span>
              </button>
            </div>
          </div>

          {/* ____________________LOGIN_________ */}

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
              <p>Log into your account</p>
              <form className="form">
                <div className="i-wrapper">
                  <input
                    type="email"
                    placeholder="Email"
                    name="username" // Consider renaming to 'email' for clarity
                    value={loginState.username}
                    onChange={handleLoginInputChange}
                    required
                  />
                </div>
                <div className="i-wrapper">
                  <input
                    type={loginState.passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={loginState.password}
                    onChange={handleLoginInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="passwordVisibilityToggleBtn"
                    onClick={toggleLoginPasswordVisibility}
                    aria-label={
                      loginState.passwordVisible
                        ? "Hide password"
                        : "Show password"
                    }>
                    {loginState.passwordVisible ? (
                      <IoEyeOffSharp className="loginIcon" />
                    ) : (
                      <FaEye className="loginIcon" />
                    )}
                  </button>
                </div>
              </form>
              <button
                className="loginBtn"
                onClick={handleLogin}
                disabled={loading}>
                Login
              </button>

              <button
                type="button"
                className="signUpBtn"
                onClick={() => {
                  setAnimation((prev) => !prev);
                }}>
                Don't have an account yet? <span>Sign Up</span>
              </button>

              <div className="horizontalLine"></div>

              <button
                type="button"
                className="loginWithGoogle"
                onClick={handleSignInWithGoogle}>
                <span>
                  <FcGoogle size={25} />
                  Login with Google
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

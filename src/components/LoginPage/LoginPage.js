import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./LoginPage.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const imageType = [
  "male",
  "female",
  "human",
  "identicon",
  "initials",
  "bottts",
  "avataaars",
  "jdenticon",
  "gridy",
  "micah",
];
const LoginPage = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const mountCount = useRef(0);
  const [user, setUser] = useState({
    userName: "",
    userImage: null,
  });
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    mountCount.current++;
  });
  useEffect(() => {
    const landingImageType = ["micah", "avataaars", "gridy"];
    const randomImageType =
      landingImageType[Math.floor(Math.random() * landingImageType.length)];
    const userImage = `https://avatars.dicebear.com/api/${randomImageType}/A${Math.floor(
      Math.random() * 20
    )}.svg`;
    setUser((user) => {
      return { ...user, userImage };
    });
  }, [setUser]);

  useEffect(() => {
    if (mountCount.current === 1) return;
    const timerid = setTimeout(() => {
      setUser((user) => {
        return { ...user, userImage: imageUrl };
      });
    }, 500);

    return () => clearTimeout(timerid);
  }, [imageUrl]);

  function userNameConfigure(e) {
    const randomImageType =
      imageType[Math.floor(Math.random() * imageType.length)];
    setImageUrl(
      `https://avatars.dicebear.com/api/${randomImageType}/${e.target.value}.svg`
    );
    setUser({ ...user, userName: e.target.value });
  }

  function userLogin(e) {
    e.preventDefault();
    if (user.userName === "") {
      document.getElementsByClassName("userNameInput")[0].focus();
      return;
    }

    const userId = uuidv4();
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", user.userName);

    setCurrentUser({
      ...currentUser,
      userName: user.userName,
      userImage: user.userImage,
      accountCretedOn: new Date().getTime(),
      lastSignedIn: new Date().getTime(),
      userId,
    });
    navigate("/chat");
  }

  return (
    <div className="loginForm">
      <header>
        <h1>Chat App</h1>
      </header>
      <div className="userImage">
        {user.userImage ? (
          <UserAvatar imgSrc={`${user.userImage}`} size="300px" />
        ) : (
          <div className="imgDummy" style={{ height: "300px" }}></div>
        )}
      </div>
      <div className="userName">
        <form onSubmit={(e) => userLogin(e)} autoComplete="off">
          <input
            className="userNameInput"
            placeholder="Enter username"
            type="text"
            name="name"
            value={user.userName}
            onChange={(e) => userNameConfigure(e)}
            autoComplete="off"
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

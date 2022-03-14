import React from "react";
import "./UserAvatar.css";

const UserAvatar = ({ imgSrc, size }) => {
  return (
    <div className="userAvatar" style={{ height: size, width: size }}>
      <img src={`${imgSrc}`} alt="userImage" />
    </div>
  );
};

export default UserAvatar;

import React from "react";
import "./Guest.css";
import security from "../../assets/Security.svg";
import { Link } from "react-router-dom";

const Guest = () => {
  return (
    <div className="GuestContainer">
      <img src={security} alt="security" />
      <Link to="/">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Guest;

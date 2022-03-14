import React from "react";
import Guest from "./components/Guest/Guest";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser.userName ? children : <Guest />;
};

export default PrivateRoute;

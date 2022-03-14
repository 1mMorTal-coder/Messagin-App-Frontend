import React, { useState, useContext } from "react";

const AuthContext = React.createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  // user schema
  const [currentUser, setCurrentUser] = useState({
    userId: null,
    userName: "",
    userImage: null,
    accountCretedOn: null,
    lastSignedIn: null,
  });

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };

import React, { useContext } from "react";
import io from "socket.io-client";

const socket = io.connect("https://messaging-chill-hub-backend.herokuapp.com");

const SocketContext = React.createContext();

function useSocket() {
  return useContext(SocketContext);
}

function SocketProvider({ children }) {
  const value = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export { useSocket, SocketProvider };

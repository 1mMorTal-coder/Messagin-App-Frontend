import React, { useContext } from "react";
import io from "socket.io-client";

const socket = io.connect("http://192.168.29.250:8080");

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

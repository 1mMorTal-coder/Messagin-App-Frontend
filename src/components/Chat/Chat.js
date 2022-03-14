import React from "react";
import ChatMembers from "../ChatMembers/ChatMembers";
import DisplayChat from "../DisplayChat/DisplayChat";
import "./Chat.css";
import io from "socket.io-client";

const socket = io.connect("http://192.168.29.250:8080");

function Chat() {
  return (
    <>
      <div className="chatApp">
        <header>
          <h1>Chat App</h1>
        </header>
        <div className="chatSection">
          <DisplayChat socket={socket} />
          <ChatMembers socket={socket} />
        </div>
      </div>
    </>
  );
}

export default Chat;

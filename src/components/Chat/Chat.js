import React from "react";
import ChatMembers from "../ChatMembers/ChatMembers";
import DisplayChat from "../DisplayChat/DisplayChat";
import "./Chat.css";

function Chat() {
  return (
    <>
      <div className="chatApp">
        <header>
          <h1>Chat App</h1>
        </header>
        <div className="chatSection">
          <DisplayChat />
          <ChatMembers />
        </div>
      </div>
    </>
  );
}

export default Chat;

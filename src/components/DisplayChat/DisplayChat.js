import React, { useState } from "react";
import "emoji-picker-element";
import "./DisplayChat.css";
import ChatInput from "../ChatInput/ChatInput";
import ChatScreen from "../ChatScreen/ChatScreen";

const DisplayChat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState(false);

  return (
    <div className="displayChat">
      <div className="roomName">
        <h3>Group Chat</h3>
      </div>
      <ChatScreen
        message={message}
        sendMessage={sendMessage}
        setMessage={setMessage}
        setSendMessage={setSendMessage}
        socket={socket}
      />
      <ChatInput
        socket={socket}
        message={message}
        setMessage={setMessage}
        setSendMessage={setSendMessage}
      />
    </div>
  );
};

export default DisplayChat;

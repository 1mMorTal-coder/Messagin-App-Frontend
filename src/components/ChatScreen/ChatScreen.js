import React, { useEffect, useState } from "react";
import TextMessage from "../TextMessage/TextMessage";
import { useAuth } from "../../context/AuthContext";
import "./ChatScreen.css";
import TypingStatus from "../TypingStatus/TypingStatus";

const ChatScreen = ({
  message,
  sendMessage,
  setMessage,
  setSendMessage,
  socket,
}) => {
  const { currentUser } = useAuth();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    console.log("CurrentUser: ", currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (sendMessage) {
      const msgData = {
        message: message.trim(),
        userName: currentUser.userName,
        timestamp: new Date().getTime(),
        userImage: currentUser.userImage,
        userId: currentUser.userId,
        showUserInfo: true,
      };
      socket.emit("sendMessage", { messageData: msgData });
      setMessageList((messageList) => [...messageList, msgData]);
      setMessage("");
      setSendMessage(false);
    }
  }, [message, currentUser, sendMessage, setMessage, setSendMessage, socket]);

  useEffect(() => {
    const viewChat = document.getElementsByClassName("viewChat")[0];
    viewChat.scrollTop = viewChat.scrollHeight;
  }, [messageList]);

  //socket Logic
  useEffect(() => {
    socket.on("newMemberJoined", (newMemberInfo) => {
      console.log("new member");
      setMessageList((messageList) => {
        return [
          ...messageList,
          { type: "information", userInfo: newMemberInfo },
        ];
      });
    });
    socket.on("previousChat", (previousChat) => {
      setMessageList((messageList) => {
        return [...messageList, ...previousChat];
      });
    });

    function msgSync(messageData) {
      setMessageList([...messageData]);
    }
    socket.on("checkMessageSync", msgSync);

    function updateServerMessage(payload) {
      setMessageList((messageList) => {
        return [...messageList, payload.messageData];
      });
    }
    socket.on("sendMessage", updateServerMessage);

    return () => {
      socket.off("newMemberJoined");
      socket.off("previousChat");
      socket.off("checkMessageSync", msgSync);
      socket.off("sendMessage", updateServerMessage);
    };
  }, [socket]);

  return (
    <>
      <div className="viewChat">
        {messageList.map((element, id) => {
          return (
            <TextMessage
              message={element}
              messageList={messageList}
              messageId={id}
              key={id}
            />
          );
        })}
      </div>
      <TypingStatus socket={socket} />
    </>
  );
};

export default ChatScreen;

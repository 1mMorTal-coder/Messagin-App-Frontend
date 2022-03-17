import React, { useEffect, useState } from "react";
import TextMessage from "../TextMessage/TextMessage";
import { useAuth } from "../../context/AuthContext";
import "./ChatScreen.css";
import TypingStatus from "../TypingStatus/TypingStatus";
import { useSocket } from "../../context/SocketContext";

const ChatScreen = ({ message, sendMessage, setMessage, setSendMessage }) => {
  const { currentUser } = useAuth();
  const { socket } = useSocket();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    console.log("Socket: ", socket);
  }, [socket]);

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
      setMessageList((messageList) => {
        const messageListClone = messageList;
        let previousTextMessage = null;
        for (let i = messageList.length - 1; i >= 0; i--) {
          if (msgData.userId !== messageListClone[i].userId) break;
          if (messageList[i].message) {
            previousTextMessage = messageListClone[i];
            break;
          }
        }
        if (previousTextMessage) {
          const currentMessageTime = msgData.timestamp;
          const previousMessageTime = previousTextMessage.timestamp;
          if ((currentMessageTime - previousMessageTime) / (1000 * 60) < 2)
            previousTextMessage.showUserInfo = false;
        }
        return [...messageListClone, msgData];
      });
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
      <TypingStatus />
    </>
  );
};

export default ChatScreen;

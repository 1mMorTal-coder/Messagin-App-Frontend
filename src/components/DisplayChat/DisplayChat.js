import React, { useState } from 'react';
import 'emoji-picker-element';
import './DisplayChat.css';
import ChatInput from '../ChatInput/ChatInput';
import ChatScreen from '../ChatScreen/ChatScreen';

const DisplayChat = () => {
  const [message, setMessage] = useState('');
  const [sendMessage, setSendMessage] = useState(false);

  const boxSize = getComputedStyle(
    document.getElementsByTagName('html')[0]
  ).getPropertyValue('--memberBoxSize');

  function chatMemberDisplay() {
    const chatMemberBox = document.getElementsByClassName('chatMembers')[0];
    chatMemberBox.style.transform = 'translateX(0)';
    chatMemberBox.style.opacity = 1;
    const chatMemberList = Array.from(
      document.getElementsByClassName('memberList')[0].childNodes
    );
    // style="transition: transform 600ms ease-in-out 150ms; transform: translateY(340px) translateX(-105%);"
    chatMemberList.forEach((element) => {
      const boxNo = element.classList[1];
      element.style.transition = 'none';
      element.style.transform = `translateY(${
        boxNo * boxSize
      }px) translateX(0)`;
    });

    setTimeout(() => {
      chatMemberList.forEach((element) => {
        const boxNo = element.classList[1];
        element.style.transition = `transform 600ms ease-in-out ${
          boxNo * 20
        }ms`;
        element.style.transform = `translateY(${
          boxNo * boxSize
        }px) translateX(-105%)`;
      });
    }, 300);
  }

  return (
    <div className="displayChat">
      <div className="roomName">
        <h3>Group Chat</h3>
        <div className="memeberListIcon" onClick={chatMemberDisplay}>
          <i className="fa-solid fa-chevron-left"></i>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </div>
      <ChatScreen
        message={message}
        sendMessage={sendMessage}
        setMessage={setMessage}
        setSendMessage={setSendMessage}
      />
      <ChatInput
        message={message}
        setMessage={setMessage}
        setSendMessage={setSendMessage}
      />
    </div>
  );
};

export default DisplayChat;

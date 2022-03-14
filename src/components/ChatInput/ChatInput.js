import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./ChatInput.css";

const ChatInput = ({ message, setMessage, setSendMessage, socket }) => {
  const { currentUser } = useAuth();
  const [userMessage, setUserMessage] = useState("");
  const emojiPicker = useRef();
  const emojiIcon = useRef();
  const messageDiv = useRef();
  const mountCount = useRef(0);

  useEffect(() => {
    mountCount.current++;
  });

  useEffect(() => {
    document
      .getElementsByTagName("body")[0]
      .addEventListener("click", emojiHide);

    function emojiHide(e) {
      if (e.target === emojiIcon.current) return;
      if (!(e.target === emojiPicker.current)) {
        emojiPicker.current.classList.add("emojiHide");
        emojiPicker.current.style.display = "none";
      }
    }
    function emojiPick(e) {
      setUserMessage((userMessage) => userMessage + e.detail.unicode);
      messageDiv.current.innerText += e.detail.unicode;
      messageDiv.current.focus();

      //? Set cursor at end of text for content editable div , text area and input field

      window.getSelection().selectAllChildren(messageDiv.current);
      window.getSelection().collapseToEnd();
    }
    const emojiPickerVariable = emojiPicker.current;
    emojiPicker.current.classList.add("emojiHide");
    emojiPicker.current.addEventListener("emoji-click", emojiPick);
    return () => {
      emojiPickerVariable.removeEventListener("emoji-click", emojiPick);
      document
        .getElementsByTagName("body")[0]
        .removeEventListener("click", emojiHide);
    };
  }, [setUserMessage]);

  useEffect(() => {
    function messageInputset(e) {
      if (!window.matchMedia("(max-width: 800px)").matches) {
        if (
          e.inputType === "insertParagraph" ||
          (e.inputType === "insertText" && e.data === null)
        )
          document.getElementsByClassName("fa-paper-plane")[0].click();
      }
      setUserMessage(messageDiv.current.innerText);
    }
    const chatDiv = document.getElementsByClassName("chatToSend")[0];
    chatDiv.style.width = `${chatDiv.offsetWidth}px`;
    messageDiv.current.addEventListener("input", messageInputset);

    const msgdiv = messageDiv.current;
    return () => msgdiv.removeEventListener("input", messageInputset);
  }, [setUserMessage, socket, currentUser]);

  useEffect(() => {
    if (messageDiv.current.textContent.length)
      document.getElementsByClassName("inputTitle")[0].style.display = "none";
    else
      document.getElementsByClassName("inputTitle")[0].style.display = "block";
  }, [userMessage, message]);

  useEffect(() => {
    function setInputWidth() {
      const currentChatWidth =
        document.getElementsByClassName("chatInput")[0].offsetWidth;
      const chatDiv = document.getElementsByClassName("chatToSend")[0];
      chatDiv.style.width = `${currentChatWidth - 25 - 48 - 20}px`;
    }
    window.addEventListener("resize", setInputWidth);
    return () => window.removeEventListener("resize", setInputWidth);
  }, []);

  function sendMessage() {
    messageDiv.current.focus();
    if (!messageDiv.current.innerText.trim().length) return;
    setUserMessage(messageDiv.current.innerText.trim());
    setMessage(messageDiv.current.innerText.trim());
    setSendMessage(true);
    messageDiv.current.innerText = "";
  }

  useEffect(() => {
    let typingSignalId;
    if (mountCount.current >= 2) {
      typingSignalId = setTimeout(() => {
        socket.emit("typing", currentUser);
      }, 100);
    }

    return () => clearInterval(typingSignalId);
  }, [userMessage, currentUser, socket]);

  useEffect(() => {
    if (mountCount.current < 2) return;
    const typingContent = document.getElementsByClassName("typingContent")[0];
    if (typingContent.classList.contains("typing")) return;
    typingContent.classList.add("typing");
    setTimeout(() => {
      typingContent.classList.remove("typing");
    }, 2000);
  }, [userMessage]);

  return (
    <div className="chatInput">
      <div className="emoji">
        <i
          ref={emojiIcon}
          className="fa-solid fa-face-grin-beam"
          onClick={() => {
            emojiPicker.current.classList.toggle("emojiHide");
            if (emojiPicker.current.classList.contains("emojiHide"))
              emojiPicker.current.style.display = "none";
            else emojiPicker.current.style.display = "block";
          }}></i>
        <emoji-picker ref={emojiPicker} className="emojiHide"></emoji-picker>
      </div>
      <div className="chatToSend">
        <div className="inputTitle" onClick={() => messageDiv.current.focus()}>
          Type a message
        </div>
        <div
          ref={messageDiv}
          className="inputMessage"
          contentEditable="true"
          title="Type a message"
          onPaste={(e) => {
            // console.log("Pasted", e);
          }}></div>
      </div>
      <div className="sendBtn">
        <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
      </div>
    </div>
  );
};

export default ChatInput;

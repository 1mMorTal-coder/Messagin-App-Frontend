import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./TypingStatus.css";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";

const TypingStatus = () => {
  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const [typerInfo, setTyperInfo] = useState(currentUser);
  const typingStatus = useRef();

  useEffect(() => {
    function typing() {
      if (typingStatus.current.classList.contains("typing")) return;

      const memberBox = document.getElementsByClassName("memberList")[0];
      memberBox.scroll(0, 0);

      typingStatus.current.classList.add("typing");
      setTimeout(() => {
        typingStatus.current.classList.remove("typing");
      }, 3000);
    }
    socket.on("typing", typing);
    return () => socket.off("typing", typing);
  }, [socket]);

  const boxSize = getComputedStyle(
    document.getElementsByTagName("html")[0]
  ).getPropertyValue("--memberBoxSize");

  useEffect(() => {
    function memberAnimation(typingUserInfo) {
      setTyperInfo(typingUserInfo);
      const memberList = Array.from(
        document.getElementsByClassName("memberList")[0].childNodes
      );
      for (let i = 0; i < memberList.length; i++) {
        const memberBox = memberList[i];
        if (memberBox.dataset.memberId === typingUserInfo.userId.slice(-12)) {
          const placementNo = Number(Array.from(memberBox.classList)[1]);
          if (placementNo === 0) return;
          memberList.forEach((element) => {
            const placementNoBox = Number(Array.from(element.classList)[1]);
            if (placementNoBox >= placementNo) return;
            element.style.transition = "transform 600ms ease-in-out 0ms";
            element.classList.remove(placementNoBox);
            element.classList.add(placementNoBox + 1);
            element.style.transform = `translateY(${
              (placementNoBox + 1) * Number(boxSize)
            }px) translateX(-105%)`;
          });
          memberBox.classList.remove(placementNo);
          memberBox.classList.add(0);
          memberBox.style.transform = "translateY(0) translateX(-105%)";
          memberBox.style.zIndex = 10;
          setTimeout(() => {
            memberBox.style.zIndex = 0;
          }, 600);
          break;
        }
      }
    }

    socket.on("animateMemberList", memberAnimation);
    return () => {
      socket.off("animateMemberList", memberAnimation);
    };
  }, [socket, boxSize]);

  return (
    <div className="typingStatus">
      <div ref={typingStatus} className="typingContent">
        <UserAvatar imgSrc={typerInfo.userImage} size="22px" />
        <i className="fa-solid fa-pencil"></i>
        <p className="typerName">
          <span>
            {typerInfo.userName.length >= 15
              ? typerInfo.userName.slice(0, 15) + "..."
              : typerInfo.userName}
          </span>{" "}
          is typing...
        </p>
      </div>
    </div>
  );
};

export default TypingStatus;

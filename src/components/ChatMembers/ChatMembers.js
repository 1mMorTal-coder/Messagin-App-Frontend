import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MemberTab from "../MemberTab/MemberTab";
import "./ChatMembers.css";

const ChatMembers = ({ socket }) => {
  const mountCount = useRef(0);
  const { currentUser } = useAuth();
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    mountCount.current++;
  });

  useEffect(() => {
    socket.emit("userInfo", { currentUser });
    socket.emit("newMemberJoined", currentUser);
    socket.on("memberList", (memberInfo) => {
      setMemberList([...memberInfo]);
    });
    return () => socket.off("memberList");
  }, [socket, currentUser]);

  const boxSize = getComputedStyle(
    document.getElementsByTagName("html")[0]
  ).getPropertyValue("--memberBoxSize");

  useEffect(() => {
    // let lastDesign;
    // let transitionendElement;
    const memberBox = document.getElementsByClassName("memberList")[0];
    memberBox.scroll(0, 0);

    const memberList = Array.from(
      document.getElementsByClassName("memberList")[0].childNodes
    );

    if (mountCount.current === 2) {
      memberList.forEach((element, id) => {
        element.classList.add(id);
      });
    } else if (mountCount.current > 2) {
      for (let i = 0; i < memberList.length; i++) {
        if (i === memberList.length - 1) {
          const value = Array.from(memberList[i].classList)[1];
          memberList[i].classList.remove(value);
          const newValue = 0;
          memberList[i].classList.add(newValue);

          break;
        }
        const value = Array.from(memberList[i].classList)[1];
        memberList[i].classList.remove(value);
        const newValue = Number(value) + 1;
        memberList[i].classList.add(newValue);
      }
    }

    memberList.forEach((element, id) => {
      const times = Number(Array.from(element.classList)[1]);
      if (mountCount.current === 2) {
        element.style.transition = "none";
        element.style.transform = `translateY(${times * Number(boxSize)}px)`;
        setTimeout(() => {
          element.style.transition = "transform 600ms ease-in-out";
          element.style.transitionDelay = `${id * 30}ms`;
          element.style.transform = `translateY(${
            times * Number(boxSize)
          }px) translateX(-105%)`;
        }, 0);
      } else {
        element.style.transition = "transform 600ms ease-in-out";
        if (id === memberList.length - 1)
          element.style.transition = "transform  1000ms ease-in-out";
        setTimeout(() => {
          element.style.transform = `translateY(${
            times * Number(boxSize)
          }px) translateX(-105%)`;
        }, 0);
      }
    });
  }, [memberList, boxSize]);

  function hideChatMembers() {
    const chatMemberBox = document.getElementsByClassName("chatMembers")[0];
    chatMemberBox.style.transform = "translateX(100%)";
    chatMemberBox.style.opacity = 0;
  }

  return (
    <div className="chatMembers">
      <div className="membersHeader">
        <h4>Chat Members</h4>
        <div className="memeberListIconView" onClick={hideChatMembers}>
          <i className="fa-solid fa-chevron-left"></i>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </div>
      <div className="memberList">
        {memberList.map((element, id) => (
          <MemberTab memberInfo={element} key={id} socket={socket} />
        ))}
      </div>
    </div>
  );
};

export default ChatMembers;

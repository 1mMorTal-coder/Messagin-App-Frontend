import React, { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./MemberTab.css";

const MemberTab = ({ memberInfo, socket }) => {
  const [typingStatus, setTypingstatus] = useState(false);

  useEffect(() => {
    if (typingStatus) return;
    function typingCheck(typingUserInfo) {
      if (typingStatus) return;
      if (typingUserInfo.userId === memberInfo.userId) {
        setTypingstatus(true);
        setTimeout(() => {
          setTypingstatus(false);
        }, 3000);
      }
    }
    socket.on("animateMemberList", typingCheck);
    return () => socket.off("animateMemberList", typingCheck);
  }, [socket, typingStatus, setTypingstatus, memberInfo]);

  return (
    <div className={`memberBox`} data-member-id={memberInfo.userId.slice(-12)}>
      <div className="memberInfo">
        <UserAvatar imgSrc={memberInfo.userImage} size="40px" />
        <div className="userName">
          {memberInfo.userName.length >= 15
            ? memberInfo.userName.slice(0, 15) + "..."
            : memberInfo.userName}
        </div>
        {typingStatus ? <p className="typingMemberInfo">typing...</p> : <></>}
        <div className="statusCircle"></div>
      </div>
    </div>
  );
};

export default MemberTab;

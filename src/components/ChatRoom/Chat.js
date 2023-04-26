import React, { useContext } from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { ChatContext } from "~/context/ChatContext";

const Chat = ({isShowBoxChat, setIsShowBoxChat}) => {
  const { data } = useContext(ChatContext);
  const handelClose = () =>{
    setIsShowBoxChat(false);
  }
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          {/* <img src={"httiosss"} alt="cam" />
          <img src={"httiosss"} alt="add" />
          <img src={"httiosss"} alt="more" /> */}
          <button className="btn-close" onClick={handelClose}><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
      <Messages />
      <ChatInput/>
    </div>
  );
};

export default Chat;
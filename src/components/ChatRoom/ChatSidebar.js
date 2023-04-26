import React from "react";
import Chats from "./Chats"
import ChatNavbar from "./ChatNavbar";
import ChatSearch from "./ChatSearch";

const ChatSidebar = () => {
  return (
    <div className="sidebar">
      <ChatNavbar />
      <ChatSearch/>
      <Chats/>
    </div>
  );
};

export default ChatSidebar;

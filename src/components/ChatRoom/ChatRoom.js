import { useState } from 'react';
import Chat from './Chat';
import './ChatRoom.scss';
import ChatSidebar from './ChatSidebar';
function ChatRoom({isShowBoxChat, setIsShowBoxChat}) {
    return (
        <div className="chat-room">
            {isShowBoxChat && (
                <div className="chat-room-container">
                    <ChatSidebar />
                    <Chat isShowBoxChat={isShowBoxChat} setIsShowBoxChat={setIsShowBoxChat} />
                </div>
            )}
        </div>
    );
}

export default ChatRoom;

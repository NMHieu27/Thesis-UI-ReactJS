import { useState } from 'react';
import Chat from './Chat';
import './ChatRoom.scss';
import ChatSidebar from './ChatSidebar';
function ChatRoom() {
    const [isShowBoxChat, setIsShowBoxChat] = useState(false);
    const handleClick = () => {
        setIsShowBoxChat(!isShowBoxChat);
    };
    return (
        <div className="chat-room">
            {isShowBoxChat && (
                <div className="chat-room-container">
                    <ChatSidebar />
                    <Chat isShowBoxChat={isShowBoxChat} setIsShowBoxChat={setIsShowBoxChat} />
                </div>
            )}
            <button className="btn-massage-2" onClick={handleClick}>
                <i className="fa-regular fa-message"></i>
            </button>
        </div>
    );
}

export default ChatRoom;

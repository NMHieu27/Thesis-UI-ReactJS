import React, { useContext, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    const handleScroll = (event) => {
        event.stopPropagation();
    };
    useEffect(() => {
        // ref.current?.scrollIntoView({ behavior: "smooth" });
        const container = document.querySelector('.messages');
        container.scrollTop = container.scrollHeight;
    }, [message]);

    return (
        <div ref={ref} onScroll={handleScroll} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                {/* <span>{console.log(message.date)}</span> */}
                {/* <span><Moment fromNow>{message.date.toDate()}</Moment></span> */}
            </div>
            <div className="messageContent">
                {message.text !== '' && <p>{message.text}</p>}
                {message.img && <img src={message.img} alt="" />}
                <span><Moment fromNow>{message.date.toDate()}</Moment></span>
            </div>
        </div>
    );
};

export default Message;
import React, { useContext, useEffect, useRef } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Moment from 'react-moment';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
        // const container = document.querySelector('.messages');
        // container.scrollTop = container.scrollHeight;
    }, [message]);

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                {/* <span>{console.log(message.date)}</span> */}
                {/* <span><Moment fromNow>{message.date.toDate()}</Moment></span> */}
            </div>
            <OverlayTrigger
                placement="bottom"
                overlay={
                    <Tooltip id="tooltip-bottom">
                        <span>
                            {/* <Moment fromNow>{message.date.toDate()}</Moment> */}
                            <Moment format="HH : mm">{message.date.toDate()}</Moment>
                        </span>
                    </Tooltip>
                }
            >
                <div className="messageContent">
                    {message.text !== '' && <p>{message.text}</p>}
                    {message.img && <img src={message.img} alt="" />}
                </div>
            </OverlayTrigger>
        </div>
    );
};

export default Message;

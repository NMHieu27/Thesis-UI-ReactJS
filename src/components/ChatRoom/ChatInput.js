import React, { useContext, useRef, useState } from 'react';
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";

import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '~/context/AuthContext';
import { ChatContext } from '~/context/ChatContext';
import { db, storage } from '~/firebase';
import images from '~/assets/images';

const ChatInput = () => {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleRemoveImg = () => {
        setImg(null);
        const imgBox = document.querySelector('.img-send-container');
        imgBox.innerHTML = '';
    };
    // const fileRef = useRef();
    const handleChangeImg = (e) => {
        const imgBox = document.querySelector('.img-send-container');
        imgBox.innerHTML = '';

        const imgConatainer = document.createElement('div');
        imgConatainer.classList.add('img-wrapper');


        const btnRemoveImg = document.createElement('button');
        btnRemoveImg.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        btnRemoveImg.classList.add('btn-remove-img');
        btnRemoveImg.onclick = () => {
            handleRemoveImg();
        };

        imgConatainer.innerHTML = `<div class="img-container"><img src=${URL?.createObjectURL(
            e?.target?.files[0],
        )} alt="err"/></div>`;
        imgConatainer.appendChild(btnRemoveImg);
        imgBox.appendChild(imgConatainer);
        setImg(e.target.files[0]);
    };

    const handleSend = async () => {
        const textMessage = text;
        const imgMessage = img;
        setText('');
        handleRemoveImg();
        if (imgMessage || textMessage !== '') {
            if (imgMessage) {
                const storageRef = ref(storage, uuid());

                const uploadTask = uploadBytesResumable(storageRef, imgMessage);
                uploadTask.on(
                    (error) => {
                        //TODO:Handle Error
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, 'chats', data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text: textMessage,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        });
                    },
                );
            } else {
                await updateDoc(doc(db, 'chats', data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text: textMessage,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    }),
                });
            }

            await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [data.chatId + '.lastMessage']: {
                    text: textMessage,
                },
                [data.chatId + '.date']: serverTimestamp(),
            });

            await updateDoc(doc(db, 'userChats', data.user.uid), {
                [data.chatId + '.lastMessage']: {
                    text: textMessage,
                },
                [data.chatId + '.date']: serverTimestamp(),
            });
        }
    };
    const handleKey = (e) =>{
        e.code === "Enter" && handleSend();
    }
    return (
        <div className="input">
            <div className="img-send-container"></div>
            <input type="text" placeholder="Type something..." onChange={(e) => setText(e.target.value)} value={text} onKeyDown={handleKey}/>
            <div className="send">
                {/* <img src={'Attach'} alt="attach" /> */}
                <input type="file" style={{ display: 'none' }} id="file" onChange={handleChangeImg} />
                <label htmlFor="file">
                    <img src={images.addImg} alt="img" />
                </label>
                <button onClick={handleSend}>
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatInput;

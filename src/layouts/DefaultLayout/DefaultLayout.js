import { Outlet } from 'react-router-dom';
import Header from '../components-layout/Header/Header';
import Footer from '../components-layout/Footer/Footer';
import './DefaultLayout.scss';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ChatRoom from '~/components/ChatRoom/ChatRoom';
import { useSelector } from 'react-redux';
function DefaultLayout() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [isShowBoxChat, setIsShowBoxChat] = useState(false);
    useEffect(() => {
        const items = document.querySelectorAll('.item-parallax');
        document.addEventListener('scroll', (event) => {
            items.forEach((item) => {
                if (item.offsetTop - window.scrollY < 350) {
                    item.classList.add('active-parallax');
                }
            });
        });
        const btnChat = document.querySelector('.btn-chat');
        btnChat?.classList?.toggle('btn-chat-active', isShowBoxChat);
    }, [isShowBoxChat]);
    return (
        <div className="default-layout-wrapper">
            {isAuthenticated && (
                <div className="btn-chat-container ps-absolute">
                    <button className="btn-chat" onClick={() => setIsShowBoxChat(!isShowBoxChat)}>
                        <i className="fa-regular fa-message"></i>
                    </button>
                </div>
            )}

            {isShowBoxChat && (
                <div className="chat-room-wrapper ps-absolute">
                    <ChatRoom isShowBoxChat={isShowBoxChat} setIsShowBoxChat={setIsShowBoxChat} />
                </div>
            )}
            <div className="header-wrapper">
                <Header />
            </div>
            <div className="body-wrapper">
                <Container>
                    <div className="body-wrapper-content">
                        <Outlet />
                    </div>
                </Container>
            </div>
            <div className="footer-wrapper">
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;

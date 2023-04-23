import { Outlet } from 'react-router-dom';
import Header from '../components-layout/Header/Header';
import Footer from '../components-layout/Footer/Footer';
import './DefaultLayout.scss';
import { Container } from 'react-bootstrap';
function DefaultLayout() {
    return (
        <div className="default-layout-wrapper">
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

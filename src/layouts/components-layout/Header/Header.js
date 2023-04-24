import { Button, Container, Dropdown, Modal, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import MyNavLink from 'src/components/MyNavLink/MyNavLink';
import { logout } from 'src/redux/actions/authActions';
import config from 'src/config/index';
import images from 'src/assets/images';
import LanguageToggleButton from 'src/components/LanguageToggleButton/LanguageToggleButton';

function Header({isAuthenticated, user, dispatch}) {
    const { t } = useTranslation();
    const handleSignOut = () =>{
        dispatch(logout());
    }
    return (
        <>
            <Navbar bg="light" expand="sm" className="fixed-top">
                <Container>
                    <Link to={config.routes.home}>
                        <Navbar.Brand>
                            <div className="web-logo">
                                <img src={images.logo} alt="err" />
                            </div>
                            <div className="company-name">Thesis OU</div>
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
                    <Navbar.Offcanvas
                        className="row-offcanvas-left"
                        id="offcanvasNavbar-expand-sm"
                        aria-labelledby="offcanvasNavbarLabel-expand-sm"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">Thesis OU</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <MyNavLink link={config.routes.home}>{t('nav-home')}</MyNavLink>
                                <MyNavLink link={'/about'}>{t('nav-about')}</MyNavLink>
                                <MyNavLink link={'#1'}>{t('nav-services')}</MyNavLink>
                                <MyNavLink link={'#2'}>{t('nav-team')}</MyNavLink>
                                <MyNavLink link={'#3'}>{t('nav-contact')}</MyNavLink>
                                {!isAuthenticated && <MyNavLink link={config.routes.singin}>{t('nav-sign-in')}</MyNavLink>}
                                <LanguageToggleButton />
                                {/* Message Box */}
                                {/* <div className="massage-box">
                                    <button className="btn-massage">
                                        <i className="fa-regular fa-message"></i>
                                    </button>
                                </div> */}
                                {isAuthenticated && <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className="nav-avatar">
                                        <img
                                            src={user.image}
                                            width="40"
                                            height="40"
                                            className="rounded-circle"
                                            alt="err"
                                        />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Hi, {user['first_name']}</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Sửa thông tin</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Đổi mật khẩu</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleSignOut}>{t('nav-sign-out')}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  });
export default connect(mapStateToProps)(Header);

import { Button, Container, Dropdown, Modal, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import MyNavLink from '~/components/MyNavLink/MyNavLink';
import config from '~/config';
import { logout } from '~/redux/actions/authActions';
import images from '~/assets/images';
import LanguageToggleButton from '~/components/LanguageToggleButton/LanguageToggleButton';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';
import { toast } from 'react-toastify';
function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { t } = useTranslation();
    const handleSignOut = () => {
        dispatch(logout());
        try{
            signOut(auth);
        }
        catch{
            toast.error("loi firebase");
        }
        nav(config.routes.singin);
    };
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
                                <MyNavLink link={config.routes.councils}>{t('nav-councils')}</MyNavLink>
                                <MyNavLink link={config.routes.users}>{t('nav-accounts')}</MyNavLink>
                                <MyNavLink link={config.routes.theses}>{t('nav-theses')}</MyNavLink>
                                <MyNavLink link={'#3'}>{t('nav-contact')}</MyNavLink>
                                <MyNavLink link={config.routes.register}>{t('nav-sign-up')}</MyNavLink>
                                {!isAuthenticated && (
                                    <MyNavLink link={config.routes.singin}>{t('nav-sign-in')}</MyNavLink>
                                )}
                                <LanguageToggleButton />
                                {isAuthenticated && (
                                    <Dropdown>
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
                                    </Dropdown>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}
export default Header;

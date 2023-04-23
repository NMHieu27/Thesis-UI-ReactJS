import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import './Header.scss';
import config from '~/config';
import MyNavLink from '~/components/MyNavLink/MyNavLink';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
function Header() {
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
                        id="offcanvasNavbar-expand-sm"
                        aria-labelledby="offcanvasNavbarLabel-expand-sm"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">Thesis OU</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <MyNavLink link={config.routes.home}>Home</MyNavLink>
                                <MyNavLink link={'/about'}>About</MyNavLink>
                                <MyNavLink link={'#1'}>Services</MyNavLink>
                                <MyNavLink link={'#2'}>Team</MyNavLink>
                                <MyNavLink link={'#3'}>Contact</MyNavLink>
                                <MyNavLink link={config.routes.singin}>Sign In</MyNavLink>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;

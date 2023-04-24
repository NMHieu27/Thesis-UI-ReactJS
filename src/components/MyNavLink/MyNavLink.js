import { Link } from 'react-router-dom';
import './MyNavLink.scss'
function MyNavLink({ link, children }) {
    return (
        <Link className={window.location.pathname === link ? 'nav-link active-link' : 'nav-link'} to={link}>
            {children}
        </Link>
    );
}
export default MyNavLink;

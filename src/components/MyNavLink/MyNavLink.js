import { Link } from 'react-router-dom';
import './MyNavLink.scss'
import { useState } from 'react';
function MyNavLink({ link, children }) {
    const [isActive, setIsActive] = useState(false);
    const handleChangeActive = ()=>{
        setIsActive(!isActive);
    }
    return (
        <Link className={window.location.pathname === link ? 'nav-link active-link' : 'nav-link'} to={link} onClick={handleChangeActive}>
            {children}
        </Link>
    );
}
export default MyNavLink;

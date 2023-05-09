import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import config from '~/config';

const RequireAuth = ({ allowedRoles }) => {
    const role = useSelector(state => state.auth.user.role.name);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();
    return allowedRoles?.includes(role) ? (
        <Outlet />
    ) : isAuthenticated ? (
        <Navigate to={config.routes.unauthorized} state={{ from: location }} replace />
    ) : (
        <Navigate to={config.routes.signin} state={{ from: location }} replace />
    );
};

export default RequireAuth;

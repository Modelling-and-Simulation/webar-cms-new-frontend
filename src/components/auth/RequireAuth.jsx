import PropTypes from 'prop-types';
import { Outlet, Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    let content;
    if (allowedRoles?.includes(auth?.roleName)) {
        content = <Outlet />;
    } else if (auth?.accessToken) {
        content = <Navigate to="/unauthorized" state={{ from: location }} replace />;
    } else {
        content = <Navigate to="/login" state={{ from: location }} replace />;
    }

    return content;
}

RequireAuth.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RequireAuth;
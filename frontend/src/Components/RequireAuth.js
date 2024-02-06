import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // Commented out for production, uncomment if you need to debug user roles
    // useEffect(() => {
    //     console.log('RequireAuth', auth?.user?.role);
    // }, [auth]);

    // Check if the user role is allowed or if all roles are allowed
    const isRoleAllowed = allowedRoles?.includes(auth?.user?.role) || allowedRoles?.includes('*');

    // Navigate based on authorization and authentication status
    if (isRoleAllowed) {
        return <Outlet />;
    } else {
        const redirectTo = auth?.user ? "/unauthorized" : "/login";
        return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
    }
}

export default RequireAuth;

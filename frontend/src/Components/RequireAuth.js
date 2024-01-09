import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth"
import { useEffect } from "react";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    useEffect(() => {
        console.log('RequireAuth', auth?.user?.role);
    }
    , [auth])
    return (
        auth?.user?.role.includes(allowedRoles)
        ? <Outlet /> : 
            auth?.user ? 
            <Navigate to="/unautherized" state={{ from: location.pathname }} replace={true} /> :
        <Navigate to="/login" state={{ from: location.pathname }} replace={true} />
    )
}

export default RequireAuth;
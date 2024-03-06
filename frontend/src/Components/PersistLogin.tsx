import { Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import useRefreshToken from "../Hooks/useRefreshToken";
import { Backdrop, CircularProgress } from "@mui/material";
import useLocalStorage from "../Hooks/useLocalStorage";

const PersistLogin = () => {


    const { auth } = useAuth();
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);
    const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('checkAuth');
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        // Check persist flag before deciding to refresh or not
        console.log('persist', persist);
        console.log('auth', auth);
        if (persist && !auth?.accessToken) {
            checkAuth();
        } else {
            setIsLoading(false); // Immediately stop loading if persist is false
        }
    }, [auth, persist, refresh]);

    return (
        <>
            {isLoading ? (
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;

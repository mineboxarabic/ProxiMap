import {Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth"
import { useEffect,useState } from "react";
import useRefreshToken from "../Hooks/useRefreshToken";
import { Backdrop, CircularProgress } from "@mui/material";
import useLocalStorage from "../Hooks/useLocalStorage";

const PersistLogin = () => {
    const { auth} = useAuth();
    const refresh = useRefreshToken();
    const [isLoading , setIsLoading] = useState(true);
    const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        const checkAuth = async () => {
            console.log('checkAuth');
            try{
                await refresh();
            }catch(error){
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        }
        console.log(`auth: ${auth?.accessToken}`);
        !auth?.accessToken ? checkAuth() : setIsLoading(false);
    }, [auth])






    return (
        <>
        {
            !persist ? <Outlet /> :
            isLoading ? <div>
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                >   
            <CircularProgress color="inherit" />
            </Backdrop>
            </div> : <Outlet />
        }
        </>
    )
}

export default PersistLogin;
import {Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth"
import { useEffect,useState } from "react";
import useRefreshToken from "../Hooks/useRefreshToken";
import { Backdrop, CircularProgress } from "@mui/material";

const PersistLogin = () => {
    const { auth, persist} = useAuth();
    const refresh = useRefreshToken();
    const [isLoading , setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try{
                await refresh();
            }catch(error){
                console.log(error);
            }finally{
                setIsLoading(false);
            }
        }
        
        !auth?.accessToken ? checkAuth() : setIsLoading(false);
    }, [auth])



 useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
    }, [isLoading])





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
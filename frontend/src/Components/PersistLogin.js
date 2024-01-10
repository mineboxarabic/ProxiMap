import {Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth"
import { useEffect,useState } from "react";
import useRefreshToken from "../Hooks/useRefreshToken";

const PersistLogin = () => {
    const { auth } = useAuth();
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
            isLoading ? <div>Loading...</div> : <Outlet />
        }
        </>
    )
}

export default PersistLogin;
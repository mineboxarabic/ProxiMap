import useAuth from "./useAuth";
import {axiosPrivate} from "../api/axios";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'js-c... Remove this comment to see the full error message
import Cookies from 'js-cookie';
const useLogout = () => {
    // @ts-expect-error TS(2339): Property 'setAuth' does not exist on type 'unknown... Remove this comment to see the full error message
    const {setAuth} = useAuth();
    const handleLogout =async () => {
        setAuth(null)
        //Clear cookies
        Cookies.remove('refreshToken');
        Cookies.remove('accessToken');
        try{
        const response = await axiosPrivate.post('/logout');
            
        //Reload page
        
    }catch(error){
            console.log(error);
        }
    };
    return handleLogout;
};

export default useLogout;
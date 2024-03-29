import useAuth from "./useAuth";
import {axiosPrivate} from "../api/axios";


// @ts-expect-error TS(7016): Could not find a declaration file for module 'js-c... Remove this comment to see the full error message
import Cookies from 'js-cookie';
const useLogout = () => {


    const {setAuth} = useAuth();
    const handleLogout =async () => {
        setAuth({ user: null, accessToken: '' })
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
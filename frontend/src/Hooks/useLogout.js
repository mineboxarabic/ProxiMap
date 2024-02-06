import useAuth from "./useAuth";
import {axiosPrivate} from "../api/axios";
import Cookies from 'js-cookie';
const useLogout = () => {
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
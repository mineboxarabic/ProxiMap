import useAuth from "./useAuth";
import {axiosPrivate} from "../api/axios";
const useLogout = () => {
    const {setAuth} = useAuth();
    const handleLogout =async () => {
        setAuth({})
        try{
        const response = await axiosPrivate.post('/logout');
        
        
    }catch(error){
            console.log(error);
        }
    };
    return handleLogout;
};

export default useLogout;
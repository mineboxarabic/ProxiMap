import useAuth from "./useAuth";
import {axiosPrivate} from "../api/axios";
const useLogout = () => {
    const {setAuth} = useAuth();
    const handleLogout =async () => {
        setAuth(null)
        try{
        const response = await axiosPrivate.post('/logout');
            
        //Reload
       // window.location.reload();
        
    }catch(error){
            console.log(error);
        }
    };
    return handleLogout;
};

export default useLogout;
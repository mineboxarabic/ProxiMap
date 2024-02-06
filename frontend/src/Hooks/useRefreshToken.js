import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    const { auth, setAuth} = useAuth();
    const refresh = async () => {

        try{

  

        const response = await axios.post('/refresh', {}, {
            withCredentials: true,
        });


        
        if(auth !== null){
            setAuth(prev => {

                return {
                    ...prev,
                    user : response.data.user,
                    accessToken: response.data.accessToken,
                }
            })
        }


        console.log('auth after refresh', response.data.accessToken);

        return response.data.accessToken;
    
    }
        catch(error){
            console.log(error);
            throw error;
        }

    }

    return refresh;
};

export default useRefreshToken;
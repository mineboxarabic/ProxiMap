import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {


    // @ts-expect-error TS(2339): Property 'auth' does not exist on type '{}'.
    const { auth, setAuth} = useAuth();
    const refresh = async () => {

        try{

  

        const response = await axios.post('/refresh', {}, {
            withCredentials: true,
        });


        console.log(auth !== null)
        if(auth !== null){
            setAuth((prev: any) => {
                console.log('user', response.data.user)
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
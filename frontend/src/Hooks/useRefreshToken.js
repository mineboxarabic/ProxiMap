import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    const { setAuth} = useAuth();
    const refresh = async () => {
        const response = await axios.post('/refresh', {
            //Allow the cookie to be sent from the browser
            withCredentials: true,

        });
        console.log(response.data);
        

        setAuth(prev => {
            console.log('prev', JSON.stringify(prev));
            console.log('response', JSON.stringify(response.data.accessToken));
            return {
                ...prev,
                token: response.data.accessToken,
            }
        })

        return response.data.accessToken;

    }

    return refresh;
};

export default useRefreshToken;
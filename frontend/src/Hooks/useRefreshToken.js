import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    const { setAuth} = useAuth();
    const refresh = async () => {
        const response = await axios.post('/refresh', {}, {
            withCredentials: true,
        });


        setAuth(prev => {
            console.log('prev',prev);
            return {
                ...prev,
                user : response.data.user,
                accessToken: response.data.accessToken,
            }
        })

        console.log('auth after refresh', response.data.accessToken);

        return response.data.accessToken;

    }

    return refresh;
};

export default useRefreshToken;
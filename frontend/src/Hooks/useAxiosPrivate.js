import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    
    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use((request) => {
              if(!request.headers['Authorization'] && auth.accessToken){
                request.headers['Authorization'] = `Bearer ${auth.accessToken}`;
              }
                return request;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use((response) => {
            return response
        },
            async (error) => {
                console.log(error);
                const prevRequest = error?.config;
                if (error.response.status === 403 || !prevRequest.sent) {
              
                const accessToken = await refresh();
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosPrivate(originalRequest);
            }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    },[auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";

const useResource = (baseUrl: any) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [url, setURL] = useState(baseUrl);

    const handleResponse = (response: any, message: any, method: any, resource: any) => {
        if(method === 'post' || method === 'put') {
            setSuccess(message);
            setLoading(false);  
            return;
        }
        setResources(response.data);
        setSuccess(message);
        setLoading(false);
    };

    const handleError = (error: any) => {
        setLoading(false);
        setSuccess('');
    
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
    
        switch (status) {
            case 400:
                setError(message || "Bad request. Please check your input.");
                break;
            case 401:
                setError(message || "Unauthorized. You need to log in.");
                break;
            case 403:
                setError(message || "Forbidden. You don't have permission.");
                break;
            case 404:
                setError(message || "Resource not found.");
                break;
            case 500:
                setError(message || "Internal server error. Try again later.");
                break;
            default:
                setError(message || "Something went wrong. Please try again.");
        }
    };
    

    const makeRequest = async (method: any, url: any, data: any) => {
        try {
            setLoading(true);
            setError('');
            // @ts-expect-error TS(7052): Element implicitly has an 'any' type because type ... Remove this comment to see the full error message
            const response = await axiosPrivate[method](url, data);
            handleResponse(response, 'Operation successful', method, data);
        } catch (error) {   
            handleError(error);
        }
    };


    // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
    const getAll = () => makeRequest('get', url);
   // const getAllByUrl = (url) => makeRequest('get', url);
    const create = (resource: any) => makeRequest('post', url, resource);
    const update = (resource: any) => makeRequest('put', `${url}/${resource._id}`, resource);
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
    const remove = (id: any) => makeRequest('delete', `${url}/${id}`);
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
    const getOne = (id: any) => makeRequest('get', `${url}/${id}`);
    const updateWithForm = (id: any, data: any) => makeRequest('put', `${url}/${id}`, data);
    const updateMultiple = (data: any) => makeRequest('put', url, data);
    const getAllWithBody = (data: any) => makeRequest('get', url, data);


    return {
        setURL, url,
        getAllWithBody,updateMultiple, resources,setResources, loading, error, getAll, create, update, remove, getOne ,success ,setSuccess, setError, updateWithForm}


}

export default useResource;

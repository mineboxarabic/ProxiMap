import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const axiosPrivate = useAxiosPrivate();

    const handleResponse = (response, message) => {
        setResources(response.data);
        setSuccess(message);
        setLoading(false);
    };

    const handleError = (error) => {
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
    

    const makeRequest = async (method, url, data) => {
        try {
            setLoading(true);
            setError('');
            const response = await axiosPrivate[method](url, data);
            handleResponse(response, 'Operation successful');
        } catch (error) {   
            handleError(error);
        }
    };

    const getAll = () => makeRequest('get', baseUrl);
    const create = (resource) => makeRequest('post', baseUrl, resource);
    const update = (resource) => makeRequest('put', `${baseUrl}/${resource._id}`, resource);
    const remove = (id) => makeRequest('delete', `${baseUrl}/${id}`);
    const getOne = (id) => makeRequest('get', `${baseUrl}/${id}`);
    const updateWithForm = (id, data) => makeRequest('put', `${baseUrl}/${id}`, data);
   
    return { resources,setResources, loading, error, getAll, create, update, remove, getOne ,success ,setSuccess, setError, updateWithForm}


}

export default useResource;

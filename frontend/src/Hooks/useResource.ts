import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
import { Response } from 'express';
import { AxiosResponse, ResponseType } from "axios";

const useResource = <TResource, TResourceId = string>(baseUrl: string) => {
    const [resources, setResources] = useState<TResource[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const [url, setURL] = useState<string>(baseUrl);

    const handleResponse = (response: AxiosResponse, message: string, method: string, resource: any) => {
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
    

    const makeRequest = async (method: string, url: string, data?: Partial<TResource> | TResourceId) => {
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




    const getAll = () => makeRequest('get', url);
   // const getAllByUrl = (url) => makeRequest('get', url);
    const create = (resource: any) => makeRequest('post', url, resource);
    const update = (resource: any) => makeRequest('put', `${url}/${resource._id}`, resource);


    const remove = (id: any) => makeRequest('delete', `${url}/${id}`);


    const getOne = (id: any) => makeRequest('get', `${url}/${id}`);
    const updateWithForm = (id: any, data: any) => makeRequest('put', `${url}/${id}`, data);
    const updateMultiple = (data: any) => makeRequest('put', url, data);
    const getAllWithBody = (data: any) => makeRequest('get', url, data);


    return {
        setURL, url,
        getAllWithBody,updateMultiple, resources,setResources, loading, error, getAll, create, update, remove, getOne ,success ,setSuccess, setError, updateWithForm}


}

export default useResource;

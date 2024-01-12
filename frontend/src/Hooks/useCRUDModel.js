import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
const useCRUDModel = () => {
    const axiosPrivate = useAxiosPrivate();

    
    const handleAddModel = async (modelName, model) => {
        try {
            const response = await axiosPrivate.post('/'+modelName, model);
            return true;
        } catch (error) {
            if(error.response.data.error[0].msg){
                return error.response.data.error[0].msg;
            }
            else if(error.response.data.error){
                return error.response.data.error;
            }
            else if(error.response.data){
                return error.response.data;
            }
            else if(error.response){
                return error.response;
            }

            return error;
        }

        
    }

    const handleEditModel = async (modelName,id, model) => {
        try {
            const response = await axiosPrivate.put(
                `/${modelName}/${id}`
                , model);
            return true;
        } catch (error) {
            if(error.response.data.error[0].msg){
                return error.response.data.error[0].msg;
            }
            else if(error.response.data.error){
                return error.response.data.error;
            }
            else if(error.response.data){
                return error.response.data;
            }
            else if(error.response){
                return error.response;
            }

            return error;
        }
    }

    const handleDeleteModel = async (modelName,id) => {
        try {
            const response = await axiosPrivate.delete(
                `/${modelName}/${id}`
                );
            return true;
        } catch (error) {
            if(error.response.data.error[0].msg){
                return error.response.data.error[0].msg;
            }
            else if(error.response.data.error){
                return error.response.data.error;
            }
            else if(error.response.data){
                return error.response.data;
            }
            else if(error.response){
                return error.response;
            }

            return error;
        }
    }

    const handleGetAllModel = async (modelName) => {
        try {
            const response = await axiosPrivate.get(
                `/${modelName}`
                );
            return response.data;
        } catch (error) {
            if(error.response.data.error[0].msg){
                return error.response.data.error[0].msg;
            }
            else if(error.response.data.error){
                return error.response.data.error;
            }
            else if(error.response.data){
                return error.response.data;
            }
            else if(error.response){
                return error.response;
            }

            return error;
        }
    }

    const handleGetOneModel = async (modelName,id) => {
        try {
            const response = await axiosPrivate.get(
                `/${modelName}/${id}`
                );
            return response.data;
        } catch (error) {
            if(error.response.data.error[0].msg){
                return error.response.data.error[0].msg;
            }
            else if(error.response.data.error){
                return error.response.data.error;
            }
            else if(error.response.data){
                return error.response.data;
            }
            else if(error.response){
                return error.response;
            }

            return error;
        }
    }
    return {handleAddModel, handleEditModel, handleDeleteModel , handleGetAllModel, handleGetOneModel};
};

export default useCRUDModel;
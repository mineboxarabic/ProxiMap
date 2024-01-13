import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
const useCRUDModel = () => {
    const axiosPrivate = useAxiosPrivate();

    
    const handleAddModel = async (modelName, model) => {
        try {
            const response = await axiosPrivate.post('/'+modelName, model);
            return true;
        } catch (error) {
            return error.response.data.error[0].msg;
        }

        
    }

    const handleEditModel = async (modelName,id, model) => {
        try {
            const response = await axiosPrivate.put(
                `/${modelName}/${id}`
                , model);
            return true;
        } catch (error) {
            return error.response.data.error[0].msg;
        }
    }

    const handleDeleteModel = async (modelName,id) => {
        try {
            const response = await axiosPrivate.delete(
                `/${modelName}/${id}`
                );
            return true;
        } catch (error) {

            return error.response.data.error[0].msg;
        }
    }

    const handleGetAllModel = async (modelName) => {
        try {
            const response = await axiosPrivate.get(
                `/${modelName}`
                );
            return response.data;
        } catch (error) {
            return error.response.data.error[0].msg;
        }
    }

    const handleGetOneModel = async (modelName,id) => {
        try {
            const response = await axiosPrivate.get(
                `/${modelName}/${id}`
                );
            return response.data;
        } catch (error) {
            return error.response.data.error[0].msg;
        }
    }
    return {handleAddModel, handleEditModel, handleDeleteModel , handleGetAllModel, handleGetOneModel};
};

export default useCRUDModel;
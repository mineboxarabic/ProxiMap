import useAxiosPrivate from "../Hooks/useAxiosPrivate"
import { useState } from "react";
const CRUDTable = ({endpoint,data, handleAdd, handleEdit, handleDelete}) => {
    const axiosPrivate = useAxiosPrivate();

    

    const handleEditClick = (id) => {
        setEdit(true);
        handleEdit(id);
    }

    const handleDeleteClick = (id) => {
        handleDelete(id);
    }

    const handleAddClick = () => {
        setEdit(false);
        handleAdd();
    }


    return (
        <>
            
        </>
    )


}
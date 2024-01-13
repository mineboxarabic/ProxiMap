import useAxiosPrivate from "../Hooks/useAxiosPrivate"
import { useEffect, useState } from "react";

import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import VerifyDeleteModal from "./Modals/VerifyDeleteModal";
import UsersModal from "./Modals/UsersModal";


import useCRUDModel from "../Hooks/useCRUDModel";
import { Alert } from "@mui/material";
import Snackbar from '@mui/material/Snackbar'

import '../Style/App.scss';


const CRUDTable = ({columns, modelClass, nameOfClass}) => {
    const columnsWithAction = [...columns];


    //Modal states
    const [openModal, setOpenModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    //CRUD hooks
    const {handleAddModel, handleEditModel, handleDeleteModel ,  handleGetAllModel} = useCRUDModel();
    const [data, setData] = useState([]);

    
    
    //Snackbar states
    const [success, setSuccess] = useState(false);
    const [errormsg, setErrormsg] = useState('');
  

    //Model
    const [model, setModel] = useState(modelClass);
    //const model = new modelClass();
    useEffect(() => {
      resetModel();
    }
    ,[isAdd])

    useEffect(() => {
        const data = async () => {
            const response = await handleGetAllModel(nameOfClass);
            setData(response);
        }
        data();
    }, [success])

    
    const resetModel = () => {
        setModel(modelClass);
    }


    const handleClose = () => {
      console.log("close");
      setOpenModal(false);
      setIsEdit(false);
      setIsAdd(false);
    };

    const openEditModal = (row) => {
        setErrormsg("");
      setModel(row);
      //model.setAttributesFromRow(row);
      setIsEdit(true);
      setOpenModal(true);
    };

    const openAddModal = () => {
      setErrormsg("");
      setIsAdd(true);
      setOpenModal(true);
    };

    const openDeleteModal = (row) => {
        console.log(row);
        setErrormsg("");

        setModel(row);
        setIsDelete(true);
    };



    //CRUD functions
    const handleAdd = async () => {
      const iserror = await handleAddModel(nameOfClass, model);
      if (iserror === true) {
        setOpenModal(false);
        setIsAdd(false);
        setSuccess(true);
      }
      if (iserror === null) {
        setOpenModal(false);
        setIsAdd(false);
      } else {
        setErrormsg(iserror);
      }
    };

    const handleEdit = async (id) => {
      
        if(model['password']){
            delete model['password'];
        }
        const iserror = await handleEditModel(nameOfClass, id, model);
      
      if (iserror === true) {
        setOpenModal(false);
        setIsEdit(false);
        setSuccess(true);
      }
      if (iserror === null) {
        setOpenModal(false);
        setIsEdit(false);
      } else {
        setErrormsg(iserror);
      }
    };
    const handleDelete = async (id) => {
        const iserror = await handleDeleteModel(nameOfClass, id);
        if (iserror === true) {
            setOpenModal(false);
            setIsDelete(false);
            setSuccess(true);
        }
        if (iserror === null) {
            setOpenModal(false);
            setIsDelete(false);
        } else {
            setErrormsg(iserror);
        }
    }




    const handleChooseModal = () => {
      switch (nameOfClass) {
        case "users":
          return (
            <UsersModal
              isEdit={isEdit}
              open={openModal}
              handleClose={handleClose}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              model={model}
              setModel={setModel}
              error={errormsg}
            />
          );

        default:
          return model;
      }
    };

   columnsWithAction.push({
        field: 'action',
        headerName: 'Action',
        width: 150,
        renderCell: (params) => {

            return (
                <>
                    <Button 
                    variant="contained"
                    style={{backgroundColor: '#00b300', color: 'white'}}
                    className="userListEdit"
                    onClick={() => openEditModal(params.row)}>Edit</Button>


                    <Button 
                    variant="contained"
                    style={{backgroundColor: '#ff1a1a', color: 'white'}}
                    className="userListDelete"
                    onClick={() => openDeleteModal(params.row)}>Delete</Button>
                </>
            )
        }});





    return (
   
        <Box 
        paddingTop={'50px'}
        >
      

      <Snackbar open={success} autoHideDuration={6000} onClose={()=>{
            setSuccess(false);
      }}>
        <Alert onClose={()=>{
            setSuccess(false);
        }} severity="success" sx={{ width: '100%' }}>
            This is a success message!
        </Alert>
    </Snackbar>

            {handleChooseModal()}
            <VerifyDeleteModal id={model['_id']} handleDelete={handleDelete} open={isDelete} handleClose={() => setIsDelete(false)}/>

 

            <DataGrid 
            autoHeight
            //Disable selection
            disableSelectionOnClick
            style={{width: '60%', margin: 'auto'}}
            getRowId={(row) => row._id} rows={data} columns={columnsWithAction} pageSize={5} >
            </DataGrid>

        <Fab color="primary" aria-label="add"
        style={{position: 'fixed', bottom: '20px', right: '20px'}}
        >
        <AddIcon 
        
        onClick={openAddModal}
        />
        </Fab>

        </Box>
    
    )


}

export default CRUDTable;
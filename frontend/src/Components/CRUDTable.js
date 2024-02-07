import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DynamicFormModal from './Modals/DynamicFormModal';
import VerifyDeleteModal from './Modals/VerifyDeleteModal';
import useResource from '../Hooks/useResource';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';

const CRUDTable = ({ modelClass, nameOfClass, modelStructure, columns }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedModel, setSelectedModel] = useState({});
  const [isDelete, setIsDelete] = useState(false);

  const {setResources, create, update, remove, getAll, resources, loading, error, success, setSuccess, setError } = useResource(`/${nameOfClass}`);
  const axiosPrivate = useAxiosPrivate();
  
  const updateDataTable = async () => {
    const response = await axiosPrivate.get(`/${nameOfClass}`);
    setResources(response.data);

  }
  useEffect(() => {
    const fetchData = async () => {
      updateDataTable();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);


  const openEditModal = (row) => {
    setSelectedModel(row);
    setIsEdit(true);
    setOpenModal(true);
  };

  const openAddModal = () => {
    setSelectedModel(modelClass);
    setIsEdit(false);
    setOpenModal(true);
  };

  const openDeleteModal = (row) => {
    setSelectedModel(row);
    setIsDelete(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setIsDelete(false);
    setError('');
  };

  const handleSuccessClose = () => {
    setSuccess(false);
  };

  const handleAddOrEdit = async (model) => {
    console.log(model);
    console.log(isEdit);
    if (isEdit) {
      await update(model);
      
    } else {
      await create(model);
    }
    console.log('success', success);
    setOpenModal(false);

    console.log('error', error);

    //await getAll();
  };

  const handleDelete = async () => {
    await remove(selectedModel._id);
    setIsDelete(false);
    await getAll();
  };

  const actionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <>
        <Button color="primary" onClick={() => openEditModal(params.row)}>Edit</Button>
        <Button color="error" onClick={() => openDeleteModal(params.row)}>Delete</Button>
      </>
    ),
  };

  const tableColumns = [...columns, actionColumn];

  return (
    <Box sx={{ height: 400, width: '100%', mt: 5 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <DataGrid
        rows={resources}
        columns={tableColumns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        loading={loading}
        getRowId={(row) => row._id}
      />

      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 20, right: 20 }} onClick={openAddModal}>
        <AddIcon />
      </Fab>

      <DynamicFormModal
        open={openModal}
        handleClose={handleClose}
        handleSubmit={handleAddOrEdit}
        initialData={selectedModel}
        fields={modelStructure}
        isEdit={isEdit}
      />

      <VerifyDeleteModal
        open={isDelete}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />

      <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Operation successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CRUDTable;

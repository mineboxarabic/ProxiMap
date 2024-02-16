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

const CRUDTable = ({
  modelClass,
  nameOfClass,
  modelStructure,
  columns
}: any) => {
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


  const openEditModal = (row: any) => {
    setSelectedModel(row);
    setIsEdit(true);
    setOpenModal(true);
  };

  const openAddModal = () => {
    setSelectedModel(modelClass);
    setIsEdit(false);
    setOpenModal(true);
  };

  const openDeleteModal = (row: any) => {
    setSelectedModel(row);
    setIsDelete(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setIsDelete(false);
    setError('');
  };

  const handleSuccessClose = () => {


    // @ts-expect-error TS(2345): Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
    setSuccess(false);
  };

  const handleAddOrEdit = async (model: any) => {
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
    updateDataTable();
    //await getAll();
  };

  const handleDelete = async () => {


    // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
    await remove(selectedModel._id);
    setIsDelete(false);
    await getAll();
  };

  const actionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params: any) => <>
      <Button color="primary" onClick={() => openEditModal(params.row)}>Edit</Button>
      <Button color="error" onClick={() => openDeleteModal(params.row)}>Delete</Button>
    </>,
  };

  const tableColumns = [...columns, actionColumn];

  return (
    <Box sx={{ height: 400, width: '100%', mt: 5 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <DataGrid
        rows={resources}
        columns={tableColumns}


        // @ts-expect-error TS(2322): Type '{ rows: never[]; columns: any[]; pageSize: n... Remove this comment to see the full error message
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        loading={loading}


        // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
        getRowId={(row) => row._id}
        sx={{
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
          backgroundColor: 'light.main',

          //Centering the table
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          width: 'fit-content',
          height: '80vh',
          margin: 'auto',

        }}
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

      <Snackbar open={success !== ''} autoHideDuration={6000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Operation successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CRUDTable;

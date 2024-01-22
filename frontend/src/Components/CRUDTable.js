import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import VerifyDeleteModal from "./Modals/VerifyDeleteModal";
import UsersModal from "./Modals/UsersModal";

import useCRUDModel from "../Hooks/useCRUDModel";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import "../Style/DataTable.scss";
import ServiceModal from "./Modals/ServicesModal";
import CategorysModal from "./Modals/CategorysModal";

const CRUDTable = ({ columns, modelClass, nameOfClass }) => {
  const columnsWithAction = [...columns];

  //Modal states
  const [openModal, setOpenModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  //CRUD hooks
  const {
    AddModel,
    EditModel,
    DeleteModel,
    GetAllModels,
    GetOneModel,
    loading,
    error,
    success,
    setSuccess,
    setError
  } = useCRUDModel();



  const [data, setData] = useState([]);

  //Model
  const [model, setModel] = useState(modelClass);
  const [selectedModel, setSelectedModel] = useState(modelClass);

  const getData = async () => {
    setData([]);
    const response = await GetAllModels(nameOfClass);
    setData(response);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (error) {
      setOpenModal(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setOpenModal(false);
      setIsAdd(false);
      setIsEdit(false);
      getData();
    }
  }, [success]);






  const handleClose = () => {
    setIsAdd(false);
    setIsEdit(false);
    setOpenModal(false);
    setError('');
  };

  const openEditModal = async (row) => {

    setModel(row);
    setIsEdit(true);
    setOpenModal(true);
  };

  const openAddModal = () => {
    setModel(modelClass);
    setIsAdd(true);
    setOpenModal(true);
    setIsEdit(false);
  };

  const openDeleteModal = (row) => {
    setSelectedModel(row?._id);
    setIsDelete(true);
  };

  //CRUD functions
  const handleAdd = async (addedModel) => {
    await AddModel(nameOfClass, addedModel);
  };

  const handleEdit = async (modelEdited) => {
    if (modelEdited["password"]) {
      delete modelEdited["password"];
    }


    const res = await EditModel(nameOfClass, modelEdited._id, modelEdited);

  

  };
  const handleDelete = async (id) => {
    await DeleteModel(nameOfClass, id);

    getData();
    setIsDelete(false);
  };

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
            error={error}
            modelClass={modelClass}

          />
        );

      case "services":
        return (
          <ServiceModal
            isEdit={isEdit}
            open={openModal}
            handleClose={handleClose}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            model={model}
            modelClass={modelClass}
            setModel={setModel}
            error={error}
          />
        );

      case "categorys":
        return (
          <CategorysModal
            isEdit={isEdit}
            open={openModal}
            handleClose={handleClose}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            model={model}
            setModel={setModel}
            error={error}
            modelClass={modelClass}

          />
        );
    }
  };

  columnsWithAction.push({
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Button
            variant="contained"
            style={{ backgroundColor: "#00b300", color: "white" }}
            className="userListEdit"
            onClick={() => openEditModal(params.row)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            style={{ backgroundColor: "#ff1a1a", color: "white" }}
            className="userListDelete"
            onClick={() => openDeleteModal(params.row)}
          >
            Delete
          </Button>
        </>
      );
    },
  });

  return (
    <Box paddingTop={"50px"}>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => {
          setSuccess(false);
        }}
      >
        <Alert
          onClose={() => {
            setSuccess(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>

      {handleChooseModal()}
      <VerifyDeleteModal
        id={selectedModel}
        handleDelete={handleDelete}
        open={isDelete}
        handleClose={() => setIsDelete(false)}
      />

      <DataGrid
        autoHeight
        //Disable selection
        disableSelectionOnClick
        className="dataGrid"
        loading={loading}
        getRowId={(row) => row._id}
        rows={data}
        columns={columnsWithAction}
        pageSize={5}
        //How many rows to show in the pagination
        rowsPerPageOptions={[5, 10, 20]}
      ></DataGrid>

      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <AddIcon onClick={openAddModal} />
      </Fab>
    </Box>
  );
};

export default CRUDTable;

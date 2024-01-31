import React, { useEffect } from "react";
import { Modal, Box, Autocomplete } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "../../Style/Table.scss";
import useResource from "../../Hooks/useResource";
import useCurrentUser from "../../Hooks/useCurrentUser";

const NewServiceModal = ({
  open,
  handleClose,
  handleAdd,
  error,
  modelClass
}) => 
{

  const [tempModel, setTempModel] = useState(modelClass);
    const currentUser = useCurrentUser();
  const {resources: categorys, getAll: getCategorys } = useResource('/categorys');

  useEffect(()=>{
    getCategorys();
    console.log('catttt',categorys);

  },[])


  return (
    open && (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
    

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
                  <Alert
            className={error ? "show" : "offscreen"}
            onClose={handleClose}
            severity="error"

          >
            {error}
          </Alert>

            


          <Autocomplete
              id="combo-box-demo"
              options={categorys || []}
              getOptionLabel={(option) => option.name || ''}
              sx={{ width: 300 }}
              onChange={(e, value) => setTempModel({ ...tempModel, categoryId: value ? value._id : '' })}
              renderInput={(params) => <TextField {...params} label="Category" />}
            />

           
           
           
            <TextField label="Name" variant="outlined" value={tempModel["name"]} onChange={(e) => setTempModel({ ...tempModel, name: e.target.value })} />
            <TextField label="Description" variant="outlined" value={tempModel["description"]} onChange={(e) => setTempModel({ ...tempModel, description: e.target.value })} />
            <TextField type="number" label="Price" variant="outlined" value={tempModel["price"]} onChange={(e) => setTempModel({ ...tempModel, price: parseInt(e.target.value) })} />
            <TextField label="Availability" variant="outlined" value={tempModel["availability"]} onChange={(e) => setTempModel({ ...tempModel, availability: e.target.value })} />
            <TextField label="Ratings" variant="outlined" value={tempModel["ratings"]} onChange={(e) => setTempModel({ ...tempModel, ratings: e.target.value })} />


            <TextField 
            type="number" 
            label="lat" 
            variant="outlined"
            value={tempModel.position.coordinates[0] || ''}
            onChange={(e) => {
              let newCoordinates = [...tempModel.position.coordinates];
              newCoordinates[0] = parseFloat(e.target.value);
              setTempModel({
                ...tempModel,
                position: { ...tempModel.position, coordinates: newCoordinates }
              });
            }} />
            
            
            
            
            <TextField type="number" label="lng" variant="outlined" value={tempModel["position"]['coordinates'][1]} onChange={
              (e) => {
                let newCoordinates = [...tempModel.position.coordinates];
                newCoordinates[1] = parseFloat(e.target.value);
                setTempModel({
                  ...tempModel,
                  position: { ...tempModel.position, coordinates: newCoordinates }
                });
              
              }} />

            <TextField  type="number"label="range" variant="outlined" value={tempModel["range"]} onChange={(e) => setTempModel({ ...tempModel, range: e.target.value })} />
          
        
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button color="error" variant="contained" onClick={handleClose}>
              cancel
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => ( handleAdd(tempModel))}
            >
              save
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
};

export default NewServiceModal;

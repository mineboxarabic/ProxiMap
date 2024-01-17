import React, { useEffect } from "react";
import { Modal, Box, Autocomplete } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "../../Style/Table.scss";
import useResource from "../../Hooks/useResource";

const ServiceModal = ({
  open,
  isEdit,
  handleClose,
  handleEdit,
  handleAdd,
  model,
  setModel,
  error,
}) => 
{
  const {setResources:setPartners, resources: partners, getAll: getPartners } = useResource('/users');
  const getPartnersAutoComplete = async () => {
    await getPartners();
    setPartners((partners) =>{
      return partners.map((partner) => {
        return { value: partner._id, label: partner.username };
      });
    });

  }

  useEffect(() => {
    getPartnersAutoComplete();
  }, []);


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

          <TextField
            label="partnerId"
            variant="outlined"
            value={model["partnerId"]}
            onChange={(e) => setModel({ ...model, partnerId: e.target.value })}
            
            />

            <Autocomplete 
            id="combo-box-demo"
            options={partners}
            isOptionEqualToValue = {(option, value) => option.value === value.value}
            sx={{ width: 300 }}
            onChange={(e, value) => setModel({ ...model, partnerId: value.value })}
            renderInput={(params) => <TextField {...params} label="Partner" />}
            />



            <TextField label="CategoryId" variant="outlined" value={model["categoryId"]} onChange={(e) => setModel({ ...model, categoryId: e.target.value })} />
            <TextField label="Name" variant="outlined" value={model["name"]} onChange={(e) => setModel({ ...model, name: e.target.value })} />
            <TextField label="Description" variant="outlined" value={model["description"]} onChange={(e) => setModel({ ...model, description: e.target.value })} />
            <TextField label="Price" variant="outlined" value={model["price"]} onChange={(e) => setModel({ ...model, price: e.target.value })} />
            <TextField label="Availability" variant="outlined" value={model["availability"]} onChange={(e) => setModel({ ...model, availability: e.target.value })} />
            <TextField label="Ratings" variant="outlined" value={model["ratings"]} onChange={(e) => setModel({ ...model, ratings: e.target.value })} />


            <TextField type="number" label="lat" variant="outlined" value={model["position"]["lat"]} onChange={(e) => setModel({ ...model, position: { ...model["position"], lat: e.target.value } })} />
            <TextField type="number" label="lng" variant="outlined" value={model["position"]["lng"]} onChange={(e) => setModel({ ...model, position: { ...model["position"], lng: e.target.value } })} />

            <TextField  type="number"label="range" variant="outlined" value={model["range"]} onChange={(e) => setModel({ ...model, range: e.target.value })} />
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
              onClick={() => (isEdit ? handleEdit(model["_id"]) : handleAdd())}
            >
              save
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
};

export default ServiceModal;

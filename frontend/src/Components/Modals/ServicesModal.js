import React, { useEffect } from "react";
import { Modal, Box, Autocomplete } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "../../Style/Table.scss";

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

            <TextField label="CategoryId" variant="outlined" value={model["categoryId"]} onChange={(e) => setModel({ ...model, categoryId: e.target.value })} />
            <TextField label="Name" variant="outlined" value={model["name"]} onChange={(e) => setModel({ ...model, name: e.target.value })} />
            <TextField label="Description" variant="outlined" value={model["description"]} onChange={(e) => setModel({ ...model, description: e.target.value })} />
            <TextField label="Price" variant="outlined" value={model["price"]} onChange={(e) => setModel({ ...model, price: e.target.value })} />
            <TextField label="Availability" variant="outlined" value={model["availability"]} onChange={(e) => setModel({ ...model, availability: e.target.value })} />
            <TextField label="Ratings" variant="outlined" value={model["ratings"]} onChange={(e) => setModel({ ...model, ratings: e.target.value })} />

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

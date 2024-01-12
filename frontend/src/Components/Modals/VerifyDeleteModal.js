import React, { useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "../../Style/Table.scss";

const VerifyDeleteModal = ({ open, handleClose,handleDelete, id}) => {
  return (
    open && (
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{
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
                <h1>Are you sure you want to delete this?</h1>
                <Box 
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                <Button
                color="error"
                onClick={handleClose} variant="contained">No</Button>
                <Button color="success"
                onClick={()=>handleDelete(id)} variant="contained"
                >Yes</Button>
                </Box>
            </Box>
      </Modal>
    )
  );
};

export default VerifyDeleteModal;

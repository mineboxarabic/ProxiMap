import React, { useEffect } from "react";
import { Modal, Box, Autocomplete } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "../../Style/Table.scss";
import useResource from "../../Hooks/useResource";

const CategorysModal = ({
  open,
  isEdit,
  handleClose,
  handleEdit,
  handleAdd,
  model,
  setModel,
  error,
  modelClass
}) => 
{
  const [tempModel, setTempModel] = useState(modelClass);


  useEffect(() => {
    if(isEdit){
      setTempModel(model);
    }
    else{
      setTempModel(modelClass);
    }
  }, [open]);

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

 

            
            
            
            
            <TextField type="text" label="name" value={tempModel.name} onChange={(e) => {
                setTempModel({...tempModel, name: e.target.value});
                }
                }
            />

            <TextField type="text" label="description" value={tempModel.description} onChange={(e) => {
                setTempModel({...tempModel, description: e.target.value});
                }
                }

            />

        
        
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
              onClick={() => {
                if (isEdit) {
                    handleEdit(tempModel);
                } else {
                    handleAdd(tempModel);
                }
              }}
            >
              save
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
};

export default CategorysModal;

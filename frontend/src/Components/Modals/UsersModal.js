import React, { useEffect } from "react";
import { Modal, Box, Autocomplete } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "../../Style/Table.scss";

const UsersModal = ({
  open,
  isEdit,
  handleClose,
  handleEdit,
  handleAdd,
  model,
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
            <TextField
              className={"modalTextField"}
              label={"User name"}
              type="text"
              value={tempModel["username"]}
              onChange={(e) =>
                setTempModel((prev) => ({ ...prev, ["username"]: e.target.value }))
              }
            />
            <TextField
              className={"modalTextField"}
              label={"Email"}
              type="text"
              value={tempModel["email"]}
              onChange={(e) =>
                setTempModel((prev) => ({ ...prev, ["email"]: e.target.value }))
              }
            />
            <TextField
              className={"modalTextField"}
              label={"Password"}
              type="text"
              value={tempModel["password"]}
              disabled={isEdit ? true : false}
              onChange={(e) =>
                setTempModel((prev) => ({ ...prev, ["password"]: e.target.value }))
              }
            />



           { /*<TextField className={"modalTextField"} label={"Role"} type="text" value={model["role"]} onChange={(e) =>setModel((prev) => ({ ...prev, ["role"]: e.target.value }))}/>*/}
              
              <Autocomplete
              inputValue={tempModel["role"] ? tempModel["role"] : "Select a role"}
              isOptionEqualToValue={(option, value) => option === value}
              value={tempModel["role"] ? tempModel["role"] : "Select a role"}
              className={"modalTextField"} disablePortal={true} options={["Admin", "User", "Staff", "Manager", "Partner","Select a role"]} onChange={(e, value) =>setTempModel((prev) => ({ ...prev, ["role"]: value }))} renderInput={(params) => <TextField {...params} label="Role" />} />

            <TextField
              className={"modalTextField"}
              label={"BIO"}
              type="text"
              value={tempModel["profile"]["bio"]}
              onChange={(e) =>
                setTempModel((prev) => ({
                  ...prev,
                  ["profile"]: {
                    ...tempModel["profile"],
                    ["bio"]: e.target.value,
                  },
                }))
              }
            />
            <TextField
              className={"modalTextField"}
              label={"profile Picture"}
              type="text"
              value={tempModel["profile"]["profilePicture"]}
              onChange={(e) =>
                setTempModel((prev) => ({
                  ...prev,
                  ["profile"]: {
                    ...tempModel["profile"],
                    ["profilePicture"]: e.target.value,
                  },
                }))
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
              onClick={() => (isEdit ? handleEdit(tempModel) : handleAdd(tempModel))}
            >
              save
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
};

export default UsersModal;

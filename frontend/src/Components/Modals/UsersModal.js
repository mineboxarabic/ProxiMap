import React, { useEffect } from "react";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "../../Style/Table.scss";

const UsersModal = ({ open, isEdit, handleClose,  handleEdit,handleAdd, model, setModel, error,}) => {
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
          <Alert
            className={error ? "show" : "offscreen"}
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              className={"modalTextField"}
              label={"User name"}
              type="text"
              value={model["username"]}
              onChange={(e) =>
                setModel((prev) => ({ ...prev, ["username"]: e.target.value }))
              }
            />
            <TextField
              className={"modalTextField"}
              label={"Email"}
              type="text"
              value={model["email"]}
              onChange={(e) =>
                setModel((prev) => ({ ...prev, ["email"]: e.target.value }))
              }
            />
            <TextField
              className={"modalTextField"}
              label={"Password"}
              type="text"
              value={model["password"]}
              onChange={(e) =>
                setModel((prev) => ({ ...prev, ["password"]: e.target.value }))
              }
            />
            <TextField
              className={"modalTextField"}
              label={"Role"}
              type="text"
              value={model["role"]}
              onChange={(e) =>
                setModel((prev) => ({ ...prev, ["role"]: e.target.value }))
              }
            />
            <TextField
              className={"modalTextField"}
              label={"BIO"}
              type="text"
              value={model["profile"]["bio"]}
              onChange={(e) =>
                setModel((prev) => ({
                  ...prev,
                  ["profile"]: {
                    ...model["profile"],
                    ["bio"]: e.target.value,
                  },
                }))
              }
            />
            <TextField
              className={"modalTextField"}
              label={"profile Picture"}
              type="text"
              value={model["profile"]["profilePicture"]}
              onChange={(e) =>
                setModel((prev) => ({
                  ...prev,
                  ["profile"]: {
                    ...model["profile"],
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
            <Button
              color="error"
variant="contained"
              onClick={handleClose}
            >
              cancel
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={() => isEdit ? handleEdit(model['_id']):handleAdd()}
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

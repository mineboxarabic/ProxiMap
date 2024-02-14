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
  modelClass
}: any) => 
{
  const {setResources:setPartners, resources: partners, getAll: getPartners } = useResource('/users');
  const {setResources:setCategorys, resources: categorys, getAll: getCategorys } = useResource('/categorys');


  
  const [tempModel, setTempModel] = useState(modelClass);





  const getPartnersAutoComplete = async () => {
    await getPartners();
    // @ts-expect-error TS(2345): Argument of type '(partners: never[]) => { value: ... Remove this comment to see the full error message
    setPartners((partners) =>{
      return partners.map((partner) => {
        // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
        return { value: partner._id, label: partner.username };
      });
    });

  
  }


  const getCategorysAutoComplete = async () => {
    await getCategorys();
    // @ts-expect-error TS(2345): Argument of type '(categorys: never[]) => { value:... Remove this comment to see the full error message
    setCategorys((categorys) =>{
      return categorys.map((category) => {
        // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
        return { value: category._id, label: category.name };
      });
    }
    );
  }


  useEffect(() => {
    getPartnersAutoComplete();
    getCategorysAutoComplete();
  }, []);

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

 

            <Autocomplete 
            id="combo-box-demo"
            options={partners}
            defaultValue={()=>{
              if(isEdit){
                return {value: model.partnerId, label:model?.partnerDetails[0] ? model?.partnerDetails[0].username : 'User not found'}
              }else{
                // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
                return {value: partners[0]?.value, label: partners[0]?.label}
              }
            }}
            // @ts-expect-error TS(2339): Property 'value' does not exist on type '() => { v... Remove this comment to see the full error message
            isOptionEqualToValue = {(option, value) => option.value === value.value}
            sx={{ width: 300 }}
            // @ts-expect-error TS(2339): Property 'value' does not exist on type '() => { v... Remove this comment to see the full error message
            onChange={(e, value) => setTempModel({ ...tempModel, partnerId: value ? value.value : ''  })}
            renderInput={(params) => <TextField {...params} label="Partner" />}
            />



            {/*<TextField label="CategoryId" variant="outlined" value={tempModel["categoryId"]} onChange={(e) => setTempModel({ ...tempModel, categoryId: e.target.value })} />*/}
            <Autocomplete 
            id="combo-box-demo"
            options={categorys}
            defaultValue={()=>{
              if(isEdit){
                return {value: model.categoryId, label: model.categoryDetails[0]
                   ? model?.categoryDetails[0].name : 'Category not found'}
              }else{
                // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
                return {value: categorys[0]?.value || ''
                  // @ts-expect-error TS(2339): Property 'label' does not exist on type 'never'.
                  , label: categorys[0]?.label || ''}
              }
            }}
            // @ts-expect-error TS(2339): Property 'value' does not exist on type '() => { v... Remove this comment to see the full error message
            isOptionEqualToValue = {(option, value) => option.value === value.value}
            sx={{ width: 300 }}
            // @ts-expect-error TS(2339): Property 'value' does not exist on type '() => { v... Remove this comment to see the full error message
            onChange={(e, value) => setTempModel({ ...tempModel, categoryId: value ? value.value : '' })}
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

export default ServiceModal;

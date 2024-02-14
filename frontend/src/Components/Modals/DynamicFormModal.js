import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Autocomplete } from '@mui/material';
import Card from '@mui/material/Card';
import useResource from '../../Hooks/useResource';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
function getValue(obj, path) {
  //return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    if (!current[keys[i]]) return '';
    current = current[keys[i]];
  }
  return current;
}

function setValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) current[key] = {};
    current = current[key];

  }

  current[keys[keys.length - 1]] = value;
}

function convertDateToISO(date) {
  if(!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
}

const DynamicFormModal = ({ open, handleClose, handleSubmit, initialData, fields, isEdit }) => {
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({}); // Track validation states and messages
  const axiosPrivate = useAxiosPrivate();



  useEffect(() => {


    if (isEdit) {
      setFormData(initialData);
    } else {
      
      const defaultFormData = fields.reduce(async (acc, field) => {
        acc[field.name] = field.type === 'select' ? field.options[0] : '';
        return acc;
      }, {});
      setFormData(defaultFormData);
    }
  }, [initialData, open, isEdit, fields]);

  const handleChange = (name, value, regex, errorMessage) => {
 //   setFormData((prev) => ({ ...prev, [name]: value }));

  setFormData((prev) => {
    const newFormData = { ...prev };
    setValue(newFormData, name, value);
    return newFormData;
  });


    const isValid = regex ? new RegExp(regex).test(value) : true;
    setFieldErrors((prev) => ({ ...prev, [name]: isValid ? "" : errorMessage }));
  };

  const renderField = ({ name, label, type, options, regex, errorMessage }) => {

    const error = fieldErrors[name];
    const commonProps = {
      key: name,
      label,
      fullWidth: true,
      value: type == 'date' ? convertDateToISO(getValue(formData, name)) ?? '' : getValue(formData, name) ?? '',
      error: !!error, // Boolean: true if there's an error
      helperText: error, // Display custom error message
      onChange: (e) => handleChange(name, e.target.value, regex, errorMessage),


    };
    switch (type) {
      case 'text':
      case 'email':
      case 'password':

        return <TextField {...commonProps} type={type} 
        autoComplete="off"
      
        />;
      case 'select':
        return (
          <Autocomplete
            {...commonProps}
            options={options}
          //{name: "", value: ""}
            getOptionLabel={(option) => option.name}

            value={options.find((o) => o.value === getValue(formData, name)) ?? options[0]}
            getOptionKey={(option) => option.value}
            
            onChange={(event, newValue) => {
              console.log('new value', newValue);
              handleChange(name, newValue.value, regex, errorMessage);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error}
              />
            )}
          />
        );


      case 'textarea':
        return <TextField {...commonProps} multiline minRows={4} />;
      case 'number':
        return <TextField {...commonProps} type="number" />;
      case 'checkbox':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                color: 'light.main',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >{label}</Typography>
            <Checkbox
            color='primary'
              {...commonProps}
              checked={getValue(formData, name)}
              onChange={(e) => handleChange(name, e.target.checked)}
            />
          </Box>
        );
      case 'slider':
          return(
            //Use Slider component from Material UI
            <Box sx={{width: '100%'}}>
              <Typography
              sx={{
                color: 'light.main',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
              id="discrete-slider" gutterBottom>
                {label}
              </Typography>
              <Slider
                {...commonProps}
                valueLabelDisplay="auto"
                step={1}
               
                min={1}
                max={5000}
              />
      

            </Box>
          )

      case 'date':

            return(
              <TextField
             
         
              {...commonProps}
              type="date"
              //InputLabelProps={{shrink: true}}
              />
            )

      default:
        return null;
    }
  };

  const handleSave = () => {
    const allValid = Object.values(fieldErrors).every((e) => e === "");
    if (allValid) {
      handleSubmit(formData);
      handleClose();
    } else {
      // Optionally, handle form submission block due to validation errors
    }
  };

  return (
    <Modal sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      
    }} open={open} onClose={handleClose}>


      <Box sx={{

        width: 400, 
        p: 4, 
        bgcolor: 'bgForm.main',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        borderRadius: '5px',
        boxShadow: '2px 2px 4px 0px #11111c',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',

        }}>
        {fields.map(renderField)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap:'2rem' }}>
          <Button 
          variant="contained"
          color='error'
          onClick={handleClose}>Cancel</Button>
          <Button 
          variant="contained"
          onClick={handleSave}>Save</Button>
        </Box>
      </Box>

    </Modal>
  );
};

export default DynamicFormModal;

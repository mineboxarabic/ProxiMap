import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Autocomplete } from '@mui/material';
import Card from '@mui/material/Card';
function getValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
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
const DynamicFormModal = ({ open, handleClose, handleSubmit, initialData, fields, isEdit }) => {
  const [formData, setFormData] = useState({});
  const [fieldErrors, setFieldErrors] = useState({}); // Track validation states and messages

  useEffect(() => {
    if (isEdit) {

      setFormData(initialData);
    } else {
      
      const defaultFormData = fields.reduce((acc, field) => {
        acc[field.name] = field.type === 'select' ? field.options[0] : '';
        return acc;
      }, {});
      setFormData(defaultFormData);
    }
  }, [initialData, open, isEdit, fields]);

  const handleChange = (name, value, regex, errorMessage) => {
 //   setFormData((prev) => ({ ...prev, [name]: value }));

 setFormData((prev) => {
  const newFormData = { ...prev, [name]: value };
  setValue(newFormData, name, value);
  return newFormData;
});


    const isValid = regex ? new RegExp(regex).test(value) : true;
    setFieldErrors((prev) => ({ ...prev, [name]: isValid ? "" : errorMessage }));
  };

  const renderField = ({ name, label, type, options, regex, errorMessage }) => {
    console.log(formData);
    const error = fieldErrors[name];
    const commonProps = {
      key: name,
      label,
      fullWidth: true,
      value: getValue(formData, name) ?? '', // Fallback to empty string if undefined
      error: !!error, // Boolean: true if there's an error
      helperText: error, // Display custom error message
      onChange: (e) => handleChange(name, e.target.value, regex, errorMessage),
      //turn of auto fill
      autoComplete: 'off',

    };
    switch (type) {
      case 'text':
      case 'email':
      case 'password':
        console.log(formData);
        return <TextField {...commonProps} type={type} 
        autoComplete="nope-no-autofill"
      
        />;
      case 'select':
        return (
          <Autocomplete
            {...commonProps}
            options={options}
            getOptionLabel={(option) => option}
            value={formData[name] ?? options[0]} // Default to first option if no value
            onChange={(event, newValue) => {
              handleChange(name, newValue, regex, errorMessage);
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

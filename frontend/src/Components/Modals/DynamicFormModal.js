import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Autocomplete } from '@mui/material';

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
    setFormData((prev) => ({ ...prev, [name]: value }));
    const isValid = regex ? new RegExp(regex).test(value) : true;
    setFieldErrors((prev) => ({ ...prev, [name]: isValid ? "" : errorMessage }));
  };

  const renderField = ({ name, label, type, options, regex, errorMessage }) => {
    const error = fieldErrors[name];
    const commonProps = {
      key: name,
      label,
      fullWidth: true,
      value: formData[name] ?? '', // Fallback to empty string if undefined
      error: !!error, // Boolean: true if there's an error
      helperText: error, // Display custom error message
      onChange: (e) => handleChange(name, e.target.value, regex, errorMessage),
    };

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
        return <TextField {...commonProps} type={type} />;
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
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, p: 4, bgcolor: 'background.paper' }}>
        {fields.map(renderField)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DynamicFormModal;

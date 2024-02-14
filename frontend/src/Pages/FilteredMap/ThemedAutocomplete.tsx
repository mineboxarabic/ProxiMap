import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define a styled version of Autocomplete
const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
    '& .MuiInputBase-root': { // Targets the input area
        color: 'secondary.main', // Change to your desired color
      },



      '& .MuiOutlinedInput-notchedOutline': { // Targets the outline
        borderColor: 'secondary.main', // Change to your desired color
      },

      '& .MuiOutlinedInput-notchedOutline:hover': { // Targets the outline
        borderColor: 'red', // Change to your desired color
      },



      '& .MuiAutocomplete-popupIndicator': { // Targets the dropdown indicator
        color: 'secondary.main', // Change to your desired color
      },
      '& .MuiAutocomplete-clearIndicator': { // Targets the clear indicator
        color: 'secondary.main', // Change to your desired color
      },
  // Additional styles can be added here
}));

// Usage example
export const ThemedAutocomplete = ({
  options,
  onChange,
  value,
  getOptionLabel,
  getOptionDisabled
}: any) => {
  return (
    <CustomAutocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{
        // Additional sx props can still be applied
      }}
      onChange={onChange}
      getOptionDisabled={getOptionDisabled}
      value={value}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Country" 
         sx={{
            '& label': { // This targets the label
                color: 'secondary.main', // Change this to whatever color you want
              },
              '& label.Mui-focused': { // This targets the label when it is focused
                color: 'secondary.main', // Change this to whatever color you want
              },
              '& .MuiInputBase-root': {
                color: 'secondary.main', // default color
              },
              '& .Mui-focused .MuiInputBase-root': {
                color: 'secondary.main', // maintains color on focus
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main', // default border color
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main', // maintains border color on hover
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main', // maintains border color on focus
              },
              // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
              '& label': {
                color: 'secondary.main', // label color
              },
              '& .Mui-focused label': {
                color: 'secondary.main', // maintains label color on focus
              },
              '& .MuiAutocomplete-popupIndicator': { // Targets the dropdown indicator
                color: 'secondary.main', // Change to your desired color
              },
         }}
        />
      )}
    />
  );
};

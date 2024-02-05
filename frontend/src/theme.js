// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: '#329FB2',

    },
    dark:{
        main: '#303949',

    },
    
    light:{
        main: '#dfdfdf',
    },
    lighter:{
        main:'#4BC3D0'
    },
    veryLight:{
        main:'#91F1F6'
    },
    background: {
      default: '#1B262C',
    },
    ownService:{
        main:'#82E184'
    },
    //23A3B0, 94FFEB

   
  },

  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: 'white', // Keeps background white by default
            borderRadius: '5px',
            "&:before": {
              borderBottom: "none",
            },
            "&:hover:before": {
              borderBottom: "none",
            },
            "&:hover": {
              backgroundColor: 'white', // Keeps background white on hover
            },
            // Added this to ensure the background stays white after interaction
            "&.Mui-focused": {
              backgroundColor: 'white', // Ensure background stays white when focused
            },
            "&.MuiFilledInput-root:after": {
              // Ensure the underline or background doesn't change after interaction
              borderBottom: "none",
            },
          },
          '& .MuiInputLabel-root': {
            color: 'black',
          },
          '& .Mui-focused .MuiInputLabel-root': {
            color: 'black',
          },
        },
      },
    },
  },

});

export default theme;

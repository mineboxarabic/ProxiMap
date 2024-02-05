// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B262C',
    },
    secondary: {
        main: '#329FB2',
    },
    light:{
        main: '#329FB2',
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

    components: {
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            // Styles for the root element of Autocomplete
          },
          inputRoot: {
            // Override styles for the input root
            '&[class*="MuiOutlinedInput-root"]': {
              // Targeting the outlined variant of the input component
              padding: '2px', // Example style
              '& .MuiAutocomplete-input:first-child': {
                paddingLeft: '8px', // Adjust according to your needs
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main', // Use your theme's color
              },
            },
          },
          popupIndicator: {
            color: 'secondary.main', // Adjust popup indicator color
          },
          clearIndicator: {
            color: 'secondary.main', // Adjust clear indicator color
          },
          option: {
            // Styles for the option elements
            '&[data-focus="true"]': {
              backgroundColor: 'light.main', // Adjust for focused option
            },
            '&[aria-selected="true"]': {
              backgroundColor: 'lighter.main', // Adjust for selected option
            },
          },
        },
      },
    },
  
  
  }});

export default theme;

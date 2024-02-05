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
      MuiTextField: {
        variants: [
          {
            props: { variant: 'lightText' },
            style: ({ theme }) => ({
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.secondary.main, // Correct way to access theme colors
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.light.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.lighter.main,
                },
              },
            }),
          },
        ],
      },
    },
  
  
  }});

export default theme;

// src/theme.js

import { createTheme } from '@mui/material/styles';
declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    form: true;
  }
}
const theme = createTheme({
  palette: {
    primary: {
        main: '#329FB2',

    },


    // @ts-expect-error TS(2322): Type '{ primary: { main: string; }; dark: { main: ... Remove this comment to see the full error message
    dark:{
        main: '#303949',

    },

    bgForm:{
      main: '#425463',
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
            //Back ground color as light.main
            backgroundColor: '#dfdfdf',
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
    MuiCard:{
      variants:[
        {


          // @ts-expect-error TS(2322): Type '"form"' is not assignable to type '"outlined... Remove this comment to see the full error message
          props: {variant: 'form'},
          style:{
            padding: '20px',


          gap: '1rem',
          width: '70%',
          backgroundColor: '#425463',
          boxShadow: '2px 2px 4px 0px #11111c',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
            margin: 'auto',
            borderRadius: '5px',
            
          }
        }
      ],
      styleOverrides:{
        root:{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          width: '70%',
          backgroundColor: '#425463',
          boxShadow: '2px 2px 4px 0px #11111c',

        }

      }
    
    }
  },

});
export default theme;

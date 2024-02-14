import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.scss';
// @ts-expect-error TS(2307): Cannot find module './App' or its corresponding ty... Remove this comment to see the full error message
import App from './App';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// @ts-expect-error TS(2307): Cannot find module './Context/AuthProvider' or its... Remove this comment to see the full error message
import { AuthProvider } from './Context/AuthProvider';
// @ts-expect-error TS(2307): Cannot find module './Context/GeneralProvider' or ... Remove this comment to see the full error message
import { GeneralProvider } from './Context/GeneralProvider';

import theme from './theme';
import { ThemeProvider } from '@mui/material/styles'; // Correct import for MUI ThemeProvider

import {GlobalStyles} from '@mui/material';
// @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
 
      <AuthProvider>
        <GeneralProvider>
        <Routes>
          <Route path='/*' element={<App />}/>
        </Routes>
        </GeneralProvider>
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

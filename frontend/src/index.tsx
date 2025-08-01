import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.scss';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';

import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';

import { AuthProvider } from './Context/AuthProvider';
import { GeneralProvider } from './Context/GeneralProvider';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          <AuthProvider>
            <GeneralProvider>
              <Routes>
                <Route path='/*' element={<App />}/>
              </Routes>
            </GeneralProvider>
          </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

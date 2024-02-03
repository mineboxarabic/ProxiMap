import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.scss';
import App from './App';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { AuthProvider } from './Context/AuthProvider';
import { GeneralProvider } from './Context/GeneralProvider';

import theme from './theme';
import { ThemeProvider } from '@emotion/react';
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

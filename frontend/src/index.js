import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.scss';
import App from './App';

import Login from './Pages/User/Login';
import MainLayout from './Pages/MainLayout';
import Register from './Pages/User/Register';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AuthContext, { AuthProvider } from './Context/AuthProvider';
/*const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout/>,
    children: [
        {
          path: "/login",
          element: <AuthProvider><Login /></AuthProvider>,
        },
        {
          path: '/register',
          element: <Register />,
        }
      
    ]
  },
]);*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </React.StrictMode>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

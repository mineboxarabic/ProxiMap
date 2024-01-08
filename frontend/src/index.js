import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/index.scss';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Pages/User/Login';
import MainLayout from './Pages/MainLayout';
import Register from './Pages/User/Register';
const router = createBrowserRouter([

  {
    path: "/",
    element: <MainLayout/>,
    children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        }
      
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
    <App /> 
  </RouterProvider>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

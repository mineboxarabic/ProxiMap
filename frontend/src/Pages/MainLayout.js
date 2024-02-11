
import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

const MainLayout = () => {
    return (
        <Box  
            

            >
            <Header />
            <main

            className='App'>
            <Outlet 
            />

            </main>
            
        </Box>
    );
};

export default MainLayout;
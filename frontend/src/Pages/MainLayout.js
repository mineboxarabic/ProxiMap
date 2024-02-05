
import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

const MainLayout = () => {
    return (
        <Box  sx={{
            backgroundColor: '#1B262C',

        height: '93vh',
    }}>
            <Header />
            <Box
           
            className='App'>
            <Outlet />

            </Box>
            
        </Box>
    );
};

export default MainLayout;
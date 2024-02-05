
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
           sx={{
            backgroundColor: '#1B262C',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            padding: '0',
            margin: '0',
           }}
            className='App'>
            <Outlet />

            </Box>
            
        </Box>
    );
};

export default MainLayout;

import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

const MainLayout = () => {
    return (
        <Box  
            //Make the box the full height of the screen
            sx={{height: '100vh'}}
            backgroundColor='dark.main'

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
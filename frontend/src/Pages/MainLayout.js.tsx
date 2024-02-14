
import React from 'react';
// @ts-expect-error TS(2307): Cannot find module '../Components/Footer' or its c... Remove this comment to see the full error message
import Footer from '../Components/Footer';
// @ts-expect-error TS(2307): Cannot find module '../Components/Header' or its c... Remove this comment to see the full error message
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

const MainLayout = () => {
    return (
        // @ts-expect-error TS(2769): No overload matches this call.
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
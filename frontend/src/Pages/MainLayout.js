
import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <main>
            <Header />
            <main className='App'>
            <Outlet />

            </main>
            
        </main>
    );
};

export default MainLayout;
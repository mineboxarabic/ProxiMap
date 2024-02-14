import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
       
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor:"dark.main" }}>
                <Typography sx={{
                    color:"light.main"
                }} variant="h3" component="h1" gutterBottom>
                    Oops! Page Not Found
                </Typography>
                <Box
                    component="img"
                    sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="Not Found"
                    src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png" // Replace with your own image URL
                />
                <Typography  variant="body1" sx={{ mt: 2,  color:"light.main" }}>
                    The page you're looking for doesn't seem to exist.
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() => navigate('/')} // Adjust the navigation path as needed
                >
                    Go Back Home
                </Button>
            </Paper>
     
    );
};

export default NotFound;

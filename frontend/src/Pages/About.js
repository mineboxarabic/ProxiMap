import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const About = () => {
    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    About ProxiMap
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" paragraph>
                        ProxiMap is a cutting-edge platform designed to bridge the gap between local residents and service providers, facilitating seamless communication and service exchange. Built with the latest web technologies, ProxiMap offers an intuitive map-based interface for posting and finding services easily.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our mission is to create a vibrant community where users can effortlessly connect with service partners, find local offers, and contribute to the local economy. ProxiMap is more than just a service directory; it's a tool for fostering community engagement and support.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Key Features:
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Interactive Map Interface" secondary="A user-friendly map to visualize service offers and requests geographically." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Comprehensive Service Management" secondary="Easily post, manage, and browse services with detailed categories." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Secure User Accounts" secondary="Robust account management with OAuth for secure access and data protection." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Real-time Communication" secondary="Instant messaging and notifications to keep users connected." />
                        </ListItem>
                    </List>
                    <Typography variant="body1" paragraph>
                        ProxiMap is developed using a modern tech stack, including React, Node.js, Express.js, MongoDB, and MUI, ensuring a responsive and accessible experience across all devices.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default About;

import { Box, Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const LogIn = () =>
{   

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleClick = async ()=>{
        const res = await axios.post('http://localhost:3001/login', {
            email: email,
            password: password,
        }).then((response)=>{

    
            Cookies.set('accessToken', response.data.accessToken);
            Cookies.set('user', response.data.user);
    
    
    
        }).catch((err)=>{
            console.log(err);
            setError(err);
        })
    
        
        
    }

    
    return (
        <>
            <Container
                maxWidth={'lg'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <h1>Log In</h1>
            <Box 
            component="form" 
            sx={{ '& > :not(style)': {m:1, width: "120%" }, }}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}>

                <TextField onChange={(e)=>{
                    setEmail(e.target.value);
                }} id="outlined-basic" label="Email" variant="outlined" />
                <TextField onChange={(e)=>{
                    setPassword(e.target.value);
                }} id="outlined-basic" label="Password" variant="outlined" type='password'/>
                
                <Button onClick={handleClick} variant="contained">Log In</Button>
            </Box>
            </Container>
            </>
    );
}

export default LogIn;
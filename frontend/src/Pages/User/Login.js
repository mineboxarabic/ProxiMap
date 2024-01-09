import { Alert, Box, Button, Container, TextField } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../Style/Login.scss';
import useAuth from '../../Hooks/useAuth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
const LogIn = () =>
{
    //This ref is to get 
    const emailRef = useRef();
    const errorRef = useRef();

    const {auth,setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || { pathname: '/home' };


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() =>{
        setError('');
    }
    ,[email, password])


    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try
        {
            const response = await axios.post('http://localhost:3001/login',
                {
                    email: email,
                    password: password
                }
            );
            console.log(response.data);
            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;
            
            const userObj = JSON.parse(user);

            setAuth({token: accessToken, user:userObj})
            
            navigate(from, { replace: true });
        }
        catch (err)
        {
            if(!err?.response){
                setError('Something went wrong');
                return;
            }
            console.log(err.response.data.message);
            setError(err.response.data.message);
        }
    }

    
    return (
        <>


            <Container maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Alert severity="error" className={!error ?"offScreen" : "error"} ref={errorRef}>{error}</Alert>
                    <form>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            inputRef={errorRef}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default LogIn;
import { Alert, Box, Button, Checkbox, Container, TextField } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../Style/Login.scss';
import useAuth from '../../Hooks/useAuth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useLocalStorage  from '../../Hooks/useLocalStorage';
import { FormControlLabel, FormGroup } from '@mui/material';

const LogIn = () =>
{
    //This ref is to get 
    const emailRef = useRef();
    const errorRef = useRef();

    const {auth, setAuth} = useAuth();
    const [persist, setPersist] = useLocalStorage('persist', false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || { pathname: '/home' };


    const [email, setEmail] = useLocalStorage('email','');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() =>{
        setError('');
    }
    ,[email, password])

    useEffect(() => {
        console.log(`persist: ${persist}`);
    }, [persist])


    const togglePersist = () => {
        setPersist(!persist);
    }
    useEffect(() => { 
        localStorage.setItem('persist', persist);
    }, [persist])

    useEffect(() => {
        //if the user is already logged in go to back
        if(auth?.accessToken){
            navigate(from, { replace: true });
        }

    }, [auth])

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
 
        try
        {
            const response = await axios.post(process.env.REACT_APP_BASE_URL + 'login',
                {
                    email: email,
                    password: password
                },
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;
            


            setAuth({ accessToken, user})
            
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

                        {/*DO you trust this devise?*/}
                        <FormGroup>
                            <FormControlLabel control={<Checkbox
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={togglePersist}
                                defaultValue={persist}
                                checked={persist}
                            />} label="Remember me?" />
                        </FormGroup>


                    </form>
                </Box>
            </Container>
        </>
    )
}

export default LogIn;
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { USER_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from '../../Helpers/REGEXS';


const Register = () => {
    const userRef = useRef();
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        
     //   userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setError('');
    }, [user, password, confirmPassword, email]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page on submit
        if (!validName || !validEmail || !validPassword || !validConfirmPassword) {
            setError("Please ensure all fields are valid.");
            return;
        }
        try {
            const response = await axios.post('/register', JSON.stringify({ username: user, email, password }), {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);
            setSuccess(true);
        } catch (err) {
            console.log(err?.response?.data?.message);

            if (!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 409) {
                setError('Username Taken');
            } else {
                setError('Registration Failed');
            }
            if(err?.response?.data?.message){
                setError(err?.response?.data?.message)
            }
        }
    };

    return (
        <>
            {success ? (
                <Box  className="success">
                    <Typography color={'light.main'} variant="h1" component="h1" gutterBottom>Success!</Typography>
                    <Typography color={'light.main'} variant="p" component="p" gutterBottom>You have successfully registered!</Typography>

                    <a
                    style={{
                        "textDecoration": "none",
                        "color": "white"
                    }}
                    href="/login">
                    

                    Click here to login</a>
                </Box>
            ) : (
                <Box
                    sx={{ '& > :not(style)': { m: 1, width: '60%' }, }}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    {error && <Alert severity="error">{error}</Alert>}
                    <Typography color={'light.main'} variant="h4" component="h1" gutterBottom>Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            variant="filled"
                            required
                            fullWidth
                            margin="normal"
                            autoComplete="off"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            error={user && !validName}
                            helperText={user && !validName ? "Username must be between 4 and 30 characters long and can only contain letters, numbers, dashes, and underscores" : ""}
                            ref={userRef}
                        />
                        <TextField
                            label="Email"
                            variant="filled"
                            required
                            fullWidth
                            margin="normal"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={email && !validEmail}
                            helperText={email && !validEmail ? "Must be a valid email address" : ""}
                        />
                        <TextField
                            label="Password"
                            variant="filled"
                            required
                            fullWidth
                            margin="normal"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={password && !validPassword}
                            helperText={password && !validPassword ? "Password must be 8-24 characters and include at least 1 letter and 1 number" : ""}
                        />
                        <TextField
                            label="Confirm Password"
                            variant="filled"
                            required
                            fullWidth
                            margin="normal"
                            type="password"
                            autoComplete="off"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={confirmPassword && !validConfirmPassword}
                            helperText={confirmPassword && !validConfirmPassword ? "Passwords must match" : ""}
                        />
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!validName || !validEmail || !validPassword || !validConfirmPassword}>
                            Register
                        </Button>
                    </form>
                </Box>
            )}
        </>
    );
};

export default Register;

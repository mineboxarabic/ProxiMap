import {useRef, useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import '../../Style/Register.scss';
import axios from '../../api/axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,30}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const Register = () =>
{   

    const userRef = useRef();
    const errRef = useRef();
   
    //These are the states for the username
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    //These are the states for the password
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    //These are the states for the email
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    //This is the state for the confirm password
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);


    //This is the state for the error
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

   
    useEffect(()=>{
            //This will set the focus on the username input
           userRef.current.focus();
        }
           ,[])

    useEffect(()=>{
        //This use effect is to check if the username is valid
        const result = USER_REGEX.test(user);
        setValidName(result);
    }
    ,[user]);

    useEffect(()=>{
        //This use effect is to check if the password is valid
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }
    ,[password, confirmPassword]);




    useEffect(()=>{
        //This use effect is to check if the email is valid
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }
    ,[email]);


    useEffect(()=>{
        setError('');
    }
    ,[user, password, confirmPassword, email]);


    const handleSubmit = async ()=>{
        try{
            const res = await axios.post('/register', JSON.stringify({
                username: user,
                email: email,
                password: password,
            }), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            setSuccess(true);
            
            
            
        }catch(err){
            if(!err?.response){
                setError('Server Error');
                return;
            } else if(err.response.status === 409){
                setError('Email already in use');
                return;
            } else if(err.response.status === 400){
                setError('Invalid Input');
                return;
            } else if(err.response.status === 500){
                setError('Server Error');
                return;
            }
            
        }


    }

    return (
        <> {success ? <section className="success">
            <h1>Success!</h1>
            <p>You have successfully registered!</p>
            <p>Click <Link to="/login">here</Link> to login</p>
        </section>:

        <Box 
        sx={{ '& > :not(style)': {m:1, width: "60%" }, }}
        display={'flex'}
        flexDirection={'column'}

        alignItems={'center'}

        >

                <Alert severity="error" className={error? "errMSG": "offscreen"} >{error}</Alert>

                <Typography variant="h4" component="h1" gutterBottom> Register </Typography>
   
                <FormControl error={user && !validName}
                
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: !user ? 'grey' : !validName ? 'red' : 'green', 
                            },
                            '&:hover fieldset': {
                                borderColor: !user ? 'grey' : !validName  ? 'red' : 'green',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: !user ? 'grey' : !validName  ? 'red' : 'green',
                            },
                    
                        }
                    }}
                    variant="outlined">
                        <InputLabel htmlFor="username">
                            <span>Username </span>
                            <span className={validName ? "valid": "offscreen"}>
                                <FontAwesomeIcon icon={faCheck} /> 
                            </span>

                            <span className={!validName && userFocus ? "invalid": "offscreen"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            
                            </InputLabel>

                        <OutlinedInput
                            id="username"
                            ref={userRef}
                            value={user}
                            type='text'
                            autoComplete='off'
                            onChange={(e)=>{
                                setUser(e.target.value);
                            }}
                            required
                            onFocus={()=>{setUserFocus(true);}}
                            onBlur={()=>{setUserFocus(false);}}
                            label="Username"
                        />

                    <FormHelperText className={userFocus && user && !validName ? "instructions": "offscreen"} id="username-helper-text">Username must be between 4 and 30 characters long and can only contain letters, numbers, dashes, and underscores</FormHelperText>
                </FormControl>

                <FormControl error={email && !validEmail}
                
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: !email ? 'grey' : !validEmail ? 'red' : 'green', 
                            },
                            '&:hover fieldset': {
                                borderColor: !email ? 'grey' : !validEmail  ? 'red' : 'green',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: !email ? 'grey' : !validEmail  ? 'red' : 'green',
                            },
                    
                        }
                    }}
                    variant="outlined">
                        <InputLabel htmlFor="email">
                            <span>Email </span>
                            <span className={validEmail ? "valid": "offscreen"}>
                                <FontAwesomeIcon icon={faCheck} /> 
                            </span>

                            <span className={!validEmail && emailFocus ? "invalid": "offscreen"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            
                            </InputLabel>

                        <OutlinedInput
                            id="email"
                            value={email}
                            type='text'
                            autoComplete='off'
                            onChange={(e)=>{
                                setEmail(e.target.value);
                            }}
                            required
                            onFocus={()=>{setEmailFocus(true);}}
                            onBlur={()=>{setEmailFocus(false);}}
                            label="Email"
                        />

                    <FormHelperText className={emailFocus && email && !validEmail ? "instructions": "offscreen"} id="email-helper-text">Email must be a valid email address</FormHelperText>
                </FormControl>

                <FormControl error={password && !validPassword}
                
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: !password ? 'grey' : !validPassword ? 'red' : 'green', 
                            },
                            '&:hover fieldset': {
                                borderColor: !password ? 'grey' : !validPassword  ? 'red' : 'green',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: !password ? 'grey' : !validPassword  ? 'red' : 'green',
                            },
                    
                        }
                    }}
                    variant="outlined">
                        <InputLabel htmlFor="password">
                            <span>Password </span>
                            <span className={validPassword ? "valid": "offscreen"}>
                                <FontAwesomeIcon icon={faCheck} /> 
                            </span>

                            <span className={!validPassword && passwordFocus ? "invalid": "offscreen"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            
                            </InputLabel>

                        <OutlinedInput
                            id="password"
                            value={password}
                            type='password'
                            autoComplete='off'
                            onChange={(e)=>{
                                setPassword(e.target.value);
                            }}
                            required
                            onFocus={()=>{setPasswordFocus(true);}}
                            onBlur={()=>{setPasswordFocus(false);}}
                            label="Password"
                        />

                    <FormHelperText className={passwordFocus && password && !validPassword ? "instructions": "offscreen"} id="password-helper-text">Password must be between 8 and 24 characters long and contain at least one uppercase letter, one lowercase letter, and one number</FormHelperText>
                </FormControl>

                <FormControl error={confirmPassword && !validConfirmPassword}
                
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: !confirmPassword ? 'grey' : !validConfirmPassword ? 'red' : 'green', 
                            },
                            '&:hover fieldset': {
                                borderColor: !confirmPassword ? 'grey' : !validConfirmPassword  ? 'red' : 'green',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: !confirmPassword ? 'grey' : !validConfirmPassword  ? 'red' : 'green',
                            },
                    
                        }
                    }}
                    variant="outlined">
                        <InputLabel htmlFor="confirm-password">
                            <span>Confirm Password </span>
                            <span className={validConfirmPassword ? "valid": "offscreen"}>
                                <FontAwesomeIcon icon={faCheck} /> 
                            </span>

                            <span className={!validConfirmPassword && confirmPasswordFocus ? "invalid": "offscreen"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            
                            </InputLabel>

                        <OutlinedInput
                            id="confirm-password"
                            value={confirmPassword}
                            type='password'
                            autoComplete='off'
                            onChange={(e)=>{
                                setConfirmPassword(e.target.value);
                            }}
                            required
                            onFocus={()=>{setConfirmPasswordFocus(true);}}
                            onBlur={()=>{setConfirmPasswordFocus(false);}}
                            label="Confirm Password"
                        />

                    <FormHelperText className={confirmPasswordFocus && confirmPassword && !validConfirmPassword ? "instructions": "offscreen"} id="confirm-password-helper-text">Password must match</FormHelperText>
                </FormControl>

                <Button onClick={handleSubmit} type='submit' variant='contained' {
                    ...(!validName || !validEmail || !validPassword || !validConfirmPassword) && {disabled: true}
                } className='btn btn-primary'>Register</Button>
       

        </Box>
        } </>
   );
}

export default Register;
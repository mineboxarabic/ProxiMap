import express from 'express';
import dotenv from 'dotenv';
import authenticateUser, { generateToken } from '../Utilities/JWTUtil.js';
import bcrypt from 'bcrypt';
import UserDAO from '../DAO/UserDAO.js';
import User from '../Models/User.js';
import JWT from 'jsonwebtoken';
import TokenDAO from '../DAO/TokenDAO.js';
import LogIn from '../Controllers/Auth/Login.js';
import Register from '../Controllers/Auth/Register.js';
import RefreshToken from '../Controllers/Auth/RefreshToken.js';
import LogOut from '../Controllers/Auth/Logout.js';

dotenv.config();
const authenticationRouter = express.Router();

authenticationRouter.post('/login', LogIn);


authenticationRouter.post('/register', Register);

authenticationRouter.post('/refresh', RefreshToken)

authenticationRouter.post('/logout',authenticateUser, LogOut)

authenticationRouter.get('/cookie', async (req, res) => {
    console.log('cookies: ', req.cookies)
    res.status(200).json({
        cookies: req.cookies
    })
})

export default authenticationRouter;
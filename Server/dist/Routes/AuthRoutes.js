var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotenv from 'dotenv';
import authenticateUser, { generateToken } from '../Utilities/JWTUtil.js';
import bcrypt from 'bcrypt';
import UserDAO from '../DAO/UserDAO.js';
import JWT from 'jsonwebtoken';
import TokenDAO from '../DAO/TokenDAO.js';
import LogIn from '../Controllers/Auth/Login.js';
import Register from '../Controllers/Auth/Register.js';
import RefreshToken from '../Controllers/Auth/RefreshToken.js';
import LogOut from '../Controllers/Auth/Logout.js';
import UserDTO from '../DTO/User.js';
import DatabaseError from '../DAO/DataBaseError/DatabaseError.js';
dotenv.config();
const authenticationRouter = express.Router();
authenticationRouter.post('/login', LogIn);
authenticationRouter.post('/register', Register);
authenticationRouter.post('/refresh', RefreshToken);
authenticationRouter.post('/logout', authenticateUser, LogOut);
authenticationRouter.get('/cookie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('cookies: ', req.cookies);
    res.status(200).json({
        cookies: req.cookies
    });
}));
authenticationRouter.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract user data from request
    const userDAO = new UserDAO();
    const { email, password } = { email: 'mineboxarabic@gmail.com', password: 'Zaqwe123' };
    try {
        const user = yield userDAO.findByEmail(email);
        if (user instanceof DatabaseError) {
            return res.status(500).json({ message: "Something went wrong" });
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const validPassword = yield bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = generateToken(user);
        console.log(validPassword);
        const refreshToken = JWT.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });
        const tokenDAO = new TokenDAO();
        tokenDAO.create({ token: refreshToken, userId: user.id });
        const userDTO = new UserDTO(user.username, user.email, user.role);
        res.cookie("refreshToken", 'fa', {
            httpOnly: true,
        });
        res.cookie("testx", "testx", {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });
        return res.status(200).json({ message: "Logged in successfully 😊 👌", accessToken, refreshToken, user: JSON.stringify(userDTO.getUser()) });
    }
    catch (error) {
        // Handle errors
        return res.status(500).json({ message: "Something went wrong" });
    }
}));
export default authenticationRouter;

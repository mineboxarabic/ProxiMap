import express from 'express';
import dotenv from 'dotenv';
import { generateToken } from '../Utilities/JWTUtil.js';
import bcrypt from 'bcrypt';
import UserDAO from '../DAO/UserDAO.js';
import User from '../Models/User.js';

dotenv.config();
const authenticationRouter = express.Router();

authenticationRouter.post('/login', async (req, res) => {
    // Extract user data from request
    const userDAO = new UserDAO();
    const { email, password } = req.body;

    try {
        
        // Find user in database
        const user = await userDAO.findByEmail(email)        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const validPassword = bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken = generateToken(user);
        console.log('generatinngg')

        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: '7d' });

        // Send response
        return res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌", accessToken, refreshToken });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: "Something went wrong" });
    }
});


authenticationRouter.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userDAO = new UserDAO();
        const user = await userDAO.create({ username, password: hashedPassword, email });
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }  
}
);

export default authenticationRouter;
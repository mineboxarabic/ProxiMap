var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import TokenDAO from "../../DAO/TokenDAO.js";
import UserDAO from "../../DAO/UserDAO.js";
import UserDTO from "../../DTO/User.js";
import { generateToken } from "../../Utilities/JWTUtil.js";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";
const LogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract user data from request
    const userDAO = new UserDAO();
    const { email, password } = req.body;
    try {
        const user = yield userDAO.findByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const validPassword = yield bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const accessToken = generateToken(user);
        console.log(validPassword);
        const refreshToken = JWT.sign({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profile: user.profile
        }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });
        const tokenDAO = new TokenDAO();
        tokenDAO.create({ token: refreshToken, userId: user._id });
        const userDTO = new UserDTO(user.username, user.email, user.role);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        return res.status(200).json({ success: true, message: "Logged in successfully 😊 👌", accessToken, refreshToken, user });
    }
    catch (error) {
        // Handle errors
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
});
export default LogIn;

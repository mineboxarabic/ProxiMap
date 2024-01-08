import TokenDAO from "../../DAO/TokenDAO.js";
import UserDAO from "../../DAO/UserDAO.js";
import UserDTO from "../../DTO/User.js";
import { generateToken } from "../../Utilities/JWTUtil.js";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";

const LogIn = async (req, res) => {
    // Extract user data from request
    const userDAO = new UserDAO();
    const { email, password } = req.body;

    try {
        const user = await userDAO.findByEmail(email)        
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        console.log(validPassword);
        if(!validPassword){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateToken(user);

        const tokenDAO = new TokenDAO();
        tokenDAO.create({ token: accessToken, userId: user._id });

        const refreshToken = JWT.sign({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
        
      
        const userDTO = new UserDTO(user.username, user.email, user.role);

        return res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        }).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌", accessToken, refreshToken,user:JSON.stringify(userDTO.getUser()) });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default LogIn;
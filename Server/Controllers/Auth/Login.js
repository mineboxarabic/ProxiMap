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
        if(!validPassword){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateToken(user);
        console.log(validPassword);


        const refreshToken = JWT.sign({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
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







        return res.status(200).json({ message: "Logged in successfully 😊 👌", accessToken,refreshToken,user:userDTO.getUser() });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default LogIn;
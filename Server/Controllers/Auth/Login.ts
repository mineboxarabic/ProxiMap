import TokenDAO from "../../DAO/TokenDAO.js";
import UserDAO, { UserResult } from "../../DAO/UserDAO.js";
import UserDTO from "../../DTO/User.js";
import { generateToken } from "../../Utilities/JWTUtil.js";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";
import { UserInterface } from "../../Models/User.js";


const LogIn = async (req: any, res: any) => {
    // Extract user data from request
    const userDAO = new UserDAO();
    const { email, password } = req.body;

    try {
        const user : UserInterface = await userDAO.findByEmail(email) as UserInterface;
        if (!user) {
            return res.status(401).json({success:false, message: "Invalid credentials" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(401).json({success:false, message: "Invalid credentials" });
        }

        const accessToken = generateToken(user);
        console.log(validPassword);


        const refreshToken = JWT.sign({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profile: user.profile
        }, process.env.REFRESH_TOKEN!, { expiresIn: '1d' });
        
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







        return res.status(200).json({success:true, message: "Logged in successfully 😊 👌", accessToken,refreshToken,user });
    } catch (error) {
        // Handle errors
        return res.status(500).json({success:false, message: "Something went wrong" });
    }
}

export default LogIn;
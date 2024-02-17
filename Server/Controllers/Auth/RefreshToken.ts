import TokenDAO from "../../DAO/TokenDAO.js";
import UserDAO from "../../DAO/UserDAO.js";
import { generateToken } from "../../Utilities/JWTUtil.js";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'json... Remove this comment to see the full error message
import JWT from "jsonwebtoken";

const RefreshToken = async (req: any, res: any) => {
    const cookie = req.cookies;
    console.log('cookie',cookie);
    //If there is no refresh token, return 401

    if (!cookie?.refreshToken) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    const refreshToken = cookie?.refreshToken;


    try{
    const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN, (err: any, decoded: any) => {
        if (err) {
           throw new Error("Invalid token");
        }
        return decoded;
    });

    const newAccessToken = generateToken(decoded);

    
    const tokenDAO = new TokenDAO();
    tokenDAO.create({ token: newAccessToken, userId: decoded._id });

    const userDAO = new UserDAO();
    const user = await userDAO.findById(decoded._id);

    return res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    }).status(200).json({ message: "Token refreshed successfully" , accessToken: newAccessToken, user: user});


}catch(error){
    return res.status(401).json({ message: "You are not authenticated" });
}







}

export default RefreshToken;
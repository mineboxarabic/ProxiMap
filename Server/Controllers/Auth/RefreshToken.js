import TokenDAO from "../../DAO/TokenDAO.js";
import { generateToken } from "../../Utilities/JWTUtil.js";
import JWT from "jsonwebtoken";

const RefreshToken = async (req, res) => {
    const cookie = req.cookies;
    console.log('cookie',req.cookies);
    if (!cookie?.refreshToken) return res.status(401).json({ message: "You are not authenticated" });

    const refreshToken = cookie?.refreshToken;


    try{
    const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
        if (err) {
           throw new Error("Invalid token");
        }
        return decoded;
    });

    const newAccessToken = generateToken(decoded);

    
    const tokenDAO = new TokenDAO();
    tokenDAO.create({ token: newAccessToken, userId: decoded._id });

    return res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    }).status(200).json({ message: "Token refreshed successfully" , accessToken: newAccessToken, user: decoded});


}catch(error){
    return res.status(401).json({ message: "You are not authenticated" });
}







}

export default RefreshToken;
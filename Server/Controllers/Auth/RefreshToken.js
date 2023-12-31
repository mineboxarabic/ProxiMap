import TokenDAO from "../../DAO/TokenDAO.js";
import { generateToken } from "../../Utilities/JWTUtil.js";
import JWT from "jsonwebtoken";

const RefreshToken = async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie?.refreshToken) return res.status(401).json({ message: "You are not authenticated" });

    const refreshToken = cookie.refreshToken;



    const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (!decoded) {
        return res.status(403).json({ message: "Refresh token is not valid" });
    }

    const newAccessToken = generateToken(decoded);

    tokenDAO.create({ token: newAccessToken, userId: decoded._id });

    return res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    }).status(200).json({ message: "Token refreshed successfully" });






}

export default RefreshToken;
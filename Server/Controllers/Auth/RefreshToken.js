import TokenDAO from "../../DAO/TokenDAO.js";
import { generateToken } from "../../Utilities/JWTUtil.js";
import JWT from "jsonwebtoken";

const RefreshToken = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    const tokenDAO = new TokenDAO();
    const token = await tokenDAO.findByToken(accessToken);
    if (!token) {
        return res.status(403).json({ message: "Refresh token is not valid" });
    }

    try {
        const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN);
        const accessToken = generateToken(decoded);
        return res.status(200).json({ accessToken });
    } catch (error) {
        return res.status(401).json({ message: "You are not authenticated" });
    }
}

export default RefreshToken;
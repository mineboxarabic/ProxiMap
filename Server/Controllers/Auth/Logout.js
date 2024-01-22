import TokenDAO from "../../DAO/TokenDAO.js";
import JWT from "jsonwebtoken";
const LogOut = async (req, res) => {

    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({success:false, message: "You are not authenticated" });
    }
    const user = JWT.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (!refreshToken) {
        return res.status(401).json({success:false, message: "You are not authenticated" });
    }
    const tokenDAO = new TokenDAO();
    //const tokens = await tokenDAO.findByUserIdAndToken(accessToken, user._id);
    const deleted = await tokenDAO.deleteByUserId(user._id);
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");    

        return res.status(200).json({success:true, message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

}

export default LogOut;
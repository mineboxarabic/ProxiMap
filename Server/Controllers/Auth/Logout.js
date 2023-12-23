import TokenDAO from "../../DAO/TokenDAO.js";

const LogOut = async (req, res) => {

    const accessToken = req.cookies.accessToken;
    const user = req.user;
    if (!accessToken) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    const tokenDAO = new TokenDAO();
    const tokens = await tokenDAO.findByUserIdAndToken(accessToken, user._id);
    console.log(tokens);
    if (tokens.length === 0) {
        return res.status(403).json({ message: "Refresh token is not valid" });
    }

    try {
        const deleted = await tokenDAO.deleteByUserId(tokens[0].userId);

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }

}

export default LogOut;
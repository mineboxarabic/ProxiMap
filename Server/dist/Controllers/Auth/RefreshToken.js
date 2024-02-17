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
import { generateToken } from "../../Utilities/JWTUtil.js";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'json... Remove this comment to see the full error message
import JWT from "jsonwebtoken";
const RefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies;
    console.log('cookie', cookie);
    //If there is no refresh token, return 401
    if (!(cookie === null || cookie === void 0 ? void 0 : cookie.refreshToken)) {
        return res.status(401).json({ message: "You are not authenticated" });
    }
    const refreshToken = cookie === null || cookie === void 0 ? void 0 : cookie.refreshToken;
    try {
        const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                throw new Error("Invalid token");
            }
            return decoded;
        });
        const newAccessToken = generateToken(decoded);
        const tokenDAO = new TokenDAO();
        tokenDAO.create({ token: newAccessToken, userId: decoded._id });
        const userDAO = new UserDAO();
        const user = yield userDAO.findById(decoded._id);
        return res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        }).status(200).json({ message: "Token refreshed successfully", accessToken: newAccessToken, user: user });
    }
    catch (error) {
        return res.status(401).json({ message: "You are not authenticated" });
    }
});
export default RefreshToken;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import TokenDAO from "../DAO/TokenDAO.js";
dotenv.config();
//Verify if the token is valid and not expired
const verifyToken = (token) => {
    return JWT.verify(token, process.env.ACCESS_TOKEN);
};
//Generate a new token
export const generateToken = (user) => {
    return JWT.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
};
//Generate a new refresh token
export const refreshToken = (token) => {
    const decoded = JWT.verify(token, process.env.REFRESH_TOKEN);
    return JWT.sign({
        _id: decoded._id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role
    }, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
};
//Verify if the user is authenticated by checking the token of the user
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    const refreshToken = (_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
    if (!accessToken && !refreshToken) {
        return res.status(403).json({ message: 'You are not authenticated' });
    }
    const user = JWT.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (!user) {
        return res.status(403).json({ message: 'Refresh token is not valid' });
    }
    try {
        const decoded = verifyToken(accessToken);
        req.user = decoded;
        next();
    }
    catch (err) {
        // Check if the error is due to token expiry and you have a refresh token
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (err.name == 'TokenExpiredError') {
            try {
                console.log("It's finished");
                const cookies = req.cookies;
                const newToken = JWT.sign({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
                const tokenDAO = new TokenDAO();
                tokenDAO.create({ token: newToken, userId: user._id });
                res.cookie('accessToken', newToken, { httpOnly: true }); // Set new token
                next();
            }
            catch (refreshErr) {
                // If refresh fails, force re-login
                return res.status(403).json({ message: 'Token expired, please log in again' });
            }
        }
        else {
            // For other token errors
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
});
export const autherizeUserRole = (req, res, next, allowedRoles) => {
    var _a;
    const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    const user = JWT.verify(refreshToken, process.env.REFRESH_TOKEN);
    const userRole = user.role;
    if (allowedRoles.includes(userRole)) {
        next();
    }
    else {
        return res.status(403).json({ message: "You are not allowed to access this resource" + 'The allowed roles are: ' + allowedRoles.join(',') });
    }
};
export default authenticateUser;

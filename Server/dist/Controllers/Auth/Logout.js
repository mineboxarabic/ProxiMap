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
// @ts-expect-error TS(7016): Could not find a declaration file for module 'json... Remove this comment to see the full error message
import JWT from "jsonwebtoken";
const LogOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "You are not authenticated" });
    }
    const user = JWT.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "You are not authenticated" });
    }
    const tokenDAO = new TokenDAO();
    //const tokens = await tokenDAO.findByUserIdAndToken(accessToken, user._id);
    const deleted = yield tokenDAO.deleteByUserId(user._id);
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
});
export default LogOut;

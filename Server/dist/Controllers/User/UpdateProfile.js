var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserDAO from "../../DAO/UserDAO.js";
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDAO = new UserDAO();
    const id = req.params.id;
    const file = req.file;
    if (!file) {
        return res.status(400).json({
            success: false,
            message: "Please upload a file"
        });
    }
    const fileName = file.filename;
    const avatarUrl = `${req.protocol}://${req.get('host')}/Assets/profile/${fileName}`;
    const user = yield userDAO.updateAvatar(id, avatarUrl);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        avatarUrl // Send back the URL of the updated avatar
    });
});
export default updateAvatar;

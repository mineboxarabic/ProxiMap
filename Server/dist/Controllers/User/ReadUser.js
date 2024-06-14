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
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDAO = new UserDAO();
    const id = req.params.id;
    const user = yield userDAO.findById(id);
    res.status(200).json({
        success: true,
        message: "User found successfully",
        user
    });
});
export default readUser;
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
// @ts-expect-error TS(7016): Could not find a declaration file for module 'bcry... Remove this comment to see the full error message
import bcrypt from 'bcrypt';
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO:Create a function to check if the user is valid or not
    console.log('user', req.body);
    const userDAO = new UserDAO();
    const user = req.body;
    //Hash the password
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const newUser = yield userDAO.create(user);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser
    });
    return;
});
export default createUser;

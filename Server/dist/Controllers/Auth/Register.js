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
import bcrypt from 'bcrypt';
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const userDAO = new UserDAO();
        const user = yield userDAO.create({ username, password: hashedPassword, email });
        // @ts-expect-error TS(2339): Property 'error' does not exist on type '(Document... Remove this comment to see the full error message
        if (user.error) {
            //If the error is that the email is already in use
            // @ts-expect-error TS(2339): Property 'error' does not exist on type '(Document... Remove this comment to see the full error message
            if (user.error.code === 11000) {
                res.status(409).json({ message: "Email already in use" });
                return;
            }
            // @ts-expect-error TS(2339): Property 'error' does not exist on type '(Document... Remove this comment to see the full error message
            res.status(400).json({ message: user.error.message });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        res.status(500).json({ message: err.message });
    }
});
export default Register;

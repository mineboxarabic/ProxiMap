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
const emailValidator = {
    isEmail: true,
    errorMessage: "Invalid email format",
    trim: true,
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const userDAO = new UserDAO();
            const user = yield userDAO.findByEmail(value);
            const requestMethod = req.method;
            if (requestMethod === "POST") {
                if (user) {
                    throw new Error("Email already exists");
                }
            }
            else if (requestMethod === "PUT") {
                const idFromFoundUser = user && user._id.toString();
                const idFromRequest = req.params.id;
                if (user) {
                    if (idFromFoundUser !== idFromRequest) {
                        throw new Error("Email already exists");
                    }
                }
            }
            return true;
        }),
        errorMessage: "Email already exists"
    }
};
export default emailValidator;

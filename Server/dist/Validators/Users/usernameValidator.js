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
const usernameValidator = {
    isString: true,
    notEmpty: true,
    errorMessage: "Username is required",
    trim: true,
    isLength: {
        options: { min: 3, max: 50 },
        errorMessage: "Username must be of 3 to 50 characters long"
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const userDAO = new UserDAO();
            const user = yield userDAO.findByUserName(value);
            const requestType = req.method;
            if (requestType === "POST") {
                if (user) {
                    throw new Error("Username already exists");
                }
            }
            else if (requestType === "PUT") {
                // const idFromFoundUser = user && user._id.toString();
                const idFromRequest = req.params.id;
                const idFromFoundUser = yield userDAO.exists(idFromRequest);
                console.log('idFromFoundUser2', idFromFoundUser);
                if (!idFromFoundUser && idFromRequest) {
                    throw new Error("Username already exists");
                }
                /*if(user){
                    if(idFromFoundUser !== idFromRequest){
                        throw new Error("Username already exists");
                    }
                }*/
            }
            return true;
        }),
        errorMessage: "Username already exists",
        statusCode: 409
    }
};
export default usernameValidator;

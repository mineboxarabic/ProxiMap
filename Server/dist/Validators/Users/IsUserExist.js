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
import { checkSchema } from "express-validator";
const isUserExist = checkSchema({
    id: {
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid id"
        },
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const userDAO = new UserDAO();
                const user = yield userDAO.findById(value);
                // @ts-expect-error TS(2531): Object is possibly 'null'.
                if (!user && value !== user._id.toString()) {
                    throw new Error("User not found");
                }
                return true;
            }),
            errorMessage: "User not found"
        },
        errorMessage: "Invalid id"
    }
});
export default isUserExist;

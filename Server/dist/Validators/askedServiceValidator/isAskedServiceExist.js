var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import { checkSchema } from "express-validator";
const isAskedServiceExist = checkSchema({
    id: {
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid id"
        },
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const askedServiceDAO = new AskedServiceDAO();
                const askedService = yield askedServiceDAO.exists(value);
                if (!askedService)
                    return Promise.reject();
                return true;
            }),
            errorMessage: "AskedService not found"
        },
        errorMessage: "Invalid id"
    }
});
export default isAskedServiceExist;

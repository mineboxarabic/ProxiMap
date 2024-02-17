import { checkSchema } from "express-validator";
const checkService = checkSchema({
    token: {
        isString: {
            errorMessage: "Token must be a string"
        }
    },
    userId: {
        isMongoId: {
            errorMessage: "User ID must be a mongoID"
        }
    }
});
export default checkService;

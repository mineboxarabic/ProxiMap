import { decrypt } from "dotenv";
import UserDAO from "../../DAO/UserDAO.js";
import { checkSchema } from "express-validator";

const isUserExist = checkSchema({
    id:{
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid id"
        },
        custom: {
            options: async (value) => {
                
                const userDAO = new UserDAO();
                const user = await userDAO.findById(value);

                // @ts-expect-error TS(2531): Object is possibly 'null'.
                if(!user && value !== user._id.toString()){
                    throw new Error("User not found");
                }

                return true;
            },
            errorMessage: "User not found"
        },
        errorMessage: "Invalid id"


    }
})

export default isUserExist;
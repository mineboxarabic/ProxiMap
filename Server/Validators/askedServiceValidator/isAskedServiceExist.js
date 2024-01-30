import { decrypt } from "dotenv";
import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import { checkSchema } from "express-validator";

const isAskedServiceExist = checkSchema({
    id:{
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid id"
        },
        custom: {
            options: async (value) => {
                
                const askedServiceDAO = new AskedServiceDAO();
                const askedService = await askedServiceDAO.findById(value);

                if(!askedService && value !== askedService._id.toString()){
                    throw new Error("AskedService not found");
                }

                return true;
            },
            errorMessage: "AskedService not found"
        },
        errorMessage: "Invalid id"


    }
})

export default isAskedServiceExist;
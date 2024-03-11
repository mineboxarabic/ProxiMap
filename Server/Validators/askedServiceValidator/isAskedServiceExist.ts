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
                const askedService = await askedServiceDAO.exists(value);

                if(!askedService) return Promise.reject();
                

                return true;
            },
            errorMessage: "AskedService not found"
        },
        errorMessage: "Invalid id"


    }
})

export default isAskedServiceExist;
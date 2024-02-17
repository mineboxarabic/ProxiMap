import { decrypt } from "dotenv";
import CategoryDAO from "../../DAO/CategoryDAO.js";
import { checkSchema } from "express-validator";

const isCategoryExist = checkSchema({
    id:{
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid id"
        },
        custom: {
            options: async (value) => {
                
                const categoryDAO = new CategoryDAO();
                const category = await categoryDAO.findById(value);

                // @ts-expect-error TS(2531): Object is possibly 'null'.
                if(!category && value !== category._id.toString()){
                    throw new Error("Category not found");
                }

                return true;
            },
            errorMessage: "Category not found"
        },
        errorMessage: "Invalid id"


    }
})

export default isCategoryExist;
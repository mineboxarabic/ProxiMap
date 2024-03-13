import { checkSchema } from "express-validator";
import MessageDAO from "../../DAO/MessageDAO.js";

const isMessageExist = checkSchema({
    id:{
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid id"
        },
        custom: {
            options: async (value) => {
                
                const messageDAO = new MessageDAO();
                const message = await messageDAO.exists(value);

                if(!message){
                    throw new Error("message not found");
                }

                return true;
            },
            errorMessage: "message not found"
        },
        errorMessage: "Invalid id"


    }
})

export default isMessageExist;
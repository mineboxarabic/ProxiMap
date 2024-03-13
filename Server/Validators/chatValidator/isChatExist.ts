import { decrypt } from "dotenv";

import { checkSchema } from "express-validator";
import ChatDAO from "../../DAO/ChatDAO.js";

const isChatExist = checkSchema({
    id:{
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid id"
        },
        custom: {
            options: async (value) => {
                
                const chatDAO = new ChatDAO();
                const chat = await chatDAO.exists(value);

                if(!chat){
                    throw new Error("chat not found");
                }

                return true;
            },
            errorMessage: "chat not found"
        },
        errorMessage: "Invalid id"


    }
})

export default isChatExist;
import { decrypt } from "dotenv";
import ServiceDAO from "../../DAO/ServiceDAO.js";
import { checkSchema } from "express-validator";

const isServiceExist = checkSchema({
    id:{
        in: ['params'],
        isMongoId: {
            errorMessage: "Invalid id"
        },
        custom: {
            options: async (value) => {
                
                const serviceDAO = new ServiceDAO();
                const service = await serviceDAO.exists(value);

                if(!service){
                    throw new Error("Service not found");
                }

                /*if(!service && value !== service._id.toString()){
                    throw new Error("Service not found");
                }
*/

                return true;
            },
            errorMessage: "Service not found"
        },
        errorMessage: "Invalid id"


    }
})

export default isServiceExist;
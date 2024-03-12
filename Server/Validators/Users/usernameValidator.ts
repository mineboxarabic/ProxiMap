import UserDAO from "../../DAO/UserDAO.js";
import { UserInterface } from "../../Models/User.js";

const usernameValidator = {
        isString: true,
        notEmpty: true,
        errorMessage: "Username is required",
        trim: true,
        isLength:{
            options: {min:3,max:50},
            errorMessage: "Username must be of 3 to 50 characters long"
        },
        custom: 
        {
            options:async (value: any, {
                req
            }: any) => {
                const userDAO = new UserDAO();
                const user: UserInterface = await userDAO.findByUserName(value) as UserInterface;

                const requestType = req.method;

                if(requestType === "POST"){
                    if(user){
                        throw new Error("Username already exists");
                    }
                }
                else if(requestType === "PUT"){
                    if(user){
                        const idFromFoundUser = user && user._id.toString();
                        const idFromRequest = req.params.id;
                        if(idFromFoundUser !== idFromRequest){
                            throw new Error("Username already exists");
                        }
                    }
                }

                return true;
            },
            errorMessage: "Username already exists",
            statusCode: 409
        }
    }
export default usernameValidator;
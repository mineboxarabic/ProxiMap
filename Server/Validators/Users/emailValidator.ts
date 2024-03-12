import  UserDAO, { UserResult }  from "../../DAO/UserDAO.js";
import { UserInterface } from "../../Models/User.js";


const emailValidator = {
    isEmail: true,
        errorMessage: "Invalid email format",
        trim: true,
        custom: {
            options:async (value: any, {
                req
            }: any) => {

                const userDAO = new UserDAO();
                
       
                const user: UserInterface = await userDAO.findByEmail(value) as UserInterface;

                const requestMethod = req.method;

                if(requestMethod === "POST"){
                    if(user){
                        throw new Error("Email already exists");
                    }
                }
                else if(requestMethod === "PUT"){
                    if(user){
                        const idFromFoundUser = user && user._id.toString();
                        const idFromRequest = req.params.id;
                        if(idFromFoundUser !== idFromRequest){
                            throw new Error("Email already exists");
                        }
                    }
                }


                return true;
            },
            errorMessage: "Email already exists"
        }
    

}
export default emailValidator;
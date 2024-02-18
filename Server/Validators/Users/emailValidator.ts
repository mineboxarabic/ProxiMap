import  UserDAO  from "../../DAO/UserDAO.js";


const emailValidator = {
    isEmail: true,
        errorMessage: "Invalid email format",
        trim: true,
        custom: {
            options:async (value: any, {
                req
            }: any) => {
                const userDAO = new UserDAO();
                const user = await userDAO.findByEmail(value);

                const requestMethod = req.method;

                if(requestMethod === "POST"){
                    if(user){
                        throw new Error("Email already exists");
                    }
                }
                else if(requestMethod === "PUT"){
                    const idFromFoundUser = userDAO.exists(value);
                    const idFromRequest = req.params.id;
                    if(user){
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
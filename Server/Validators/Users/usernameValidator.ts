import UserDAO from "../../DAO/UserDAO.js";

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
                const user = await userDAO.findByUserName(value);

                const requestType = req.method;

                if(requestType === "POST"){
                    if(user){
                        throw new Error("Username already exists");
                    }
                }
                else if(requestType === "PUT"){
                   // const idFromFoundUser = user && user._id.toString();
                    const idFromRequest = req.params.id;
    
                    const idFromFoundUser = await userDAO.exists(idFromRequest)
                    console.log('idFromFoundUser2', idFromFoundUser);


                    if(!idFromFoundUser && idFromRequest){
                        throw new Error("Username already exists");
                    }
                    /*if(user){
                        if(idFromFoundUser !== idFromRequest){
                            throw new Error("Username already exists");
                        }
                    }*/
                }

                return true;
            },
            errorMessage: "Username already exists",
            statusCode: 409
        }
    }
export default usernameValidator;
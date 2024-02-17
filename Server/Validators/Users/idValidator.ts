import  UserDAO  from "../../DAO/UserDAO.js";

const idValidator = {
    in: ['params'],
    isMongoId: {
        errorMessage: "Invalid id"
    },
    custom: {
        options: async (value: any) => {
            const userDAO = new UserDAO();
            const user = await userDAO.findById(value);


            // @ts-expect-error TS(2531): Object is possibly 'null'.
            if(!user && value !== user._id.toString()){
                throw new Error("User not found");
            }

            return true;
        },
        errorMessage: "User not found"
    },
}

export default idValidator;
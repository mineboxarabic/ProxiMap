import { checkSchema } from "express-validator";
import UserDAO from "../DAO/UserDAO.js";
/*    name: String,
    description: String */
const categoryValidator = checkSchema({
    name: {
        isString: true,
        notEmpty: true,
        errorMessage: "Name is required",
        trim: true,
        isLength:{
            options: {min:2,max:100},
            errorMessage: "Name must be of 2 to 100 characters long"
        }
    
    },
    description: {
        isString: true,
        notEmpty: true,
        errorMessage: "Description is required",
        trim: true,
        isLength:{
            options: {min:2,max:1500},
            errorMessage: "Description must be of 2 to 1500 characters long"
        }
    
    }
});

export const categoryValidatorEdit = checkSchema({
    name: {
        optional: true,
        isString: true,
        notEmpty: true,
        errorMessage: "Name is required",
        trim: true,
        isLength:{
            options: {min:2,max:100},
            errorMessage: "Name must be of 2 to 100 characters long"
        }
    
    },
    description: {
        optional: true,
        isString: true,
        notEmpty: true,
        errorMessage: "Description is required",
        trim: true,
        isLength:{
            options: {min:2,max:1500},
            errorMessage: "Description must be of 2 to 1500 characters long"
        }
    
    }
});
export default categoryValidator;
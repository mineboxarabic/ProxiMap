import { checkSchema } from "express-validator";
import UserDAO from "../DAO/UserDAO.js";

const serviceValidator = checkSchema({
    partnerId: {
        isMongoId: {

            errorMessage: "partnerid must be a valid mongoId",
        },
        errorMessage: "Invalid partnerId",
        trim: true,
        custom:{
            options: async (value, {req}) => {
                const userDAO = new UserDAO();
                const user = await userDAO.findById(value);
                if(!user){
                    throw new Error("Partner does not exist");
                }
                return true;

        },
        errorMessage: "Partner does not exist"  
        }      
    },
    categoryId: {
        isMongoId: {

            errorMessage: "category must be a valid mongoId",
        },
        errorMessage: "Invalid categoryId",
        trim: true
    },
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
    
    },
    price: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: "Price is required",
        trim: true,
        isLength:{
            options: {min:2,max:50},
            errorMessage: "Price must be of 2 to 50 characters long"
        }
    
    },
    availability: {
        isBoolean: true,
        errorMessage: "Availability must be a boolean",
        trim: true
    },
    ratings: {
        isMongoId: {

            errorMessage: "Must be a valid mongoId",
        },
        errorMessage: "Invalid ratings",
        trim: true
    },
    position: {
        isObject: true,
        errorMessage: "Position must be an object",
        trim: true
    },
    range: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: "Range is required",
        trim: true,
        isLength:{
            options: {min:1,max:9999},
            errorMessage: "Range must be of 2 to 9999 characters long"
        }
    
    }
});

export const serviceValidatorEdit = checkSchema({
    partnerId: {
        optional: true,
        isMongoId: {

            errorMessage: "partnerid must be a valid mongoId",
        },
        errorMessage: "Invalid partnerId",
        trim: true,
        custom:{
            options: async (value, {req}) => {
                const userDAO = new UserDAO();
                const user = await userDAO.findById(value);
                if(!user){
                    throw new Error("Partner does not exist");
                }
                return true;

        },
        errorMessage: "Partner does not exist"  
        }      
    },
    categoryId: {
        optional: true,

        isMongoId: {

            errorMessage: "category must be a valid mongoId",
        },
        errorMessage: "Invalid categoryId",
        trim: true
    },
    name: {
        optional: true,

        isString: true,
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
    
    },
    price: {
        optional: true,

        isNumeric: true,
        notEmpty: true,
        errorMessage: "Price is required",
        trim: true,
        isLength:{
            options: {min:2,max:50},
            errorMessage: "Price must be of 2 to 50 characters long"
        }
    
    },
    availability: {
        optional: true,

        isBoolean: true,
        errorMessage: "Availability must be a boolean",
        trim: true
    },
    ratings: {
        optional: true,

        isMongoId: {

            errorMessage: "Must be a valid mongoId",
        },
        errorMessage: "Invalid ratings",
        trim: true
    },
    range: {
        optional: true,
        isNumeric: true,
        notEmpty: true,
        errorMessage: "Range is required",
        trim: true,
        isLength:{
            options: {min:1,max:9999},
            errorMessage: "Range must be of 2 to 9999 characters long"
        }
    
    }
});
export default serviceValidator;
//{ PartnerId: '60c9e9e0c1a5b3a0a4b7d8b9', CategoryId: '60c9e9e0c1a5b3a0a4b7d8b9', Name: 'Service 1', Description: 'Service 1 description', Price: '100', Availability: 'true', Ratings: '5'}
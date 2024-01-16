import { checkSchema } from "express-validator";
import usernameValidator from "./Users/userNameValidator.js";
import emailValidator from "./Users/emailValidator.js";
const userValidator = checkSchema({
    username: usernameValidator
    ,
    email: emailValidator,
    role: {
        isIn: {
            options: [['Admin', 'User', 'Partner', 'Manager', 'Staff']],
            errorMessage: "Invalid role"
        }
    
    },
    password: {
        isString: true,
        notEmpty: true,
        errorMessage: "Password is required",
        trim: true,
        isLength:{
            options: {min:8,max:50},
            errorMessage: "Password must be of 8 to 50 characters long"
        }
    
    },

    'profile.bio': {
        optional: { options: { nullable: true } },
        isString: true,
        errorMessage: "Bio must be a string",
        trim: true
    },
    'profile.profilePicture': {
        optional: { options: { nullable: true } },
        isString: true,
        errorMessage: "Profile picture must be a string",
        trim: true
    }


})
;

export const userValidatorEdit = checkSchema({
    username: {
        ...usernameValidator,
        optional: { options: { nullable: true } }

    }
    ,
    email:{
        ...emailValidator,
        optional: { options: { nullable: true } }
    } ,
    role: {
        isIn: {
            options: [['Admin', 'User', 'Partner', 'Manager', 'Staff']],
            errorMessage: "Invalid role"
        },
        optional: { options: { nullable: true } }
    
    },
    'profile.bio': {
        optional: { options: { nullable: true } },
        isString: true,
        errorMessage: "Bio must be a string",
        trim: true,
    },
    'profile.profilePicture': {
        optional: { options: { nullable: true } },
        isString: true,
        errorMessage: "Profile picture must be a string",
        trim: true
    }


})
;
export default userValidator;
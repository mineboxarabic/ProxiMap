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
export default userValidator;
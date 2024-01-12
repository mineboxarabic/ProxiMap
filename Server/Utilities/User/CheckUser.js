import { checkSchema } from "express-validator";

const checkUser = checkSchema({
    username: {
        isString: true,
        notEmpty: true,
        errorMessage: "Username is required",
        trim: true,
        isLength:{
            options: {min:3,max:50},
            errorMessage: "Username must be of 3 to 50 characters long"
        }
    },
    email: {
        isEmail: true,
        errorMessage: "Invalid email format",
        trim: true
    },
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
});

export default checkUser;

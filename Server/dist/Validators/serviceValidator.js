var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkSchema } from "express-validator";
import UserDAO from "../DAO/UserDAO.js";
const serviceValidator = checkSchema({
    partnerId: {
        isMongoId: {
            errorMessage: "partnerid must be a valid mongoId",
        },
        errorMessage: "Invalid partnerId",
        trim: true,
        custom: {
            options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
                const userDAO = new UserDAO();
                const user = yield userDAO.findById(value);
                if (!user) {
                    throw new Error("Partner does not exist");
                }
                return true;
            }),
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
        isLength: {
            options: { min: 2, max: 100 },
            errorMessage: "Name must be of 2 to 100 characters long"
        }
    },
    description: {
        isString: true,
        notEmpty: true,
        errorMessage: "Description is required",
        trim: true,
        isLength: {
            options: { min: 2, max: 1500 },
            errorMessage: "Description must be of 2 to 1500 characters long"
        }
    },
    price: {
        isNumeric: true,
        notEmpty: true,
        errorMessage: "Price is required",
        trim: true
    },
    availability: {
        isBoolean: true,
        errorMessage: "Availability must be a boolean",
        trim: true
    },
    position: {
        notEmpty: {
            errorMessage: "Position is required",
        },
        isObject: {
            errorMessage: "Position must be an object",
        },
        custom: {
            options: (value, { req }) => {
                if (typeof value.type !== 'string' || !Array.isArray(value.coordinates)) {
                    throw new Error("Position object is invalid");
                }
                // Further validation can be added here, e.g., checking coordinate values
                return true;
            },
        },
    },
    'position.type': {
        isString: {
            errorMessage: "Position type must be a string",
        },
        custom: {
            options: (value, { req }) => {
                // Example: Check if type is one of the allowed values
                const allowedTypes = ['Point', 'Polygon']; // Add more types as needed
                if (!allowedTypes.includes(value)) {
                    throw new Error(`Position type must be one of the following: ${allowedTypes.join(", ")}`);
                }
                return true;
            },
        },
    },
    'position.coordinates': {
        isArray: {
            errorMessage: "Position coordinates must be an array",
        },
        custom: {
            options: (value, { req }) => {
                // Example: Check if coordinates array has the correct length/format
                if (value.length !== 2 || !value.every((num) => typeof num === 'number')) {
                    throw new Error("Coordinates must be an array of two numbers");
                }
                return true;
            },
        },
    },
    range: {
        isNumeric: {
            errorMessage: "Range must be a number",
        },
        notEmpty: true,
        errorMessage: "Range is required",
        trim: true,
        isInt: {
            options: { min: 1, max: 5000 }, // Adjust min and max as needed
            errorMessage: "Range must be between 1 and 5000",
        }
    },
    status: {
        isIn: {
            options: [['pending', 'accepted', 'rejected']],
            errorMessage: "Status must be either pending, accepted, or rejected"
        },
        trim: true
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
        custom: {
            options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
                const userDAO = new UserDAO();
                const user = yield userDAO.findById(value);
                if (!user) {
                    throw new Error("Partner does not exist");
                }
                return true;
            }),
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
        isLength: {
            options: { min: 2, max: 100 },
            errorMessage: "Name must be of 2 to 100 characters long"
        }
    },
    description: {
        optional: true,
        isString: true,
        notEmpty: true,
        errorMessage: "Description is required",
        trim: true,
        isLength: {
            options: { min: 2, max: 1500 },
            errorMessage: "Description must be of 2 to 1500 characters long"
        }
    },
    price: {
        optional: true,
        isNumeric: true,
        notEmpty: true,
        errorMessage: "Price is required",
        trim: true
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
        isInt: {
            options: { min: 1, max: 5000 }, // Adjust min and max as needed
            errorMessage: "Range must be between 1 and 5000",
        }
    },
    position: {
        optional: true,
        notEmpty: {
            errorMessage: "Position is required",
        },
        isObject: {
            errorMessage: "Position must be an object",
        },
        custom: {
            options: (value, { req }) => {
                if (typeof value.type !== 'string' || !Array.isArray(value.coordinates)) {
                    console.log('value', value);
                    throw new Error("Position object is invalid");
                }
                // Further validation can be added here, e.g., checking coordinate values
                return true;
            },
        },
    },
    'position.type': {
        optional: true,
        isString: {
            errorMessage: "Position type must be a string",
        },
        custom: {
            options: (value, { req }) => {
                // Example: Check if type is one of the allowed values
                const allowedTypes = ['Point', 'Polygon']; // Add more types as needed
                if (!allowedTypes.includes(value)) {
                    throw new Error(`Position type must be one of the following: ${allowedTypes.join(", ")}`);
                }
                return true;
            },
        },
    },
    'position.coordinates': {
        optional: true,
        isArray: {
            errorMessage: "Position coordinates must be an array",
        },
        custom: {
            options: (value, { req }) => {
                // Example: Check if coordinates array has the correct length/format
                if (value.length !== 2 || !value.every((num) => typeof num === 'number')) {
                    throw new Error("Coordinates must be an array of two numbers");
                }
                return true;
            },
        },
    },
    status: {
        optional: true,
        isIn: {
            options: [['pending', 'accepted', 'rejected']],
            errorMessage: "Status must be either pending, accepted, or rejected"
        },
        trim: true
    },
});
export default serviceValidator;
//{ PartnerId: '60c9e9e0c1a5b3a0a4b7d8b9', CategoryId: '60c9e9e0c1a5b3a0a4b7d8b9', Name: 'Service 1', Description: 'Service 1 description', Price: '100', Availability: 'true', Ratings: '5'}

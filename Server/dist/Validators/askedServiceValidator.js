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
import CategoryDAO from "../DAO/CategoryDAO.js";
const askedServiceValidator = checkSchema({
    userId: {
        isMongoId: {
            errorMessage: "userId must be a valid mongoId",
        },
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const userDAO = new UserDAO();
                const user = yield userDAO.findById(value);
                if (!user) {
                    throw new Error("User does not exist");
                }
                return true;
            }),
        },
        errorMessage: "Invalid userId",
        trim: true
    },
    categoryId: {
        isMongoId: {
            errorMessage: "categoryId must be a valid mongoId",
        },
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const categoryDAO = new CategoryDAO();
                const category = yield categoryDAO.findById(value);
                if (!category) {
                    throw new Error("Category does not exist");
                }
                return true;
            }),
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
            errorMessage: "Name must be 2 to 100 characters long"
        }
    },
    description: {
        isString: true,
        notEmpty: true,
        errorMessage: "Description is required",
        trim: true,
        isLength: {
            options: { min: 2, max: 1500 },
            errorMessage: "Description must be 2 to 1500 characters long"
        }
    },
    price: {
        isNumeric: true,
        optional: true,
        errorMessage: "Price must be numeric",
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
    date: {
        custom: {
            options: (value, { req }) => {
                console.log('value', value);
                if (value && isNaN(Date.parse(value))) {
                    throw new Error("Date must be valid");
                }
                return true;
            }
        },
        isDate: true,
        errorMessage: "Date must be valid",
        optional: true
    },
    status: {
        isIn: {
            options: [['pending', 'accepted', 'rejected']],
            errorMessage: "Status must be either pending, accepted, or rejected"
        },
        trim: true
    }
});
export const askedServiceValidatorEdit = checkSchema({
    userId: {
        optional: true,
        isMongoId: {
            errorMessage: "userId must be a valid mongoId",
        },
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const userDAO = new UserDAO();
                const user = yield userDAO.findById(value);
                if (!user) {
                    throw new Error("User does not exist");
                }
                return true;
            }),
        },
        errorMessage: "Invalid userId",
        trim: true
    },
    categoryId: {
        optional: true,
        isMongoId: {
            errorMessage: "categoryId must be a valid mongoId",
        },
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                const categoryDAO = new CategoryDAO();
                const category = yield categoryDAO.findById(value);
                if (!category) {
                    throw new Error("Category does not exist");
                }
                return true;
            }),
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
            errorMessage: "Name must be 2 to 100 characters long"
        }
    },
    description: {
        optional: true,
        isString: true,
        errorMessage: "Description is required",
        trim: true,
        isLength: {
            options: { min: 2, max: 1500 },
            errorMessage: "Description must be 2 to 1500 characters long"
        }
    },
    price: {
        optional: true,
        isNumeric: true,
        errorMessage: "Price must be numeric",
        trim: true
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
    date: {
        optional: true,
        custom: {
            options: (value, { req }) => {
                const date = new Date(value);
                if (value && isNaN(date.getTime())) {
                    throw new Error("Date must be valixxd");
                }
                return true;
            },
            errorMessage: "Date must be valid"
        },
        errorMessage: "Date must be xxvalid",
        // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
        optional: true
    },
    status: {
        optional: true,
        isIn: {
            options: [['pending', 'accepted', 'rejected']],
            errorMessage: "Status must be either pending, accepted, or rejected"
        },
        trim: true
    }
});
export default askedServiceValidator;
//{ PartnerId: '60c9e9e0c1a5b3a0a4b7d8b9', CategoryId: '60c9e9e0c1a5b3a0a4b7d8b9', Name: 'Service 1', Description: 'Service 1 description', Price: '100', Availability: 'true', Ratings: '5'}

import { checkSchema } from "express-validator";
import UserDAO from "../DAO/UserDAO.js";
import CategoryDAO from "../DAO/CategoryDAO.js";
  const askedServiceValidator = checkSchema({
    userId: {
        isMongoId: {
            errorMessage: "userId must be a valid mongoId",
        },
        custom: {
            options: async (value) => {
                const userDAO = new UserDAO();
                const user = await userDAO.findById(value);
                if (!user) {
                    throw new Error("User does not exist");
                }
                return true;
            },
        },
        errorMessage: "Invalid userId",
        trim: true
    },
    categoryId: {
        isMongoId: {
            errorMessage: "categoryId must be a valid mongoId",
        },
        custom: {
            options: async (value) => {
                const categoryDAO = new CategoryDAO();
                const category = await categoryDAO.findById(value);
                if (!category) {
                    throw new Error("Category does not exist");
                }
                return true;
            },
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
        isObject: true,
        errorMessage: "Position must be an object",
        trim: true
    },

    date: {
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
            options: async (value) => {
                const userDAO = new UserDAO();
                const user = await userDAO.findById(value);
                if (!user) {
                    throw new Error("User does not exist");
                }
                return true;
            },
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
            options: async (value) => {
                const categoryDAO = new CategoryDAO();
                const category = await categoryDAO.findById(value);
                if (!category) {
                    throw new Error("Category does not exist");
                }
                return true;
            },
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
        isObject: true,
        errorMessage: "Position must be an object",
        trim: true
    },
    date: {
        optional: true,
        isDate: true,
        errorMessage: "Date must be valid"
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
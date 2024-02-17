import { checkSchema } from "express-validator";
const checkService = checkSchema({
    partnerId: {
        errorMessage: "Invalid partner ID",
        isMongoId: true
    },
    categoryId: {
        errorMessage: "Invalid category ID",
        isMongoId: true
    },
    name: {
        isLength: {
            options: { min: 5, max: 100 },
            errorMessage: "The name must be of 5 to 100 characters long"
        },
        isString: {
            errorMessage: "Name must be a string"
        }
    },
    description: {
        isLength: {
            options: { max: 5000 },
            errorMessage: "The description must be of maximum 5000 chars"
        },
        isString: {
            errorMessage: "Description must be a string"
        },
        optional: { options: { nullable: true } }
    },
    price: {
        isNumeric: {
            errorMessage: "Price must be a numeric value"
        }
    },
    availability: {
        isBoolean: {
            errorMessage: "Availability must be a boolean"
        }
    }
    // Uncomment and modify if you need to include ratings
    // ratings: {
    //   isArray: {
    //     errorMessage: "Ratings must be an array"
    //   },
    //   optional: { options: { nullable: true } }
    // }
});
export default checkService;

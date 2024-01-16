import { checkSchema, param } from "express-validator";

const checkId = [
    param('id').isMongoId().withMessage("The id you gave is not a mongoID"),
    param('id').isLength({min:24,max:24}).withMessage("Invalid id")
]

export default checkId;
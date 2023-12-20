import { param } from "express-validator";

const checkId = [
    param('id').isMongoId().withMessage("The id you gave is not a mongoID"),
    param('id').isLength({min:24,max:24}).withMessage("The id must be 24 characters long")
  ]

export default checkId;
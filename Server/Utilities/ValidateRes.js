import { validationResult } from "express-validator";

const ValidateRes = (req) => {
    const validateRes = validationResult(req);
    if(!validateRes.isEmpty()){
       return { error: validateRes.array()}
    }
    return true;
};

export default ValidateRes;
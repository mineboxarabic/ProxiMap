import { validationResult } from "express-validator";


const ValidateRes = (req,res,next) => {

    const validateRes = validationResult(req);
    if(!validateRes.isEmpty()){

        const customError = validateRes.array().map((err) => {
        let statusCode = 400;
        
        if(err.msg === "Email already exists" || err.msg === "Username already exists") {


            statusCode = 409;
        }
        else if(err.msg === "User not found"){
            statusCode = 404;
        }
        else{
            statusCode = 400;
        }


        return {
            ...err,
            statusCode
        }
        });

        const firstErrorCode = customError[0].statusCode || 400;
        res.status(firstErrorCode);
        res.json({error: customError});
        return customError;

    }

    next();
};

export default ValidateRes;
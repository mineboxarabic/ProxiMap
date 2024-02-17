import { validationResult } from "express-validator";


const ValidateRes = (req,res,next) => {

    const validateRes = validationResult(req);
    if(!validateRes.isEmpty()){
        const customError = validateRes.array().map((err) => {
        let statusCode = 400;
        
        if(err.msg === "Email already exists" || err.msg === "Username already exists") {
            statusCode = 409;
        }
        else if(err.msg === "User not found" || err.msg === "AskedService not found" || err.msg === "Service not found" || err.msg === "Category not found" || err.msg === "Product not found" || err.msg === "Order not found" || err.msg === "Review not found" || err.msg === "Cart not found" || err.msg === "Wishlist not found" || err.msg === "Address not found" || err.msg === "Coupon not found"){
            statusCode = 404;
        }
        else{
            statusCode = 400;
        }


        return {
           ok:false, message:err.msg, status:statusCode
        }
        });

        const firstErrorCode = customError[0] ||  {ok:false, message:" Server Error", status:500};

        

        res.status(firstErrorCode.status);
        res.json(firstErrorCode);
        return customError[0];

    }

    next();
};

export default ValidateRes;
/*  {ok:false, message:"msg", status:400}
    */
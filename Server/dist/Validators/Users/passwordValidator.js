const passwordValidator = {
    isString: true,
    notEmpty: true,
    errorMessage: "Password is required",
    trim: true,
    isLength: {
        options: { min: 8, max: 50 },
        errorMessage: "Password must be of 8 to 50 characters long"
    }
};
export default passwordValidator;

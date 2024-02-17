const roleValidator = {
    isIn: {
        options: [['Admin', 'User', 'Partner', 'Manager', 'Staff']],
        errorMessage: "Invalid role"
    }
};
export default roleValidator;

import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";
import bcrypt from 'bcrypt';
const createUser = async (req: any, res: any) => {
    //TODO:Create a function to check if the user is valid or not
console.log('user', req.body);
    const userDAO = new UserDAO();
    const user = req.body;
    
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;


    const newUser = await userDAO.create(user);

    
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser
    });
    return;
};

export default createUser;
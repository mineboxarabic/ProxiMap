import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";
import bcrypt from 'bcrypt';
const createUser = async (req, res) => {
    //TODO:Create a function to check if the user is valid or not

    const userDAO = new UserDAO();
    const user = req.body;
    
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;


    const newUser = await userDAO.create(user);
    
    res.status(201).json(newUser);
    return;
};

export default createUser;
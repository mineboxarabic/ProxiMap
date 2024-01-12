import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Utilities/ValidateRes.js";
import bcrypt from 'bcrypt';
const createUser = async (req, res) => {
    //TODO:Create a function to check if the user is valid or not

    const userDAO = new UserDAO();
    const user = req.body;
    console.log(user);
    
    const valid = ValidateRes(req);
    if(valid != true) return res.status(400).json(valid);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const newUser = await userDAO.create(user);

    if(newUser.error){
        if(newUser.error.code === 11000){
            res.status(409).json({error: "User already exists"});
            return;
        }
        res.status(400).json(newUser);
        return;
    }
    
    res.status(201).json(newUser);
    return;
};

export default createUser;
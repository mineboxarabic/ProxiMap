import UserDAO from "../../DAO/UserDAO.js";
import isUserValid from "../../Utilities/isUserValid.js";
const createUser = async (req, res) => {
    //TODO:Create a function to check if the user is valid or not

    const userDAO = new UserDAO();
    const user = req.body;
  
    if(isUserValid(user).error){
        res.status(400).json(isUserValid(user));
        return;
    }

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
import UserDAO from "../../DAO/UserDAO.js";
import isIdValid from "../../Utilities/isIdValid.js";

const readUser = async (req, res) => {


    const userDAO = new UserDAO();
    const id = req.params.id;
    //Check if the id is valid
    if(!isIdValid(id)){res.status(400).json({error: "Invalid ID"});return;}

    const user = await userDAO.findById(id);
    //Check if the user exists or not

    if(!user){
        res.status(404).json({error: "User not found"});
        return;
    }

    res.status(200).json(user);
};

export default readUser;
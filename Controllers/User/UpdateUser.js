import UserDAO from "../../DAO/UserDAO.js";
import isUserValid from "../../Utilities/isUserValid.js";

const updateUser = async (req, res) => {
    const userDAO = new UserDAO();
    const id = req.params.id;
    //TODO:check the id is valid or not

    const user = req.body;

    //Check if the string of name and email and password are valid
    const isValid = isUserValid(user);
    if(isValid.error){
        res.status(400).json(isValid.error);
        return;
    }

    //Check if the user exists or not
    const userExists = await userDAO.findById(id);
    if(userExists.error){

        res.status(404).json({error: "User not found"});
        return;
    }


    //Update the user
    await userDAO.updateById(id, user);

    res.status(200).json({message: "User updated successfully"});
};

export default updateUser;

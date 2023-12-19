import UserDAO from "../../DAO/UserDAO.js";
import isIdValid from "../../Utilities/isIdValid.js";
const deleteUser = async (req, res) => {

    const userDAO = new UserDAO();
    const id = req.params.id;
    //Check if the id is valid
    if(!isIdValid(id)){res.status(404).json({error: "Invalid ID"});return;}

    const user = await userDAO.deleteById(id);

    //Check if the user exists or not
    if(!user){
        res.status(404).json({error: "User not found"});
    }

    res.status(200).json({message: "User deleted successfully"});
};

export default deleteUser;
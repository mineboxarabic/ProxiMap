import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Utilities/ValidateRes.js";
const deleteUser = async (req, res) => {

    const userDAO = new UserDAO();
    const id = req.params.id;
    
    const valid = ValidateRes(req);
    if(valid != true) return res.status(400).json(valid);

    const user = await userDAO.deleteById(id);

    if(!user){
        res.status(404).json({error: "User not found"});
    }

    res.status(200).json({message: "User deleted successfully"});
};

export default deleteUser;
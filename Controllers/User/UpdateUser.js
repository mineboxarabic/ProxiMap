import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Utilities/ValidateRes.js";

const updateUser = async (req, res) => {
    const userDAO = new UserDAO();
    const id = req.params.id;


    const user = req.body;

   
    const valid = ValidateRes(req);
    if(valid != true) return res.status(400).json(valid);

    //Check if the user exists or not
    const userExists = await userDAO.findById(id);
    if(userExists.error){

        res.status(404).json({error: "User not found"});
        return;
    }

    //TODO:Check the email if the email exists or not


    //Update the user
    await userDAO.updateById(id, user);

    res.status(200).json({message: "User updated successfully"});
};

export default updateUser;

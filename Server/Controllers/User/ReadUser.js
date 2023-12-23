import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Utilities/ValidateRes.js";


const readUser = async (req, res) => {


    const userDAO = new UserDAO();
    const id = req.params.id;
   
    const valid = ValidateRes(req);
    if(valid != true) return res.status(400).json(valid);

    const user = await userDAO.findById(id);
    //Check if the user exists or not

    if(!user){
        res.status(404).json({error: "User not found"});
        return;
    }

    res.status(200).json(user);
};

export default readUser;
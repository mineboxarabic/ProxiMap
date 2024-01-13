import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";


const readUser = async (req, res) => {
    const userDAO = new UserDAO();
    const id = req.params.id;
    const user = await userDAO.findById(id);

    res.status(200).json(user);
};

export default readUser;
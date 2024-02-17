import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";
const deleteUser = async (req: any, res: any) => {

    const userDAO = new UserDAO();
    const id = req.params.id;
    
    const user = await userDAO.deleteById(id);


    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
};

export default deleteUser;
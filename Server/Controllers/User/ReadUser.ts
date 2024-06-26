import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";


const readUser = async (req: any, res: any) => {
    const userDAO = new UserDAO();
    const id = req.params.id;
    const user = await userDAO.findById(id);

    res.status(200).json({
        success: true,
        message: "User found successfully",
        user
    });
};

export default readUser;
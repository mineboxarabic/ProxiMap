import UserDAO from "../../DAO/UserDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateUser = async (req, res) => {
    const userDAO = new UserDAO();
    const id = req.params.id;


    const user = req.body;
    const updatedUser = await userDAO.updateById(id, user);





    res.status(200).json({
        success: true,
        message: "User updated successfully",
        updatedUser
    });
};

export default updateUser;

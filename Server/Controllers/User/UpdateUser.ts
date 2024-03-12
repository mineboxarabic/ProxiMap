import UserDAO from "../../DAO/UserDAO.js";



const updateUser = async (req: any, res: any) => {
    const userDAO = new UserDAO();
    const id = req.params.id;


    const user = await userDAO.updateById(id, req.body);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        updatedUser: user
    });


};

export default updateUser;

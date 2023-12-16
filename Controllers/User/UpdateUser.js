import UserDAO from "../../DAO/UserDAO.js";

const updateUser = async (req, res) => {
    const userDAO = new UserDAO();
    const id = req.params.id;
    //TODO:check the id is valid or not
    const user = req.body;
    await userDAO.updateById(id, user);

    res.status(200).send('User updated');
};

export default updateUser;
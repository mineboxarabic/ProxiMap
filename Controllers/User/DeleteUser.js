import UserDAO from "../../DAO/UserDAO.js";
const deleteUser = async (req, res) => {
    //TODO:Create a function to check the id is valid or not
    const userDAO = new UserDAO();
    const id = req.params.id;
    const user = await userDAO.deleteById(id);

    //TODO:check if the user is null or not
    res.status(200).send('User deleted');
};

export default deleteUser;
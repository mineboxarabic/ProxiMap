import UserDAO from "../../DAO/UserDAO.js";
const readUser = async (req, res) => {
    //TODO:Create a function to check the id is valid or not
    const userDAO = new UserDAO();
    const id = req.params.id;
    const user = await userDAO.findById(id);

    //TODO:check if the user is null or not
    res.status(200).json(user);
};

export default readUser;
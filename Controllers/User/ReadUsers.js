import UserDAO from "../../DAO/UserDAO.js";

const readUsers = async (req, res) => {
    const userDAO = new UserDAO();
    const user = await userDAO.findAll();


    res.status(200).json(user);
};

export default readUsers;
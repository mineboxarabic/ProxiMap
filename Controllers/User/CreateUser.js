import UserDAO from "../../DAO/UserDAO.js";
const createUser = async (req, res) => {
    //TODO:Create a function to check if the user is valid or not

    const userDAO = new UserDAO();
    const user = req.body;

    console.log(req.body);
    const newUser = await userDAO.create(user);
    res.status(201).json(newUser);
};

export default createUser;
import { decrypt } from "dotenv";
import UserDAO from "../../DAO/UserDAO.js";

const isUserExist = async (username, password) => {
    const userDAO = new UserDAO();
    const id = req.body.userId;

    try {
    
        return true;
    } catch (error) {
        return false;
    }
};

export default isUserExist;
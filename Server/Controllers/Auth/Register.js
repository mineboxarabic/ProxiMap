import UserDAO from "../../DAO/UserDAO.js";
import bcrypt from 'bcrypt';

const Register = async (req, res) => {
    const { username, password, email } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userDAO = new UserDAO();
        const user = await userDAO.create({ username, password: hashedPassword, email });

        

        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }  
}

export default Register;
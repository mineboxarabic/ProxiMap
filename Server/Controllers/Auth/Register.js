import UserDAO from "../../DAO/UserDAO.js";
import bcrypt from 'bcrypt';

const Register = async (req, res) => {
    const { username, password, email } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userDAO = new UserDAO();
        const user = await userDAO.create({ username, password: hashedPassword, email });

        if(user.error){
            //If the error is that the email is already in use
            if(user.error.code === 11000){
                res.status(409).json({message: "Email already in use"});
                return;
            }
            res.status(400).json({message: user.error.message});
            return;
        }

        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }  
}

export default Register;
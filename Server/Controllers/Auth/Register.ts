import UserDAO from "../../DAO/UserDAO.js";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'bcry... Remove this comment to see the full error message
import bcrypt from 'bcrypt';

const Register = async (req: any, res: any) => {
    const { username, password, email } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userDAO = new UserDAO();
        const user = await userDAO.create({ username, password: hashedPassword, email });

        // @ts-expect-error TS(2339): Property 'error' does not exist on type '(Document... Remove this comment to see the full error message
        if(user.error){
            //If the error is that the email is already in use
            // @ts-expect-error TS(2339): Property 'error' does not exist on type '(Document... Remove this comment to see the full error message
            if(user.error.code === 11000){
                res.status(409).json({message: "Email already in use"});
                return;
            }
            // @ts-expect-error TS(2339): Property 'error' does not exist on type '(Document... Remove this comment to see the full error message
            res.status(400).json({message: user.error.message});
            return;
        }

        res.status(200).json(user);
    }catch(err){
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        res.status(500).json({message: err.message});
    }  
}

export default Register;
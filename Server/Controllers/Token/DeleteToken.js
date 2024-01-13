import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";
const deleteToken = async (req, res) => {

    const tokenDAO = new TokenDAO();
    const id = req.params.id;
    
    const valid = ValidateRes(req);
    if(valid != true) return res.status(400).json(valid);

    const token = await tokenDAO.deleteById(id);

    if(!token){
        res.status(404).json({error: "Token not found"});
    }

    res.status(200).json({message: "Token deleted successfully"});
};

export default deleteToken;
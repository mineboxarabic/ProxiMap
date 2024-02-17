import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";
const createToken = async (req, res) => {

    const tokenDAO = new TokenDAO();
    const token = req.body;


    const valid = ValidateRes(req);
    if(valid != true) return res.status(400).json(valid);

    const newToken = await tokenDAO.create(token);

    
    res.status(201).json(newToken);
    return;
};

export default createToken;
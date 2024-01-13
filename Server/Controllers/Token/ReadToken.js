import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";


const readToken = async (req, res) => {


    const tokenDAO = new TokenDAO();
    const id = req.params.id;
   
    const valid = ValidateRes(req);
    if(valid != true) return res.status(400).json(valid);

    const token = await tokenDAO.findById(id);


    if(!token){
        res.status(404).json({error: "Token not found"});
        return;
    }

    res.status(200).json(token);
};

export default readToken;
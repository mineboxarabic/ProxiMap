import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateToken = async (req, res) => {
    const tokenDAO = new TokenDAO();
    const id = req.params.id;

    const token = req.body;

   
    const valid = ValidateRes(req);
    if(valid != true) return res.status(400).json(valid);


    const tokenExists = await tokenDAO.findById(id);
    if(tokenExists.error){

        res.status(404).json({error: "Token not found"});
        return;
    }


    const response = await tokenDAO.updateById(id, token);
    if(response.error){
        if(response.error.code === 11000){
            res.status(409).json({error: "Token already exists"});
            return;
        }
        res.status(400).json(response);
        return;
    }
    res.status(200).json({message: "Token updated successfully"});
};

export default updateToken;

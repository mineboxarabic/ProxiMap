import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Utilities/ValidateRes.js";

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


    await tokenDAO.updateById(id, token);

    res.status(200).json({message: "Token updated successfully"});
};

export default updateToken;

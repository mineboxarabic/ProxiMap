import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";
const deleteToken = async (req: any, res: any) => {

    const tokenDAO = new TokenDAO();
    const id = req.params.id;
    
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
    const valid = ValidateRes(req);
    // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
    if(valid != true) return res.status(400).json(valid);

    const token = await tokenDAO.deleteById(id);

    if(!token){
        res.status(404).json({error: "Token not found"});
    }

    res.status(200).json({message: "Token deleted successfully"});
};

export default deleteToken;
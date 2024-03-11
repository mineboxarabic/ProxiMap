import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";
const createToken = async (req: any, res: any) => {

    const tokenDAO = new TokenDAO();
    const token = req.body;


    // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
    const valid = ValidateRes(req);
    // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
    if(valid != true) return res.status(400).json(valid);

    const newToken = await tokenDAO.create(token);

    
    res.status(201).json(newToken);
    return;
};

export default createToken;
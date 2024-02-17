import TokenDAO from "../../DAO/TokenDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateToken = async (req: any, res: any) => {
    const tokenDAO = new TokenDAO();
    const id = req.params.id;

    const token = req.body;

   
    // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
    const valid = ValidateRes(req);
    // @ts-expect-error TS(2367): This condition will always return 'true' since the... Remove this comment to see the full error message
    if(valid != true) return res.status(400).json(valid);


    const tokenExists = await tokenDAO.findById(id);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if(tokenExists.error){

        res.status(404).json({error: "Token not found"});
        return;
    }


    const response = await tokenDAO.updateById(id, token);
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    if(response.error){
        // @ts-expect-error TS(2531): Object is possibly 'null'.
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

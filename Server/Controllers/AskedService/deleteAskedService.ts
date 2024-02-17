import { validationResult } from "express-validator";
import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const deleteAskedService = async (req: any, res: any) => {
 
    const askedServiceDAO = new AskedServiceDAO();
    const id = req.params.id;


    const result = await askedServiceDAO.deleteById(id);

 
    if(!result){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({
        success: true,
        message: "AskedService deleted successfully"
     });
    
};

export default deleteAskedService;

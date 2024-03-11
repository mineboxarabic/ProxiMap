import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import { AskedServiceInterface } from "../../Models/AskedService.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateAskedService = async (req: any, res: any) => {
    const askedAskedServiceDAO = new AskedServiceDAO();
    const id = req.params.id;
    const askedAskedServiceUpdates = req.body;


    const updatedAskedService : AskedServiceInterface= await askedAskedServiceDAO.updateById(id, askedAskedServiceUpdates) as AskedServiceInterface;
    
    if(!updatedAskedService || updatedAskedService === null){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({success:true, message: "AskedService updated successfully", updatedAskedService});
};

export default updateAskedService;

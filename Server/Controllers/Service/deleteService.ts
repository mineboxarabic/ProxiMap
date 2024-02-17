import { validationResult } from "express-validator";
import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const deleteService = async (req: any, res: any) => {
 
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;


    const result = await serviceDAO.deleteById(id);

 
    if(!result){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({
        success: true,
        message: "Service deleted successfully"
     });
    
};

export default deleteService;

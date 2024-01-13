import { validationResult } from "express-validator";
import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const deleteService = async (req, res) => {
 
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;

    const valid = ValidateRes(req, res);
    if(valid != true) return res.status(400).json(valid);



    const result = await serviceDAO.deleteById(id);

    if(result.deletedCount === 0){
        res.status(404).json({ error: "Service not found" });
    } else {
        res.status(200).json({ message: "Service deleted successfully" });
    }
};

export default deleteService;

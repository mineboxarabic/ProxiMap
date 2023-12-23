import ServiceDAO from "../../DAO/ServiceDAO.js";
import { param, validationResult } from 'express-validator';
import ValidateRes from "../../Utilities/ValidateRes.js";
const updateService = async (req, res) => {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;
    const serviceUpdates = req.body;

    const valid = ValidateRes(req, res);
    if(valid != true) return res.status(400).json(valid);


    const updatedService = await serviceDAO.updateById(id, serviceUpdates);

    if(!updatedService){
        res.status(404).json({ error: "Service not found" });
    } else {
        res.status(200).json(updatedService);
    }
};

export default updateService;

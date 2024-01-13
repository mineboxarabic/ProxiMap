import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateService = async (req, res) => {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;
    const serviceUpdates = req.body;

    const valid = ValidateRes(req, res);
    if(valid != true) return res.status(400).json(valid);


    const updatedService = await serviceDAO.updateById(id, serviceUpdates);
    if(updatedService.error){
        if(updatedService.error.code === 11000){
            res.status(409).json({error: "Service already exists"});
            return;
        }
        res.status(400).json(updatedService);
        return;
    }
    res.status(200).json({message: "Service updated successfully"});
};

export default updateService;

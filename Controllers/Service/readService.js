import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Utilities/ValidateRes.js";

const readService = async (req, res) => {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;

    const valid = ValidateRes(req, res);
    if(valid != true) return res.status(400).json(valid);

    const service = await serviceDAO.findById(id);

    if(!service){
        res.status(404).json({ error: "Service not found" });
        return;
    }

    res.status(200).json(service);
};

export default readService;

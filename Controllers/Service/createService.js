import ServiceDAO from "../../DAO/ServiceDAO.js";
import isServiceValid from "../../Utilities/isServiceValid.js";

const createService = async (req, res) => {
    const serviceDAO = new ServiceDAO();
    const service = req.body;

    if(isServiceValid(service).error){
        res.status(400).json(isServiceValid(service));
        return;
    }

    const newService = await serviceDAO.create(service);

    if(newService.error){
        res.status(500).json(newService.error);
    } else {
        res.status(201).json(newService);
    }
};

export default createService;

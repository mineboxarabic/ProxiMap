import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const createService = async (req, res) => {





    const serviceDAO = new ServiceDAO();
    const service = req.body;

    const valid = ValidateRes(req, res);
    if(valid != true) return res.status(400).json(valid);

    const newService = await serviceDAO.create(service);

    if(newService.error){
        res.status(500).json(newService.error);
    } else {
        res.status(201).json(newService);
    }
};

  
export default createService;

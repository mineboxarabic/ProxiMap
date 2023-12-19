import ServiceDAO from "../../DAO/ServiceDAO.js";

const createService = async (req, res) => {
    const serviceDAO = new ServiceDAO();
    const service = req.body;

    const newService = await serviceDAO.create(service);

    if(newService.error){
        res.status(500).json(newService.error);
    } else {
        res.status(201).json(newService);
    }
};

export default createService;

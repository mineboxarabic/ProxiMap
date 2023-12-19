import ServiceDAO from "../../DAO/ServiceDAO.js";

const readService = async (req, res) => {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;

    const service = await serviceDAO.findById(id);

    if(!service){
        res.status(404).json({ error: "Service not found" });
        return;
    }

    res.status(200).json(service);
};

export default readService;

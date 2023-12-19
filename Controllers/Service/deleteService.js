import ServiceDAO from "../../DAO/ServiceDAO.js";

const deleteService = async (req, res) => {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;

    const result = await serviceDAO.deleteById(id);

    if(result.deletedCount === 0){
        res.status(404).json({ error: "Service not found" });
    } else {
        res.status(200).json({ message: "Service deleted successfully" });
    }
};

export default deleteService;

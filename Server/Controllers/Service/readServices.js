import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const readServices = async (req, res) => {
    const serviceDAO = new ServiceDAO();



    const services = await serviceDAO.findAll();

    res.status(200).json(services);
};

export default readServices;

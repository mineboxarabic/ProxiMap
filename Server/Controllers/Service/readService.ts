import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const readService = async (req: any, res: any) => {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;

    const service = await serviceDAO.findById(id);

    console.log(service);

    res.status(200).json({
        success: true,
        message: "Service found",
        service: service
    });
};

export default readService;

import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateService = async (req, res) => {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;
    const serviceUpdates = req.body;


    const updatedService = await serviceDAO.updateById(id, serviceUpdates);
    console.log(updatedService);
    if(!updatedService || updatedService.ok == 0){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({success:true, message: "Service updated successfully", updatedService});
};

export default updateService;

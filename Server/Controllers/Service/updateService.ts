import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateService = async (req: any, res: any) => {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;
    const serviceUpdates = req.body;

    
    const updatedService = await serviceDAO.updateById(id, serviceUpdates);
    if(!updatedService || updatedService.ok == 0){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({success:true, message: "Service updated successfully", updatedService});
};
export const updateMutilpleServices = async (req: any, res: any) => {
    const serviceDAO = new ServiceDAO();
    const services = req.body;
    console.log('services', services[0].position.coordinates);
    const updatedServices = await serviceDAO.updateMany(services);
    if(!updatedServices || updatedServices.ok == 0){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({success:true, message: "Services updated successfully", updatedServices});
}
export default updateService;

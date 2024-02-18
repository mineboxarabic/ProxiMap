var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DatabaseError from "../../DAO/DataBaseError/DatabaseError.js";
import ServiceDAO from "../../DAO/ServiceDAO.js";
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;
    const serviceUpdates = req.body;
    const updatedService = yield serviceDAO.updateById(id, serviceUpdates);
    /* if(!updatedService || updatedService.ok == 0){
         return res.status(500).json({success:false, message: "Something went wrong" });
     }*/
    if (updatedService instanceof DatabaseError) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
    return res.status(200).json({ success: true, message: "Service updated successfully", updatedService });
});
export const updateMutilpleServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceDAO = new ServiceDAO();
    const services = req.body;
    console.log('services', services[0].position.coordinates);
    const updatedServices = yield serviceDAO.updateMany(services);
    /*if(!updatedServices || updatedServices.ok == 0){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }*/
    if (updatedServices instanceof DatabaseError) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
    return res.status(200).json({ success: true, message: "Services updated successfully", updatedServices });
});
export default updateService;

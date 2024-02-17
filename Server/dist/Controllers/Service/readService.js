var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ServiceDAO from "../../DAO/ServiceDAO.js";
const readService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceDAO = new ServiceDAO();
    const id = req.params.id;
    const service = yield serviceDAO.findById(id);
    console.log(service);
    res.status(200).json({
        success: true,
        message: "Service found",
        service: service
    });
});
export default readService;

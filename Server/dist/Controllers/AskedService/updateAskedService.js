var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
const updateAskedService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const askedAskedServiceDAO = new AskedServiceDAO();
    const id = req.params.id;
    const askedAskedServiceUpdates = req.body;
    const updatedAskedService = yield askedAskedServiceDAO.updateById(id, askedAskedServiceUpdates);
    if (!updatedAskedService || updatedAskedService === null) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
    return res.status(200).json({ success: true, message: "AskedService updated successfully", updatedAskedService });
});
export default updateAskedService;

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
const createAskedService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const askedAskedServiceDAO = new AskedServiceDAO();
    const askedAskedService = req.body;
    const newAskedService = yield askedAskedServiceDAO.create(askedAskedService);
    const coordinates = req.body.position.coordinates;
    if (coordinates) {
        newAskedService.position = {
            type: "Point",
            coordinates: [
                coordinates[0],
                coordinates[1]
            ]
        };
    }
    if (!newAskedService) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
    else {
        return res.status(201).json({ success: true, message: "AskedService created successfully", askedService: newAskedService });
    }
});
export default createAskedService;

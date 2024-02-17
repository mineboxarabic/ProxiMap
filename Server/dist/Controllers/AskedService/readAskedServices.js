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
import ValidateRes from "../../Validators/ValidateRes.js";
const readAskedServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const askedServiceDAO = new AskedServiceDAO();
    const askedServices = yield askedServiceDAO.findAll();
    res.status(200).json(askedServices);
});
export const readAskedServicesinMapView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const askedServiceDAO = new AskedServiceDAO();
    const { swLat, swLng, neLat, neLng } = req.params;
    const query = req.query;
    console.log(swLat, swLng, neLat, neLng);
    const askedServices = yield askedServiceDAO.findAskedServicesinMapView(swLat, swLng, neLat, neLng, query);
    res.status(200).json(askedServices);
});
export const readAskedServicesinMapViewOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const askedServiceDAO = new AskedServiceDAO();
    const askedServices = yield askedServiceDAO.findAllByPartnerId(id);
    if (askedServices instanceof Error) {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        ValidateRes(res, askedServices);
        return;
    }
    res.status(200).json(askedServices);
});
export default readAskedServices;

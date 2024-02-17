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
import ValidateRes from "../../Validators/ValidateRes.js";
const readServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceDAO = new ServiceDAO();
    const services = yield serviceDAO.findAll();
    res.status(200).json(services);
});
export const readServicesinMapView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ///?categoryId=${filters.categoryId}&priceRange=${filters.priceRange}&availability=${filters.availability}&minimumRating=${filters.minimumRating}&serviceType=${filters.serviceType}&serviceStatus=${filters.serviceStatus}`);
    const serviceDAO = new ServiceDAO();
    const { swLat, swLng, neLat, neLng } = req.params;
    const query = req.query;
    if (swLat == undefined || swLng == undefined || neLat == undefined || neLng == undefined) {
        res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
        return;
    }
    const services = yield serviceDAO.findServicesinMapView(swLat, swLng, neLat, neLng, query);
    res.status(200).json(services);
});
export const readServicesinMapViewOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const serviceDAO = new ServiceDAO();
    const services = yield serviceDAO.findAllByPartnerId(id);
    if (services instanceof Error) {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        ValidateRes(res, services);
        return;
    }
    res.status(200).json(services);
});
export default readServices;

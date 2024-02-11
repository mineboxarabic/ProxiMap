import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const readServices = async (req, res) => {
    const serviceDAO = new ServiceDAO();

    const services = await serviceDAO.findAll();

    res.status(200).json(services);
};


export const readServicesinMapView = async (req, res) => {
    

    ///?categoryId=${filters.categoryId}&priceRange=${filters.priceRange}&availability=${filters.availability}&minimumRating=${filters.minimumRating}&serviceType=${filters.serviceType}&serviceStatus=${filters.serviceStatus}`);


    const serviceDAO = new ServiceDAO();
   
   
    const { swLat, swLng, neLat, neLng } = req.params;


    const query = req.query;

    if(swLat == undefined || swLng == undefined || neLat == undefined || neLng == undefined){
        res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        });
        return;
    }
    const services = await serviceDAO.findServicesinMapView(swLat, swLng, neLat, neLng, query);

    res.status(200).json(services);





}; 

export const readServicesinMapViewOfUser = async (req, res) => {
    
    const id = req.params.id;
    const serviceDAO = new ServiceDAO();
    const services = await serviceDAO.findAllByPartnerId(id);
    if(services instanceof Error){
        ValidateRes(res, services);
        return;
    }

    res.status(200).json(services);
}; 
export default readServices;

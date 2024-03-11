import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const readAskedServices = async (req: any, res: any) => {
    const askedServiceDAO = new AskedServiceDAO();

    const askedServices = await askedServiceDAO.findAll();

    res.status(200).json(askedServices);
};


export const readAskedServicesinMapView = async (req: any, res: any) => {
    
    const askedServiceDAO = new AskedServiceDAO();
    const { swLat, swLng, neLat, neLng } = req.params;
    const query = req.query;
    console.log(swLat, swLng, neLat, neLng);
    const askedServices = await askedServiceDAO.findAskedServicesinMapView(swLat, swLng, neLat, neLng, query);
    res.status(200).json(askedServices);
}; 

export const readAskedServicesinMapViewOfUser = async (req: any, res: any) => {
    
    const id = req.params.id;
    const askedServiceDAO = new AskedServiceDAO();

    const askedServices = await askedServiceDAO.findAllByPartnerId(id);

    if(askedServices instanceof Error){
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        ValidateRes(res, askedServices);
        return;
    }

    res.status(200).json(askedServices);
}; 
export default readAskedServices;

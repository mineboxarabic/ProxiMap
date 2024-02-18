import DatabaseError from "../../DAO/DataBaseError/DatabaseError.js";
import ServiceDAO, { ServiceResult } from "../../DAO/ServiceDAO.js";
import { ServiceInterface } from '../../Models/Service';


const createService = async (req: any, res: any) => {

    const serviceDAO = new ServiceDAO();
    const service = req.body;

    const newService : ServiceResult = await serviceDAO.create(service);
    const coordinates : any = req.body.coordinates;
    


    if (coordinates && newService != null) {
        (newService as ServiceInterface).position = {
            type: "Point",
            coordinates: [
                coordinates[1],
                coordinates[0]
            ]
        };
    }

    if(!newService){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }else{
        return res.status(201).json({success:true, message: "Service created successfully", service:newService });
    }
};

  
export default createService;

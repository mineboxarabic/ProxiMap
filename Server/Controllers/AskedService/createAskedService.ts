import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import { AskedServiceInterface } from "../../Models/AskedService.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const createAskedService = async (req: any, res: any) => {

    const askedAskedServiceDAO = new AskedServiceDAO();
    const askedAskedService = req.body;

    const newAskedService : AskedServiceInterface = await askedAskedServiceDAO.create(askedAskedService);
    const coordinates = req.body.position.coordinates;

    if(coordinates){

       /* newAskedService.position = {
            type: "Point",
            coordinates: [
                coordinates[1],
                coordinates[0]
            ]
        }*/

        newAskedService.position = {
            type: "Point",
            coordinates: [
                coordinates[0],
                coordinates[1]
            ]
        }
    }

    
    if(!newAskedService){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }else{
        return res.status(201).json({success:true, message: "AskedService created successfully", askedService:newAskedService });
    }
};

  
export default createAskedService;

import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const createAskedService = async (req, res) => {

    const askedAskedServiceDAO = new AskedServiceDAO();
    const askedAskedService = req.body;

    const newAskedService = await askedAskedServiceDAO.create(askedAskedService);
    const coordinates = req.body.coordinates;
console.log("test", req.body);
    if(coordinates){
        newAskedService.position = {
            type: "Point",
            coordinates: coordinates
        }
    }

    
    if(!newAskedService){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }else{
        return res.status(201).json({success:true, message: "AskedService created successfully", askedService:newAskedService });
    }
};

  
export default createAskedService;

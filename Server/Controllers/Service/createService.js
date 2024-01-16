import ServiceDAO from "../../DAO/ServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const createService = async (req, res) => {

    const serviceDAO = new ServiceDAO();
    const service = req.body;

    const newService = await serviceDAO.create(service);

    if(!newService){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }else{
        return res.status(201).json({success:true, message: "Service created successfully", service:newService });
    }
};

  
export default createService;

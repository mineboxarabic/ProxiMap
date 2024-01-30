import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateAskedService = async (req, res) => {
    const askedAskedServiceDAO = new AskedServiceDAO();
    const id = req.params.id;
    const askedAskedServiceUpdates = req.body;


    const updatedAskedService = await askedAskedServiceDAO.updateById(id, askedAskedServiceUpdates);
    console.log(updatedAskedService);
    if(!updatedAskedService || updatedAskedService.ok == 0){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({success:true, message: "AskedService updated successfully", updatedAskedService});
};

export default updateAskedService;

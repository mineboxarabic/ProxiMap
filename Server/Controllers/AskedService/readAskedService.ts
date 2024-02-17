import AskedServiceDAO from "../../DAO/AskedServiceDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const readAskedService = async (req: any, res: any) => {
    const askedAskedServiceDAO = new AskedServiceDAO();
    const id = req.params.id;

    const askedAskedService = await askedAskedServiceDAO.findById(id);

    console.log(askedAskedService);

    res.status(200).json({
        success: true,
        message: "AskedService found",
        askedService: askedAskedService
    });
};

export default readAskedService;

import CategoryDAO from "../../DAO/CategoryDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const updateCategory = async (req, res) => {
    const categoryDAO = new CategoryDAO();
    const id = req.params.id;
    const categoryUpdates = req.body;

    const updatedCategory = await categoryDAO.updateById(id, categoryUpdates);

    if(!updatedCategory){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({success:true, message: "Category updated successfully", updatedCategory});
};

export default updateCategory;

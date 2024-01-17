import CategoryDAO from "../../DAO/CategoryDAO.js";

const deleteCategory = async (req, res) => {
 
    const categoryDAO = new CategoryDAO();
    const id = req.params.id;


    const result = await categoryDAO.deleteById(id);

 
    if(!result){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }

    return res.status(200).json({
        success: true,
        message: "Category deleted successfully"
     });
    
};

export default deleteCategory;

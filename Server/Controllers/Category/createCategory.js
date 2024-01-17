import CategoryDAO from "../../DAO/CategoryDAO.js";

const createCategory = async (req, res) => {

    const categoryDAO = new CategoryDAO();
    const category = req.body;

    const newCategory = await categoryDAO.create(category);

    if(!newCategory){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }else{
        return res.status(201).json({success:true, message: "Category created successfully", category:newCategory });
    }
};

  
export default createCategory;

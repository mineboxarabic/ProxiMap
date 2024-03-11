import CategoryDAO from "../../DAO/CategoryDAO.js";

const createCategory = async (req: any, res: any) => {

    const categoryDAO = new CategoryDAO();
    const category = req.body;

    const newCategory = await categoryDAO.create(category);
    // @ts-expect-error TS(2339): Property 'category' does not exist on type '(Docum... Remove this comment to see the full error message
    if(newCategory?.category?.error){
        return res.status(500).json({success:false, message: "Something went wrong" });
    }else{
        return res.status(201).json({success:true, message: "Category created successfully", category:newCategory });
    }
};

  
export default createCategory;

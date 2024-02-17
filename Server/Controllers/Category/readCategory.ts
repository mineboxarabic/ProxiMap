import CategoryDAO from "../../DAO/CategoryDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const readCategory = async (req, res) => {
    const categoryDAO = new CategoryDAO();
    const id = req.params.id;

    const category = await categoryDAO.findById(id);

    res.status(200).json({
        success: true,
        message: "Category found",
        category: category
    });
};

export default readCategory;

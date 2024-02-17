import CategoryDAO from "../../DAO/CategoryDAO.js";
import ValidateRes from "../../Validators/ValidateRes.js";

const readCategorys = async (req: any, res: any) => {
    const categoryDAO = new CategoryDAO();

    const categorys = await categoryDAO.findAll();

    res.status(200).json(categorys);
};

export default readCategorys;

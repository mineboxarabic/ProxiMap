import TokenDAO from "../../DAO/TokenDAO.js";

const readTokens = async (req: any, res: any) => {
    const tokenDAO = new TokenDAO();
    const token = await tokenDAO.findAll();


    res.status(200).json(token);
};

export default readTokens;
import MessageDAO from "../../DAO/MessageDAO.js";
import { Request, Response } from "express";
const deleteMessage = async (req:Request, res:Response) => {
    const messageDAO = new MessageDAO();
    const id = req.params.id;

    const result = await messageDAO.deleteById(id);

    if(!result){
        return res.status(500).json({success: false, message: "Something went wrong"});
    }

    return res.status(200).json({
        success: true,
        message: "Message deleted successfully"
    });
};

export default deleteMessage;

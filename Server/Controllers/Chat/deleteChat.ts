import { Request, Response } from "express";
import ChatDAO from "../../DAO/ChatDAO.js";

const deleteChat = async (req: Request, res: Response) => {
    const chatDAO = new ChatDAO();
    const id = req.params.id;

    const result = await chatDAO.deleteById(id);

    if(!result){
        return res.status(500).json({success: false, message: "Something went wrong"});
    }

    return res.status(200).json({
        success: true,
        message: "Chat deleted successfully"
    });
};

export default deleteChat;

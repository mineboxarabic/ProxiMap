import { Request, Response } from "express";
import ChatDAO from "../../DAO/ChatDAO.js";

const readChat = async (req: Request, res: Response) => {
    const chatDAO = new ChatDAO();
    const id = req.params.id;

    const chat = await chatDAO.findById(id);

    if(chat){
        res.status(200).json({
            success: true,
            message: "Chat found",
            chat: chat
        });
    }else{
        res.status(404).json({
            success: false,
            message: "Chat not found"
        });
    }
};

export default readChat;

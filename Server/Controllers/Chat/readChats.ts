import { Request, Response } from "express";
import ChatDAO from "../../DAO/ChatDAO.js";

const readChats = async (req:Request, res:Response) => {
    const chatDAO = new ChatDAO();
    const id = req.params.id;

    const chat = await chatDAO.findAll();

    if(chat){
        res.status(200).json({
            success: true,
            message: "Chats found",
            chat: chat
        });
    }else{
        res.status(404).json({
            success: false,
            message: "Chats not found"
        });
    }
};

export default readChats;

import { Request, Response } from "express";
import ChatDAO from "../../DAO/ChatDAO.js";

const readUsersChats = async (req: Request, res: Response) => {

    const chatDAO = new ChatDAO();
    const userId = req.params.id;


    const chat = await chatDAO.findByUserId(userId);

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

export default readUsersChats;

import DatabaseError from "../../DAO/DataBaseError/DatabaseError.js";
import ChatDAO, { ChatResult } from "../../DAO/ChatDAO.js";
import { Request, Response } from "express";

const updateChat = async (req: Request, res:Response) => {
    const chatDAO = new ChatDAO();
    const id = req.params.id;
    const chatUpdates = req.body;

    const updatedChat: ChatResult = await chatDAO.updateById(id, chatUpdates);

    if(updatedChat instanceof DatabaseError){
        return res.status(500).json({success: false, message: "Something went wrong"});
    }

    return res.status(200).json({success: true, message: "Chat updated successfully", updatedChat});
};

export default updateChat;

import DatabaseError from "../../DAO/DataBaseError/DatabaseError.js";
import ChatDAO, { ChatResult } from "../../DAO/ChatDAO.js";
import { ChatInterface } from '../../Models/Chat';
import { Request, Response } from "express";

const createChat = async (req: Request, res: Response) => {
    const chatDAO = new ChatDAO();
    const chatDetails = req.body;

    const newChat: ChatResult = await chatDAO.create(chatDetails);

    if(newChat instanceof DatabaseError){
        return res.status(500).json({success: false, message: "Something went wrong"});
    }else{
        return res.status(201).json({success: true, message: "Chat created successfully", chat: newChat});
    }
};

export default createChat;

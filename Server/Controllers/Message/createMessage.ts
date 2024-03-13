import { Request, Response } from "express";
import DatabaseError from "../../DAO/DataBaseError/DatabaseError.js";
import MessageDAO, { MessageResult } from "../../DAO/MessageDAO.js";

const createMessage = async (req:Request, res:Response) => {
    const messageDAO = new MessageDAO();
    const messageDetails = req.body;

    const newMessage: MessageResult = await messageDAO.create(messageDetails);

    if(newMessage instanceof DatabaseError){
        return res.status(500).json({success: false, message: "Something went wrong"});
    } else {
        return res.status(201).json({success: true,  message: newMessage});
    }
};

export default createMessage;

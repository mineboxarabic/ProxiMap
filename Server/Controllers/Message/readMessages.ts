import { Request, Response } from "express";
import MessageDAO from "../../DAO/MessageDAO.js";

const readMessage = async (req:Request, res:Response) => {
    const messageDAO = new MessageDAO();
    const id = req.params.id;

    const message = await messageDAO.findAll();

    if(message) {
        res.status(200).json({
            success: true,
            message: message
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Message not found"
        });
    }
};
export const readMessagesInChat =async (req:Request, res:Response) => {
    const messageDAO = new MessageDAO();
    const id = req.params.chatId;
    console.log("Finding all messages", id);

    const message = await messageDAO.findAllById(id);

    if(message) {
        res.status(200).json({
            success: true,
            message: message
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Message not found"
        });
    }
}; 
export default readMessage;

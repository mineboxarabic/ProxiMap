import { Request, Response } from "express";
import DatabaseError from "../../DAO/DataBaseError/DatabaseError.js";
import MessageDAO, { MessageResult } from "../../DAO/MessageDAO.js";

const updateMessage = async (req:Request, res:Response) => {
    const messageDAO = new MessageDAO();
    const id = req.params.id;
    const messageUpdates = req.body;

    const updatedMessage: MessageResult = await messageDAO.updateById(id, messageUpdates);

    if(updatedMessage instanceof DatabaseError){
        return res.status(500).json({success: false, message: "Something went wrong"});
    }

    return res.status(200).json({success: true, message: "Message updated successfully", updatedMessage});
};

export default updateMessage;

import { Error } from "mongoose";
import Message, { MessageInterface } from "../Models/Message.js";
import DatabaseError from "./DataBaseError/DatabaseError.js";

interface MessageDAOInterface {
    create(message: Partial<MessageInterface>): Promise<MessageResult>;
    findById(id: string): Promise<MessageResult>;
    deleteById(id: string): Promise<MessageResult>;
    updateById(id: string, message: MessageInterface): Promise<MessageResult>;
    findAllByChatId(chatId: string): Promise<MessageArrayResult>;
    exists(id: string): Promise<boolean>;
    findAll(): Promise<MessageArrayResult>;
}

export type MessageResult = MessageInterface | DatabaseError | null;
export type MessageArrayResult = MessageInterface[] | DatabaseError | null;

class MessageDAO implements MessageDAOInterface {
    async create(message: Partial<MessageInterface>): Promise<MessageResult> {
        try {
            const newMessage = new Message(message);
            const result = await newMessage.save();
            return result;
        } catch (error) {
            return new DatabaseError('Error creating message', error);
        }
    }

    async findById(id: string): Promise<MessageResult> {
        try {
            const message = await Message.findById(id);
            return message;
        } catch (error) {
            return new DatabaseError('Error finding message by ID', error);
        }
    }

    async updateById(id: string, message: MessageInterface): Promise<MessageResult> {
        try {
            const updatedMessage = await Message.findByIdAndUpdate(id, message, { new: true });
            return updatedMessage;
        } catch (error) {
            return new DatabaseError('Error updating message by ID', error);
        }
    }

    async deleteById(id: string): Promise<MessageResult> {
        try {
            const deletedMessage = await Message.findByIdAndDelete(id);
            return deletedMessage;
        } catch (error) {
            return new DatabaseError('Error deleting message', error);
        }
    }

    async findAllByChatId(chatId: string): Promise<MessageArrayResult> {
        try {
            const messages = await Message.find({ chatId: chatId });
            return messages;
        } catch (error) {
            return new DatabaseError('Error finding messages for chat', error);
        }
    }

    async exists(id: string): Promise<boolean> {
        return (await Message.exists({ _id: id })) !== null;
    }

    async findAll(): Promise<MessageArrayResult> {
        try {
            const messages = await Message.find();
            return messages;
        } catch (error) {
            return new DatabaseError('Error finding all messages', error);
        }
    }
}

export default MessageDAO;

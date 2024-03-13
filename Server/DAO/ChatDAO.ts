import { Error } from "mongoose";
import Chat, { ChatInterface } from "../Models/Chat.js";
import DatabaseError from "./DataBaseError/DatabaseError.js";

interface ChatDAOInterface {
    create(chat: Partial<ChatInterface>): Promise<ChatResult>;
    findById(id: string): Promise<ChatResult>;
    deleteById(id: string): Promise<ChatResult>;
    updateById(id: string, chat: ChatInterface): Promise<ChatResult>;
    findAll(): Promise<ChatArrayResult>;
    exists(id: string): Promise<boolean>;
}

export type ChatResult = ChatInterface | DatabaseError | null;
export type ChatArrayResult = ChatInterface[] | DatabaseError | null;

class ChatDAO implements ChatDAOInterface {
    async create(chat: Partial<ChatInterface>): Promise<ChatResult> {
        try {
            const newChat = new Chat(chat);
            const result = await newChat.save();
            return result;
        } catch (error) {
            return new DatabaseError('Error creating chat', error);
        }
    }

    async findById(id: string): Promise<ChatResult> {
        try {
            const chat = await Chat.findById(id);
            return chat;
        } catch (error) {
            return new DatabaseError('Error finding chat by ID', error);
        }
    }

    async updateById(id: string, chat: ChatInterface): Promise<ChatResult> {
        try {
            const updatedChat = await Chat.findByIdAndUpdate(id, chat, { new: true });
            return updatedChat;
        } catch (error) {
            return new DatabaseError('Error updating chat by ID', error);
        }
    }

    async deleteById(id: string): Promise<ChatResult> {
        try {
            const deletedChat = await Chat.findByIdAndDelete(id);
            return deletedChat;
        } catch (error) {
            return new DatabaseError('Error deleting chat', error);
        }
    }

    async findAll(): Promise<ChatArrayResult> {
        try {
            const chats = await Chat.find();
            return chats;
        } catch (error) {
            return new DatabaseError('Error finding all chats', error);
        }
    }

    async exists(id: string): Promise<boolean> {
        return (await Chat.exists({ _id: id })) !== null;
    }
}

export default ChatDAO;

import mongoose, { Schema, Document } from 'mongoose';

export interface ChatInterface extends Document {
  participants: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ChatSchema: Schema<ChatInterface> = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true, validate: [arrayLimit, '{PATH} exceeds the limit of 2'] }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

function arrayLimit(val: mongoose.Schema.Types.ObjectId[]): boolean {
  return val.length === 2;
}

const Chat = mongoose.model<ChatInterface>('Chat', ChatSchema, 'chats');
export default Chat;

import mongoose, { Schema, Document } from 'mongoose';

export interface MessageInterface extends Document {
  chatId: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const MessageSchema: Schema<MessageInterface> = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model<MessageInterface>('Message', MessageSchema, 'messages');
export default Message;

import mongoose, { ObjectId, Schema } from 'mongoose';
import { Document } from 'mongoose';
export interface TokenInterface extends Document{
    token?: string;
    userId?: ObjectId;
}

const tokenSchema : Schema<TokenInterface> = new mongoose.Schema({
    token: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
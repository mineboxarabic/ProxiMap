import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Admin', 'User', 'Partner', 'Manager', 'Staff'] },
    profile: {
      bio: String,
      profilePicture: String,
    },
    createdAt: { type: Date, default: Date.now }
  });
  
const User = mongoose.model('User', userSchema);

export default User;
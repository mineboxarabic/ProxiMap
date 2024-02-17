import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, default: 'no name' },
    email: { type: String, unique: true, default: 'no email' },
    password: { type: String, default: 'no password' },
    role: { type: String, enum: ['Admin', 'User', 'Partner', 'Manager', 'Staff'], default: 'User' },
    profile: {
        address: {
            street: { type: String, default: 'no street' },
            city: { type: String, default: 'no city' },
            state: { type: String, default: 'no state' },
            zip: { type: String, default: 'no zip' }
        },
        bio: { type: String, default: 'no bio' },
        profilePicture: { type: String, default: 'no profile picture' }
    },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);
export default User;

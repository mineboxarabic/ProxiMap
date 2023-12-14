import express from 'express';
import mongoose from 'mongoose';
import UserDAO from './DAO/UserDAO.js';
import User from './Models/User.js';


const application = express();

mongoose.connect('mongodb://localhost:27017/ProxiMap');

const user = new User({
    username: 'johndoe',
    email: 'mi@ddd',
    password: '123456',
    role: 'Admin',
    profile: {
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        profilePicture: 'https://picsum.photos/200'
    }
});


application.listen(3001, () => {
    console.log('Application running on port 3001');
})
import express from 'express';
import mongoose from 'mongoose';
import UserDAO from './DAO/UserDAO.js';
import User from './Models/User.js';


const application = express();
mongoose.connect('mongodb://localhost:27017/ProxiMap');



application.listen(3001, () => {
    console.log('Application running on port 3001');
})
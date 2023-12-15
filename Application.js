import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/UserRouter.js';


const application = express();
mongoose.connect('mongodb://localhost:27017/ProxiMap');


application.use(userRouter);



application.listen(3001, () => {
    console.log('Application running on port 3001');
})
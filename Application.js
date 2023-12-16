import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/UserRouter.js';


const application = express();
mongoose.connect('mongodb://localhost:27016/ProxiMap');

application.use(express.json());
application.use(userRouter);



application.listen(3001, () => {
    console.log('Application running on port 3001');
})
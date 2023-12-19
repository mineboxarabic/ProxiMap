import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/UserRouter.js';


const application = express();
mongoose.connect('mongodb://localhost:27017/ProxiMap').then(() => {
    console.log('Connected to database');
}
).catch((err) => {
    console.log('Error connecting to database: ' + err);
}
);

application.use(express.json());
application.use(userRouter);



application.listen(3001, () => {
    console.log('Application running on port 3001');
})
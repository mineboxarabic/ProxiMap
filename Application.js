import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/UserRouter.js';
import serviceRouter from './Routes/ServiceRouter.js';

const application = express();
mongoose.connect('mongodb://localhost:27016/ProxiMap').then(() => {
    console.log('Connected to database');
}
).catch((err) => {
    console.log('Error connecting to database: ' + err);
}
);

application.use(express.json());
application.use(userRouter);
application.use(serviceRouter);


application.listen(3001, () => {
    console.log('Application running on port 3001');
})
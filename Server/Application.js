import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/UserRouter.js';
import serviceRouter from './Routes/ServiceRouter.js';
import { body } from 'express-validator';
import dotenv from 'dotenv';
import tokenRouter from './Routes/TokenRouter.js';
import cookieParser from 'cookie-parser';
import authenticationRouter from './Routes/AuthRoutes.js';
import cors from 'cors';

dotenv.config();

const application = express();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to database');
}
).catch((err) => {
    console.log("the URI is " + process.env.MONGODB_URI);
    console.log('Error connecting to database: ' + err);
}
);

application.use(express.json());
application.use(cookieParser());
//Allow CORS
const corsOptions = {
    credentials: true,
    origin: '*'
}
application.use(cors(corsOptions));
application.use(userRouter);
application.use(serviceRouter);
application.use(tokenRouter);
application.use(authenticationRouter)
console.log(process.env.BASE_URL);
//Type this in the terminal to create an infinite JWT token:

application.listen(3001, () => {
    console.log('Application running on port 3001');
})
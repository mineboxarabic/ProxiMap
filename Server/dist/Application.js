import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/UserRouter.js';
import serviceRouter from './Routes/ServiceRouter.js';
import askedServiceRouter from './Routes/AskedServiceRouter.js';
import dotenv from 'dotenv';
import tokenRouter from './Routes/TokenRouter.js';
import cookieParser from 'cookie-parser';
import authenticationRouter from './Routes/AuthRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import categoryRoute from './Routes/CategoryRouter.js';
import path from 'path';
import chatRouter from './Routes/ChatRouter.js';
import messageRouter from './Routes/MessageRouter.js';
dotenv.config();
const application = express();
const __dirname = path.resolve();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to databases');
}).catch((err) => {
    console.log("the URI is " + process.env.MONGODB_URI);
    console.log('Error connecting to databae: ' + err);
});
application.use('/Assets/profile', express.static(path.join(__dirname, 'Assets/profile')));
application.use(cookieParser());
application.use(bodyParser.urlencoded({ extended: false }));
application.use(express.json());
//Allow CORS
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
application.use(cors(corsOptions));
application.use(userRouter);
application.use(serviceRouter);
application.use(askedServiceRouter);
application.use(tokenRouter);
application.use(authenticationRouter);
application.use(categoryRoute);
application.use(chatRouter);
application.use(messageRouter);
console.log(process.env.BASE_URL);
//Type this in the terminal to create an infinite JWT token:
export default application;

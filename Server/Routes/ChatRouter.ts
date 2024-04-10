import express, { NextFunction, Request, Response, Router } from 'express';
import createChat from '../Controllers/Chat/createChat.js';
import readChat from '../Controllers/Chat/readChat.js';
import updateChat from '../Controllers/Chat/updateChat.js';
import deleteChat from '../Controllers/Chat/deleteChat.js';
import readChats from '../Controllers/Chat/readChats.js';
import checkId from '../Validators/CheckMongoId.js';
import { chatRoutes } from '../Config/AuthConfig.js';
import ValidateRes from '../Validators/ValidateRes.js';
import { autherizeUserRole } from '../Utilities/JWTUtil.js';
import isChatExist from '../Validators/chatValidator/isChatExist.js';
import readUsersChats from '../Controllers/Chat/readUsersChats.js';

const chatRouter: Router = express.Router();

// Create a chat
chatRouter.post('/chats',
(req, res, next) => autherizeUserRole(req, res, next, chatRoutes.create.allowedRoles),
createChat);

// Get a single chat
chatRouter.get('/chats/:id',
checkId,
isChatExist,
ValidateRes,
(req:Request, res:Response, next:NextFunction) => autherizeUserRole(req, res, next, chatRoutes.read.allowedRoles),
readChat);

// Get the list of chats of a user
chatRouter.get('/chats/user/:id',
(req:Request, res:Response, next:NextFunction) => autherizeUserRole(req, res, next, chatRoutes.read.allowedRoles),
readUsersChats);

// Get the list of chats
chatRouter.get('/chats',
(req:Request, res:Response, next:NextFunction) => autherizeUserRole(req, res, next, chatRoutes.read.allowedRoles),
readChats);

// Update a chat
chatRouter.put('/chats/:id',
checkId,
isChatExist,
ValidateRes,
(req:Request, res:Response, next:NextFunction) => autherizeUserRole(req, res, next, chatRoutes.update.allowedRoles),
updateChat);

// Delete a chat
chatRouter.delete('/chats/:id',
checkId,
(req:Request, res:Response, next:NextFunction) => autherizeUserRole(req, res, next, chatRoutes.delete.allowedRoles),
deleteChat);

export default chatRouter;

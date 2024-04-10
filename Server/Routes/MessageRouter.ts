import express, { Router } from 'express';
import createMessage from '../Controllers/Message/createMessage.js';
import readMessage from '../Controllers/Message/readMessage.js';
import readMessages, { readMessagesInChat } from '../Controllers/Message/readMessages.js';
import deleteMessage from '../Controllers/Message/deleteMessage.js';
import checkId from '../Validators/CheckMongoId.js';
import { messageRoutes } from '../Config/AuthConfig.js';
import ValidateRes from '../Validators/ValidateRes.js';
import { autherizeUserRole } from '../Utilities/JWTUtil.js';
import isMessageExist from '../Validators/messageValidator/isMessageExist.js';
import { NextFunction, Request, Response } from 'express';

const messageRouter: Router = express.Router();

// Create a message
messageRouter.post('/messages',
(req:Request, res:Response, next:NextFunction)  => autherizeUserRole(req, res, next, messageRoutes.create.allowedRoles),
createMessage);

// Get a single message
messageRouter.get('/messages/:id',
checkId,
isMessageExist,
ValidateRes,
(req:Request, res:Response, next:NextFunction) => autherizeUserRole(req, res, next, messageRoutes.read.allowedRoles),
readMessage);

// Get the list of messages in a chat
messageRouter.get('/messages/chat/:chatId',
ValidateRes,
(req:Request, res:Response, next:NextFunction)  => autherizeUserRole(req, res, next, messageRoutes.read.allowedRoles),
readMessagesInChat);

// Delete a message
messageRouter.delete('/messages/:id',
checkId,
(req:Request, res:Response, next:NextFunction)  => autherizeUserRole(req, res, next, messageRoutes.delete.allowedRoles),
deleteMessage);

export default messageRouter;

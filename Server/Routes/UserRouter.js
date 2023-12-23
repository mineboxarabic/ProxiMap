import express from 'express';
import createUser from '../Controllers/User/CreateUser.js';
import updateUser from '../Controllers/User/UpdateUser.js';
import deleteUser from '../Controllers/User/DeleteUser.js';
import getUser from '../Controllers/User/ReadUser.js';
import readUsers from '../Controllers/User/ReadUsers.js';
import checkId from '../Utilities/CheckMongoId.js';
import checkUser from '../Utilities/User/checkUser.js';
import { autherizeUserRole } from '../Utilities/JWTUtil.js';
import authenticateUser from '../Utilities/JWTUtil.js';
import { userRoutes } from '../Config/AuthConfig.js';

/**
 * To change the 
 */

const userRouter = express.Router();


//Get the list of users (All users)
userRouter.get('/users',authenticateUser,
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.read.allowedRoles),
readUsers);


//Get a single user
userRouter.get('/users/:id',checkId,
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.read.allowedRoles),
getUser);

//Create a user
userRouter.post('/users',checkUser, 
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.create.allowedRoles),
createUser);


//Update a user
userRouter.put('/users/:id',checkUser,checkId, 
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.update.allowedRoles),
updateUser);

//Delete a user
userRouter.delete('/users/:id',checkId,
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.delete.allowedRoles),
deleteUser);

export default userRouter;
import express from 'express';
import createUser from '../Controllers/User/CreateUser.js';
import updateUser from '../Controllers/User/UpdateUser.js';
import deleteUser from '../Controllers/User/DeleteUser.js';
import getUser from '../Controllers/User/ReadUser.js';
import readUsers from '../Controllers/User/ReadUsers.js';
import { autherizeUserRole } from '../Utilities/JWTUtil.js';
import authenticateUser from '../Utilities/JWTUtil.js';
import { userRoutes } from '../Config/AuthConfig.js';
import ValidateRes from '../Validators/ValidateRes.js';
import { checkSchema } from 'express-validator';
import isUserExist from '../Utilities/User/IsUserExist.js';
import userValidator from '../Validators/userValidator.js';
import passwordValidator from '../Validators/Users/passwordValidator.js';
import checkId from '../Validators/CheckMongoId.js';
/**
 * To change the 
 */

const userRouter = express.Router();


//Get the list of users (All users)
userRouter.get('/users',authenticateUser,
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.read.allowedRoles),
readUsers);

userRouter.get('/users/me',readUsers);


//Get a single user
userRouter.get('/users/:id',
checkId,
isUserExist,
(req, res, next) => ValidateRes(req,res,next),
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.read.allowedRoles),
getUser);

//Create a user
userRouter.post('/users',
userValidator, 
//Here we check the password beacuase we ar not checking it in the userValidator,
//Why we are not checking it in the userValidator? because we are using the same validator for the update user
//and we don't want to check the password when we are updating the user cus we are not changing it in the update
checkSchema({password: passwordValidator}),
(req, res, next) => ValidateRes(req,res,next),
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.create.allowedRoles),
createUser);


//Update a user
userRouter.put('/users/:id',
checkId,
isUserExist,
userValidator,
(req, res, next) => ValidateRes(req,res,next),
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.update.allowedRoles),
updateUser);

//Delete a user
userRouter.delete('/users/:id',checkId,
isUserExist,
(req, res, next) => ValidateRes(req,res,next),
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.delete.allowedRoles),
deleteUser);

export default userRouter;
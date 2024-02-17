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
import isUserExist from '../Validators/Users/IsUserExist.js';
import userValidator, { userValidatorEdit } from '../Validators/userValidator.js';
import passwordValidator from '../Validators/Users/passwordValidator.js';
import checkId from '../Validators/CheckMongoId.js';
import updateProfile from '../Controllers/User/UpdateProfile.js';
import updateAvatar from '../Controllers/User/UpdateProfile.js';
import multer from 'multer';
import path from 'path';
import uploadIMG from '../Validators/Users/uploadIMG.js';
import upload from '../Validators/Users/uploadIMG.js';
import getAvatar from '../Controllers/User/GetAvatar.js';

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
userValidatorEdit,
(req, res, next) => ValidateRes(req,res,next),
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.update.allowedRoles),
updateUser);

//Delete a user
userRouter.delete('/users/:id',checkId,
isUserExist,
(req, res, next) => ValidateRes(req,res,next),
(req, res, next) => autherizeUserRole(req, res, next, userRoutes.delete.allowedRoles),
deleteUser);



userRouter.post('/users/upload/:id',
upload.single('file'),
updateAvatar);

userRouter.get('/users/avatar/:id', getAvatar);


export default userRouter;
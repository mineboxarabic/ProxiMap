import express from 'express';
import createUser from '../Controllers/User/CreateUser.js';
import updateUser from '../Controllers/User/UpdateUser.js';
import deleteUser from '../Controllers/User/DeleteUser.js';
import getUser from '../Controllers/User/ReadUser.js';
import readUsers from '../Controllers/User/ReadUsers.js';
import checkId from '../Utilities/CheckMongoId.js';
import checkUser from '../Utilities/User/CheckUser.js';

const userRouter = express.Router();

userRouter.get('/users', readUsers);
userRouter.get('/users/:id',checkId, getUser);

userRouter.post('/users',checkUser, createUser);

userRouter.put('/users/:id',checkUser,checkId, updateUser);
userRouter.delete('/users/:id',checkId, deleteUser);

export default userRouter;
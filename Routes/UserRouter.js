import express from 'express';
import createUser from '../Controllers/User/CreateUser.js';
import updateUser from '../Controllers/User/UpdateUser.js';
import deleteUser from '../Controllers/User/DeleteUser.js';
import getUser from '../Controllers/User/ReadUser.js';
import readUsers from '../Controllers/User/ReadUsers.js';

const userRouter = express.Router();

userRouter.get('/users', readUsers);
userRouter.get('/users/:id', getUser);

userRouter.post('/users', createUser);

userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);

export default userRouter;
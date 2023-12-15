import express from 'express';
import UserDAO from '../DAO/UserDAO.js';

const userRouter = express.Router();

const userDAO = new UserDAO();

userRouter.post('/users', async (req, res) => {
    const user = req.body;
    const newUser = await userDAO.create(user);
    res.json(newUser);
});

userRouter.get('/users', async (req, res)=>{
    const users = await userDAO.findAll();
    res.json(users);
})



export default userRouter;
import express from 'express';
import CategoryDAO from '../DAO/CategoryDAO.js';

const categoryRouter = express.Router();

const categoryDAO = new CategoryDAO();

categoryRouter.get('/categorys', async (req, res)=>{
    const categorys = await categoryDAO.findAll();
    res.json(categorys);
});
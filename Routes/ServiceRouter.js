import express from 'express';
import ServiceDAO from '../DAO/ServiceDAO.js';

const serviceRouter = express.Router();

const serviceDAO = new ServiceDAO();

serviceRouter.get('/services', async (req, res)=>{
    const services = await serviceDAO.findAll();
    res.json(services);
});
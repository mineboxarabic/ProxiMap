import express from 'express';
import createService from '../Controllers/Service/createService.js';
import readService from '../Controllers/Service/readService.js';
import updateService from '../Controllers/Service/updateService.js';
import deleteService from '../Controllers/Service/deleteService.js';
import readServices from '../Controllers/Service/readServices.js';
import { body, validationResult } from 'express-validator';

const serviceRouter = express.Router();


serviceRouter.post('/services',[
    body('partnerId').isMongoId(),
    body('categoryId').isMongoId(),
    body('name').isString().isLength({min:30,max:1500}),
    body('description').isString(),
    body('price').isNumeric(),
    body('availability').isBoolean(),
  //  body('ratings').isArray()
],createService);
serviceRouter.get('/services/:id',[
    //Is the parameter id is a mongodb id
    
],readService);
serviceRouter.get('/services',readServices);

serviceRouter.put('/services',updateService);
serviceRouter.delete('/services', deleteService);

export default serviceRouter;

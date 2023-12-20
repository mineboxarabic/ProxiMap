import express from 'express';
import createService from '../Controllers/Service/createService.js';
import readService from '../Controllers/Service/readService.js';
import updateService from '../Controllers/Service/updateService.js';
import deleteService from '../Controllers/Service/deleteService.js';
import readServices from '../Controllers/Service/readServices.js';
import checkService from '../Utilities/Service/checkService.js';
import checkId from '../Utilities/CheckMongoId.js';
const serviceRouter = express.Router();

//Add messages too

serviceRouter.post('/services',checkService,createService);

serviceRouter.get('/services/:id',checkId,readService);
serviceRouter.get('/services',readServices);

serviceRouter.put('/services/:id',checkService,checkId,updateService);
serviceRouter.delete('/services/:id',checkId,deleteService);

export default serviceRouter;

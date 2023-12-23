import express from 'express';
import createService from '../Controllers/Service/createService.js';
import readService from '../Controllers/Service/readService.js';
import updateService from '../Controllers/Service/updateService.js';
import deleteService from '../Controllers/Service/deleteService.js';
import readServices from '../Controllers/Service/readServices.js';
import checkService from '../Utilities/Service/checkService.js';
import checkId from '../Utilities/CheckMongoId.js';
import { serviceRoutes } from '../Config/AuthConfig.js';
const serviceRouter = express.Router();

//Here we do the crud of the services

//Create a service
serviceRouter.post('/services',checkService,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.create.allowedRoles),
createService);

//Get a single service
serviceRouter.get('/services/:id',checkId,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.read.allowedRoles),
readService);

//Get the list of services (All services)
serviceRouter.get('/services',
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.read.allowedRoles)
,readServices);


//Update a service
serviceRouter.put('/services/:id',checkService,checkId,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.update.allowedRoles),
updateService);

//Delete a service
serviceRouter.delete('/services/:id',checkId,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.delete.allowedRoles),
deleteService);

export default serviceRouter;

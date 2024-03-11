import express, { Router } from 'express';
import createService from '../Controllers/Service/createService.js';
import readService from '../Controllers/Service/readService.js';
import updateService, { updateMutilpleServices } from '../Controllers/Service/updateService.js';
import deleteService from '../Controllers/Service/deleteService.js';
import readServices, { readServicesinMapView, readServicesinMapViewOfUser } from '../Controllers/Service/readServices.js';
import checkService from '../Utilities/Service/checkService.js';
import checkId from '../Validators/CheckMongoId.js';
import { serviceRoutes } from '../Config/AuthConfig.js';
import ValidateRes from '../Validators/ValidateRes.js';
import serviceValidator, { serviceValidatorEdit } from '../Validators/serviceValidator.js';
import { autherizeUserRole } from '../Utilities/JWTUtil.js';
import isServiceExist from '../Validators/serviceValidator/isServiceExist.js';

const serviceRouter : Router = express.Router();
//Here we do the crud of the services

//Create a service
serviceRouter.post('/services',
serviceValidator,
ValidateRes,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, serviceRoutes.create.allowedRoles),
createService);

//Get a single service
serviceRouter.get('/services/:id',
checkId,
isServiceExist,
ValidateRes,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, serviceRoutes.read.allowedRoles),
readService);
serviceRouter.get('/services/in-map-view/:swLat/:swLng/:neLat/:neLng', readServicesinMapView);


//Get the list of services (All services)
serviceRouter.get('/services',
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, serviceRoutes.read.allowedRoles)
,readServices);

serviceRouter.get('/services/partner/:id',
checkId,
ValidateRes,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, serviceRoutes.read.allowedRoles),
readServicesinMapViewOfUser);





//Update a service
serviceRouter.put('/services/:id',checkId,
isServiceExist,
serviceValidatorEdit,
ValidateRes,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, serviceRoutes.update.allowedRoles),
updateService);

//Update multiple services
serviceRouter.put('/services',
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, serviceRoutes.update.allowedRoles),
updateMutilpleServices);

//Delete a service
serviceRouter.delete('/services/:id',checkId,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, serviceRoutes.delete.allowedRoles),
deleteService);

export default serviceRouter;

import express from 'express';
import createService from '../Controllers/Service/createService.js';
import readService from '../Controllers/Service/readService.js';
import updateService from '../Controllers/Service/updateService.js';
import deleteService from '../Controllers/Service/deleteService.js';
import readServices, { readServicesinMapView, readServicesinMapViewOfUser } from '../Controllers/Service/readServices.js';
import checkService from '../Utilities/Service/checkService.js';
import checkId from '../Validators/CheckMongoId.js';
import { serviceRoutes } from '../Config/AuthConfig.js';
import ValidateRes from '../Validators/ValidateRes.js';
import serviceValidator, { serviceValidatorEdit } from '../Validators/serviceValidator.js';
import { autherizeUserRole } from '../Utilities/JWTUtil.js';
import { checkSchema, param } from 'express-validator';
import isServiceExist from '../Validators/serviceValidator/isServiceExist.js';

const serviceRouter = express.Router();

//Here we do the crud of the services

//Create a service
serviceRouter.post('/services',
serviceValidator,
ValidateRes,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.create.allowedRoles),
createService);

//Get a single service
serviceRouter.get('/services/:id',
checkId,
isServiceExist,
ValidateRes,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.read.allowedRoles),
readService);

//Get the list of services (All services)
serviceRouter.get('/services',
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.read.allowedRoles)
,readServices);

serviceRouter.get('/services/partner/:id',
checkId,
ValidateRes,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.read.allowedRoles),
readServicesinMapViewOfUser);


serviceRouter.get(
    '/services/in-map-view/:swLat/:swLng/:neLat/:neLng', readServicesinMapView);




//Update a service
serviceRouter.put('/services/:id',checkId,
isServiceExist,
serviceValidatorEdit,
ValidateRes,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.update.allowedRoles),
updateService);

//Delete a service
serviceRouter.delete('/services/:id',checkId,
(req, res, next) => autherizeUserRole(req, res, next, serviceRoutes.delete.allowedRoles),
deleteService);

export default serviceRouter;

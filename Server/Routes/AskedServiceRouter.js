import express from 'express';
import createAskedService from '../Controllers/AskedService/createAskedService.js';
import readAskedService from '../Controllers/AskedService/readAskedService.js';
import updateAskedService from '../Controllers/AskedService/updateAskedService.js';
import deleteAskedService from '../Controllers/AskedService/deleteAskedService.js';
import readAskedServices, { readAskedServicesinMapView, readAskedServicesinMapViewOfUser } from '../Controllers/AskedService/readAskedServices.js';
import checkId from '../Validators/CheckMongoId.js';
import { askedServiceRoutes } from '../Config/AuthConfig.js';
import ValidateRes from '../Validators/ValidateRes.js';
import askedServiceValidator, { askedServiceValidatorEdit } from '../Validators/askedServiceValidator.js';
import { autherizeUserRole } from '../Utilities/JWTUtil.js';
import { checkSchema, param } from 'express-validator';
import isAskedServiceExist from '../Validators/askedServiceValidator/isAskedServiceExist.js';

const askedServiceRouter = express.Router();

//Here we do the crud of the askedServices

//Create a askedService
askedServiceRouter.post('/askedServices',
askedServiceValidator,
ValidateRes,
(req, res, next) => autherizeUserRole(req, res, next, askedServiceRoutes.create.allowedRoles),
createAskedService);

//Get a single askedService
askedServiceRouter.get('/askedServices/:id',
checkId,
isAskedServiceExist,
ValidateRes,
(req, res, next) => autherizeUserRole(req, res, next, askedServiceRoutes.read.allowedRoles),
readAskedService);

//Get the list of askedServices (All askedServices)
askedServiceRouter.get('/askedServices',
(req, res, next) => autherizeUserRole(req, res, next, askedServiceRoutes.read.allowedRoles)
,readAskedServices);

askedServiceRouter.get('/askedServices/partner/:id',
checkId,
ValidateRes,
(req, res, next) => autherizeUserRole(req, res, next, askedServiceRoutes.read.allowedRoles),
readAskedServicesinMapViewOfUser);


askedServiceRouter.get('/askedServices/in-map-view/:swLat/:swLng/:neLat/:neLng', readAskedServicesinMapView);




//Update a askedService
askedServiceRouter.put('/askedServices/:id',checkId,
isAskedServiceExist,
askedServiceValidatorEdit,
ValidateRes,
(req, res, next) => autherizeUserRole(req, res, next, askedServiceRoutes.update.allowedRoles),
updateAskedService);




//Delete a askedService
askedServiceRouter.delete('/askedServices/:id',checkId,
(req, res, next) => autherizeUserRole(req, res, next, askedServiceRoutes.delete.allowedRoles),
deleteAskedService);

export default askedServiceRouter;

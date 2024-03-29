import express from 'express';
import createCategory from '../Controllers/Category/createCategory.js';
import readCategory from '../Controllers/Category/readCategory.js';
import updateCategory from '../Controllers/Category/updateCategory.js';
import deleteCategory from '../Controllers/Category/deleteCategory.js';
import readCategorys from '../Controllers/Category/readCategorys.js';
import checkId from '../Validators/CheckMongoId.js';
import { categoryRoutes } from '../Config/AuthConfig.js';
import ValidateRes from '../Validators/ValidateRes.js';
import categoryValidator, { categoryValidatorEdit } from '../Validators/categoryValidator.js';
import { autherizeUserRole } from '../Utilities/JWTUtil.js';
import isCategoryExist from '../Validators/Category/isCategoryExist.js';
const categoryRoute = express.Router();

//Here we do the crud of the categorys

//Create a service
categoryRoute.post('/categorys',
categoryValidator,
ValidateRes,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, categoryRoutes.create.allowedRoles),
createCategory);

//Get a single service
categoryRoute.get('/categorys/:id',
checkId,
isCategoryExist,
ValidateRes,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, categoryRoutes.read.allowedRoles),
readCategory);

//Get the list of categorys (All categorys)
categoryRoute.get('/categorys',
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, categoryRoutes.read.allowedRoles)
,readCategorys);


//Update a service
categoryRoute.put('/categorys/:id',checkId,
categoryValidatorEdit,
ValidateRes,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, categoryRoutes.update.allowedRoles),
updateCategory);

//Delete a service
categoryRoute.delete('/categorys/:id',checkId,
(req: any, res: any, next: any) => autherizeUserRole(req, res, next, categoryRoutes.delete.allowedRoles),
deleteCategory);

export default categoryRoute;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import createToken from '../Controllers/Token/CreateToken.js';
import updateToken from '../Controllers/Token/UpdateToken.js';
import deleteToken from '../Controllers/Token/DeleteToken.js';
import getToken from '../Controllers/Token/ReadToken.js';
import readTokens from '../Controllers/Token/ReadTokens.js';
import checkId from '../Validators/CheckMongoId.js';
import checkToken from '../Utilities/Token/CheckToken.js';
import UserDAO from '../DAO/UserDAO.js';
const tokenRouter = express.Router();
const isUserExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userDAO = new UserDAO();
    const id = req.body.userId;
    try {
        const user = yield userDAO.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
tokenRouter.get('/tokens', readTokens);
tokenRouter.get('/tokens/:id', checkId, getToken);
tokenRouter.post('/tokens', checkToken, isUserExist, createToken);
tokenRouter.put('/tokens/:id', checkToken, checkId, updateToken);
tokenRouter.delete('/tokens/:id', checkId, deleteToken);
export default tokenRouter;

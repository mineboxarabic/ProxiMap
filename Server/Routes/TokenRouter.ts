import express from 'express';
import createToken from '../Controllers/Token/CreateToken.js';
import updateToken from '../Controllers/Token/UpdateToken.js';
import deleteToken from '../Controllers/Token/DeleteToken.js';
import getToken from '../Controllers/Token/ReadToken.js';
import readTokens from '../Controllers/Token/ReadTokens.js';
import checkId from '../Validators/CheckMongoId.js';
import checkToken from '../Utilities/Token/CheckToken.js';
import UserDAO from '../DAO/UserDAO.js';
import TokenDAO from '../DAO/TokenDAO.js';


const tokenRouter = express.Router();
const isUserExist = async (req: any, res: any, next: any) => {
    const userDAO = new UserDAO();
    const id = req.body.userId;

    try {
        const user = await userDAO.findById(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

tokenRouter.get('/tokens', readTokens);
tokenRouter.get('/tokens/:id',checkId, getToken);

tokenRouter.post('/tokens',checkToken, isUserExist, createToken);

tokenRouter.put('/tokens/:id',checkToken,checkId, updateToken);
tokenRouter.delete('/tokens/:id',checkId, deleteToken);








export default tokenRouter;
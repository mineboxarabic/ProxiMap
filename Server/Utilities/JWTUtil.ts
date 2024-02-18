import JWT, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import TokenDAO from "../DAO/TokenDAO.js";
import { ObjectId, Schema } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { TokenInterface } from "../Models/Token.js";
import { UserInterface } from "../Models/User.js";

dotenv.config();

// Interface for user object
export interface UserPayLoad{
    _id: ObjectId;
    username: string;
    email: string;
    role: string;
  }
//Verify if the token is valid and not expired
const verifyToken = (token: string) : UserPayLoad =>  {
    
    return JWT.verify(token, process.env.ACCESS_TOKEN!) as UserPayLoad;
};
declare module 'express-serve-static-core' {
    interface Request {
      user?: UserPayLoad;
    }
  }
//Generate a new token
export const generateToken = (user: UserInterface) : string => {
    return JWT.sign({
    _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.ACCESS_TOKEN!, { expiresIn: '15s' });
};


//Generate a new refresh token
export const refreshToken = (token: string): string => {
    const decoded: UserPayLoad = JWT.verify(token, process.env.REFRESH_TOKEN!) as UserPayLoad;
    return JWT.sign({
      _id: decoded._id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role
    }, process.env.ACCESS_TOKEN!, { expiresIn: '15s' });
  };


//Verify if the user is authenticated by checking the token of the user
const authenticateUser = async (req: Request, res: Response, next: NextFunction) =>{
    const accessToken = req?.cookies?.accessToken;
    const refreshToken = req?.cookies?.refreshToken;
    if(!accessToken && !refreshToken){
        return res.status(403).json({message: 'You are not authenticated'});
    }
    const user = JWT.verify(refreshToken, process.env.REFRESH_TOKEN!) as UserPayLoad;

    if(!user){
        return res.status(403).json({message: 'Refresh token is not valid'});
    }

    try{
        const decoded = verifyToken(accessToken);
        req.user = decoded;
        next();
    }
    catch(err) {
        // Check if the error is due to token expiry and you have a refresh token
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (err.name == 'TokenExpiredError') {
            try {


                console.log("It's finished");


                const cookies = req.cookies;
               

                const newToken = JWT.sign({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }, process.env.ACCESS_TOKEN!, { expiresIn: '15s' });

                const tokenDAO = new TokenDAO();
                const newTokenObj : TokenInterface = {
                    token: newToken,
                    userId: user._id
                }

                tokenDAO.create(newTokenObj);

                res.cookie('accessToken', newToken, { httpOnly: true }); // Set new token
                next();
            } catch (refreshErr) {
                // If refresh fails, force re-login
                return res.status(403).json({ message: 'Token expired, please log in again' });
            }
        } else {
            // For other token errors
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
    
  
    

}

export const autherizeUserRole = (req: Request, res: Response, next: NextFunction, allowedRoles: any) => {
    const refreshToken = req.cookies?.refreshToken;
    const user = JWT.verify(refreshToken, process.env.REFRESH_TOKEN!) as UserPayLoad;

    const userRole: string = user.role;

    if(allowedRoles.includes(userRole)){
        next();
    }else{
        return res.status(403).json({message : "You are not allowed to access this resource" + 'The allowed roles are: ' + allowedRoles.join(',' )});
    }
}
export default authenticateUser;


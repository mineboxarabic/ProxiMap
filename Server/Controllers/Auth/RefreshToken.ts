import TokenDAO from "../../DAO/TokenDAO.js";
import UserDAO from "../../DAO/UserDAO.js";
import { UserPayLoad, generateToken } from "../../Utilities/JWTUtil.js";
import JWT from "jsonwebtoken";
import User from '../../Models/User';
import { Request, Response } from "express";

const RefreshToken = async (req: Request, res: Response) => {
    const cookie = req.cookies;
    console.log('cookie',cookie);
    //If there is no refresh token, return 401

    if (!cookie?.refreshToken) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    const refreshToken = cookie?.refreshToken;


    try{
    const decoded: UserPayLoad = JWT.verify(refreshToken, process.env.REFRESH_TOKEN!) as UserPayLoad;
    const newAccessToken = generateToken(decoded);

    const tokenDAO = new TokenDAO();
    tokenDAO.create({ token: newAccessToken, userId: decoded._id });

    const userDAO = new UserDAO();
    const user = await userDAO.findById(decoded._id.toString());

    return res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    }).status(200).json({ message: "Token refreshed successfully" , accessToken: newAccessToken, user: user});


}catch(error){
    return res.status(401).json({ message: "You are not authenticated" });
}







}

export default RefreshToken;
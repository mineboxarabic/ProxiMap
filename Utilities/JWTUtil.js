import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import TokenDAO from "../DAO/TokenDAO.js";
dotenv.config();

const verifyToken = (token) => {
    return JWT.verify(token, process.env.ACCES_TOKEN);
};
export const generateToken = (user) => {
    return JWT.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
};


export const refreshToken = (user) => {
    const tokenDAO = new TokenDAO();
    const token = JWT.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
    tokenDAO.create({ token: token });
    return token;
}

const authorizeUser = (req, res, next) =>{
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({message: 'Access denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
  
    
}
export default authorizeUser;


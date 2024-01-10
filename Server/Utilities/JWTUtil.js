import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import TokenDAO from "../DAO/TokenDAO.js";
dotenv.config();


//Verify if the token is valid and not expired
const verifyToken = (token) => {
    
    return JWT.verify(token, process.env.ACCESS_TOKEN);
};

//Generate a new token
export const generateToken = (user) => {
    return JWT.sign({
    _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
};


//Generate a new refresh token
export const refreshToken = (token) => {

    let newToken = '';
    JWT.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
        if(err){
            throw new Error("Invalid token");
        }
        newToken = JWT.sign({
            _id: decoded._id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role
        }, process.env.ACCESS_TOKEN, { expiresIn: '15s' });
    });
    return accessToken;
}


//Verify if the user is authenticated by checking the token of the user
const authenticateUser = (req, res, next) =>{
    const accessToken = req?.cookies?.accessToken;
    const refreshToken = req?.cookies?.refreshToken;
    if(!accessToken && !refreshToken){
        return res.status(403).json({message: 'You are not authenticated'});
    }
    const user = JWT.verify(refreshToken, process.env.REFRESH_TOKEN);

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
        if (err.name == 'TokenExpiredError') {
            try {


                console.log("It's finished");


                const cookies = req.cookies;
               

                const newToken = JWT.sign({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }, process.env.ACCESS_TOKEN, { expiresIn: '15s' });



                const tokenDAO = new TokenDAO();
                tokenDAO.create({ token: newToken , userId: user._id });



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

export const autherizeUserRole = (req, res, next, allowedRoles) => {
    const refreshToken = req.cookies?.refreshToken;
    const user = JWT.verify(refreshToken, process.env.REFRESH_TOKEN);
    const userRole = user.role;

    if(allowedRoles.includes(userRole)){
        next();
    }else{
        return res.status(403).json({message : "You are not allowed to access this resource" + 'The allowed roles are: ' + allowedRoles.join(',' )});
    }
}
export default authenticateUser;


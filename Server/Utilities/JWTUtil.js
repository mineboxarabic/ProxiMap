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
export const refreshToken = (refreshToken) => {

    let accessToken = null;
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        //if the refresh token is valid, generate a new token
        if (!err) {
            accessToken = generateToken(user);
        }
    });

    return accessToken;
}


//Verify if the user is authenticated by checking the token of the user
const authenticateUser = (req, res, next) =>{
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({message: 'Access denied'});
    }
    try{
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch(err) {
        // Check if the error is due to token expiry and you have a refresh token
        if (err.name == 'TokenExpiredError' && req.cookies.refreshToken) {
            try {
                console.log("It's finished");
                const newToken = refreshToken(req.cookies.refreshToken); // Implement this
                res.cookie('accessToken', newToken, { httpOnly: true }); // Set new token
                req.user = verifyToken(newToken); // Verify and set user

                const tokenDAO = new TokenDAO();
                tokenDAO.create({ token: newToken , userId: req.user._id });



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
    const userRole = req.user.role;
    console.log(req.user);
    if(allowedRoles.includes(userRole)){
        next();
    }else{
        res.status(403).json({message : "You are not allowed to access this resource" + 'The allowed roles are: ' + allowedRoles.join(',' )});
    }
}
export default authenticateUser;


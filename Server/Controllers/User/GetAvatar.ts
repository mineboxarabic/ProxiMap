import UserDAO from "../../DAO/UserDAO.js";
import upload from "../../Validators/Users/uploadIMG.js";
import ValidateRes from "../../Validators/ValidateRes.js";
import multer from 'multer';
import path from 'path';


const getAvatar = async (req, res) => {
    const id = req.params.id;
    const userDAO = new UserDAO();

    try {
        const user = await userDAO.findById(id);
        if (!user || !user.profile.profilePicture) {
            return res.status(404).send('Avatar not found');
        }

        // Assuming avatarUrl is a path to the file on the server
        res.sendFile(user.profile.profilePicture, { root: '.' });
    } catch (error) {
        console.error('Error fetching avatar:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default getAvatar;

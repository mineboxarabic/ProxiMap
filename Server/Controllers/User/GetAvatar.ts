import UserDAO from "../../DAO/UserDAO.js";
import upload from "../../Validators/Users/uploadIMG.js";
import ValidateRes from "../../Validators/ValidateRes.js";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'mult... Remove this comment to see the full error message
import multer from 'multer';
import path from 'path';


const getAvatar = async (req: any, res: any) => {
    const id = req.params.id;
    const userDAO = new UserDAO();

    try {
        const user = await userDAO.findById(id);
        // @ts-expect-error TS(2339): Property 'profile' does not exist on type '(Docume... Remove this comment to see the full error message
        if (!user || !user.profile.profilePicture) {
            return res.status(404).send('Avatar not found');
        }

        // Assuming avatarUrl is a path to the file on the server
        // @ts-expect-error TS(2339): Property 'profile' does not exist on type '(Docume... Remove this comment to see the full error message
        res.sendFile(user.profile.profilePicture, { root: '.' });
    } catch (error) {
        console.error('Error fetching avatar:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default getAvatar;

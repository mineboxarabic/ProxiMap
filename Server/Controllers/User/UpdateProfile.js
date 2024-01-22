import UserDAO from "../../DAO/UserDAO.js";
import upload from "../../Validators/Users/uploadIMG.js";
import ValidateRes from "../../Validators/ValidateRes.js";
import multer from 'multer';
import path from 'path';


const updateAvatar = async (req, res) => {
    const userDAO = new UserDAO();
    const id = req.params.id;
    const file = req.file;

    
    if(!file){
        return res.status(400).json({
            success: false,
            message: "Please upload a file"
        })
    }

    const fileName = file.filename;

    const avatarUrl = `${req.protocol}://${req.get('host')}/Assets/profile/${fileName}`;


    const user = await userDAO.updateAvatar(id, avatarUrl);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        avatarUrl // Send back the URL of the updated avatar
    });

};

export default updateAvatar;

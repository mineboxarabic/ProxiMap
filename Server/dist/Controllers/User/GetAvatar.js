var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserDAO from "../../DAO/UserDAO.js";
const getAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userDAO = new UserDAO();
    try {
        const user = yield userDAO.findById(id);
        // @ts-expect-error TS(2339): Property 'profile' does not exist on type '(Docume... Remove this comment to see the full error message
        if (!user || !user.profile.profilePicture) {
            return res.status(404).send('Avatar not found');
        }
        // Assuming avatarUrl is a path to the file on the server
        // @ts-expect-error TS(2339): Property 'profile' does not exist on type '(Docume... Remove this comment to see the full error message
        res.sendFile(user.profile.profilePicture, { root: '.' });
    }
    catch (error) {
        console.error('Error fetching avatar:', error);
        res.status(500).send('Internal Server Error');
    }
});
export default getAvatar;

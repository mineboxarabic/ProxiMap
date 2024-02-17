var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../Models/User.js";
//Allowed characters are letters and numbers and @ and _ and - 
class UserDAO {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User(user);
            const result = yield newUser.save().catch((err) => {
                console.log('\x1b[31m%s\x1b[0m', "Database Error: " + err);
                return { error: err };
            });
            return result;
        });
    }
    //Read
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findById(id).catch((err) => {
                return { error: err };
            });
            return user;
        });
    }
    //Update
    updateById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findByIdAndUpdate(id, user).catch((err) => {
                return { error: err };
            });
        });
    }
    //Delete
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findByIdAndDelete(id).catch((err) => {
                return null;
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.find();
        });
    }
    findByUserNameAndPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findOne({ username: username, password: password });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findOne({ email: email });
        });
    }
    findByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findOne({ username: username });
        });
    }
    updateAvatar(id, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            //Update only the profilePicture field but keep the rest of the profile the same
            return yield User.findByIdAndUpdate(id, { profile: { profilePicture: fileName } }).catch((err) => {
                return { error: err };
            });
        });
    }
}
export default UserDAO;

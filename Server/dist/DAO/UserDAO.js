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
import DatabaseError from "./DataBaseError/DatabaseError.js";
class UserDAO {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new User(user);
                const result = yield newUser.save();
                return result;
            }
            catch (error) {
                return new DatabaseError('Error creating user', error);
            }
        });
    }
    //Read
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findById(id);
                return user;
            }
            catch (error) {
                return new DatabaseError('Error finding user by ID', error);
            }
        });
    }
    //Update
    updateById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield User.findByIdAndUpdate(id, user);
                return updatedUser;
            }
            catch (error) {
                return new DatabaseError('Error updating user by ID', error);
            }
        });
    }
    //Delete
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield User.findByIdAndDelete(id);
                return deletedUser;
            }
            catch (error) {
                return new DatabaseError('Error deleting user', error);
            }
        });
    }
    //Read
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.find();
                return users;
            }
            catch (error) {
                return new DatabaseError('Error finding all users', error);
            }
        });
    }
    findByUserNameAndPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ username: username, password: password });
                return user;
            }
            catch (error) {
                return new DatabaseError('Error finding user by username and password', error);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User
                    .findOne({ email: email });
                return user;
            }
            catch (error) {
                return new DatabaseError('Error finding user by email', error);
            }
        });
    }
    findByUserName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User
                    .findOne({ username: username });
                return user;
            }
            catch (error) {
                return new DatabaseError('Error finding user by username', error);
            }
        });
    }
    updateAvatar(id, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield User.findByIdAndUpdate(id, { profile: { profilePicture: fileName } });
                return updated;
            }
            catch (error) {
                return new DatabaseError('Error updating user avatar', error);
            }
        });
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('idx', id);
            return (yield User.exists({ _id: id })) !== null;
        });
    }
}
export default UserDAO;

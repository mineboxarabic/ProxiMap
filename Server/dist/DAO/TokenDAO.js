var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Token from "../Models/Token.js";
import DatabaseError from "./DataBaseError/DatabaseError.js";
class TokenDAO {
    create(tokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newToken = new Token(tokenData);
                const result = yield newToken.save();
                return result;
            }
            catch (error) {
                return new DatabaseError('Error creating token', error);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield Token.findById(id);
                return token;
            }
            catch (error) {
                return new DatabaseError('Error finding token by ID', error);
            }
        });
    }
    updateById(id, tokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedToken = yield Token.findByIdAndUpdate(id, tokenData, { new: true });
                return updatedToken;
            }
            catch (error) {
                return new DatabaseError('Error updating token by ID', error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Token.findByIdAndDelete(id);
                return null; // Assuming deletion success returns no result
            }
            catch (error) {
                return new DatabaseError('Error deleting token', error);
            }
        });
    }
    deleteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield Token.deleteMany({ userId: userId });
                return deletedUser; // Assuming deletion success returns no result
            }
            catch (error) {
                return new DatabaseError('Error deleting tokens by user ID', error);
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield Token.findByIdAndDelete(id);
                return deletedUser; // Assuming deletion success returns no result
            }
            catch (error) {
                return new DatabaseError('Error deleting token by ID', error);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield Token.find();
                return tokens;
            }
            catch (error) {
                return new DatabaseError('Error finding all tokens', error);
            }
        });
    }
    findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield Token.find({ token: token });
                return tokens;
            }
            catch (error) {
                return new DatabaseError('Error finding token by token string', error);
            }
        });
    }
    findByUserIdAndToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield Token.find({ userId: userId, token: token });
                return tokens;
            }
            catch (error) {
                return new DatabaseError('Error finding token by user ID and token string', error);
            }
        });
    }
}
export default TokenDAO;

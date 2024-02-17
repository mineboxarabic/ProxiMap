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
class TokenDAO {
    create(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new Token(token);
            const result = yield newUser.save().catch((err) => {
                return { error: err };
            });
            return result;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield Token.findById(id).catch((err) => {
                return { error: err };
            });
            return token;
        });
    }
    updateById(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token.findByIdAndUpdate(id, token).catch((err) => {
                return { error: err };
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token.findByIdAndDelete(id).catch((err) => {
                return null;
            });
        });
    }
    deleteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield Token.find({ userId: userId.toString() });
            return yield Token.deleteMany({ userId: userId }).catch((err) => {
                return null;
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token.findByIdAndDelete(id).catch((err) => {
                return null;
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token.find();
        });
    }
    findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token.findOne({ token: token });
        });
    }
    findByUserIdAndToken(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Token.find({ token: token, userId: userId });
        });
    }
}
export default TokenDAO;

import Token from "../Models/Token.js";

class TokenDAO {
    async create(token) {
        const newUser = new Token(token);
        
        const result = await newUser.save().catch((err) => {
            return {error: err};
        });

        return result;
    }

    async findById(id) {
        const token = await Token.findById(id).catch((err) => { 
            return {error: err};
        });
        return token;
    }

    async updateById(id, token) {
        return await Token.findByIdAndUpdate(id, token).catch((err) => {
            return {error: err};
        });
    }

    async delete(id){
        return await Token.findByIdAndDelete(id).catch((err) => {
            return null;
        });
    }
    async deleteByUserId(userId) {
        const tokens = await Token.find({userId: userId.toString()});
        return await Token.deleteMany({userId: userId}).catch((err) => {
            return null;
        });
    }
    async deleteById(id) {
        return await Token.findByIdAndDelete(id).catch((err) => {
            return null;
        });
    }


    async findAll() {
        return await Token.find();
    }

    async findByToken(token){
        return await Token.findOne({token: token});
    }

    async findByUserIdAndToken(token, userId){
        return await Token.find({token: token, userId: userId});
    }

}
export default TokenDAO;
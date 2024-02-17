import Token from "../Models/Token.js";

class TokenDAO {
    async create(token: any) {
        const newUser = new Token(token);
        
        const result = await newUser.save().catch((err) => {
            return {error: err};
        });

        return result;
    }

    async findById(id: any) {
        const token = await Token.findById(id).catch((err) => { 
            return {error: err};
        });
        return token;
    }

    async updateById(id: any, token: any) {
        return await Token.findByIdAndUpdate(id, token).catch((err) => {
            return {error: err};
        });
    }

    async delete(id: any){
        return await Token.findByIdAndDelete(id).catch((err) => {
            return null;
        });
    }
    async deleteByUserId(userId: any) {
        const tokens = await Token.find({userId: userId.toString()});
        return await Token.deleteMany({userId: userId}).catch((err) => {
            return null;
        });
    }
    async deleteById(id: any) {
        return await Token.findByIdAndDelete(id).catch((err) => {
            return null;
        });
    }


    async findAll() {
        return await Token.find();
    }

    async findByToken(token: any){
        return await Token.findOne({token: token});
    }

    async findByUserIdAndToken(token: any, userId: any){
        return await Token.find({token: token, userId: userId});
    }

}
export default TokenDAO;
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

    async deleteById(id) {
        return await Token.findByIdAndDelete(id).catch((err) => {
            return null;
        });
    }


    async findAll() {
        return await Token.find();
    }

}
export default TokenDAO;
import Token, { TokenInterface } from "../Models/Token.js";
import DatabaseError from "./DataBaseError/DatabaseError.js";


interface TokenDAOInterface {
    create(token: Partial<TokenInterface>): Promise<TokenResult >;
    findById(id: string): Promise<TokenResult>;
    updateById(id: string, token: TokenInterface): Promise<TokenResult>;
    delete(id: string): Promise<TokenResult>;
    deleteByUserId(userId: string): Promise<TokenArrayResult>;
    deleteById(id: string): Promise<TokenResult>;
    findAll(): Promise<TokenArrayResult>;
    findByToken(token: string): Promise<TokenArrayResult>;
    findByUserIdAndToken(token: string, userId: string): Promise<TokenArrayResult>;

}

type TokenResult = TokenInterface | DatabaseError | null;

type TokenArrayResult = TokenInterface[] | DatabaseError | null;

class TokenDAO implements TokenDAOInterface {
    async create(tokenData: Partial<TokenInterface>): Promise<TokenResult> {
        try {
            const newToken = new Token(tokenData);
            const result = await newToken.save();
            return result;
        } catch (error) {
            return new DatabaseError('Error creating token', error);
        }
    }

    async findById(id: string): Promise<TokenResult> {
        try {
            const token = await Token.findById(id);
            return token;
        } catch (error) {
            return new DatabaseError('Error finding token by ID', error);
        }
    }

    async updateById(id: string, tokenData: TokenInterface): Promise<TokenResult> {
        try {
            const updatedToken = await Token.findByIdAndUpdate(id, tokenData, { new: true });
            return updatedToken;
        } catch (error) {
            return new DatabaseError('Error updating token by ID', error);
        }
    }

    async delete(id: string): Promise<TokenResult> {
        try {
            await Token.findByIdAndDelete(id);
            return null; // Assuming deletion success returns no result
        } catch (error) {
            return new DatabaseError('Error deleting token', error);
        }
    }

    async deleteByUserId(userId: string): Promise<TokenArrayResult> {
        try {
            const deletedUser : any = await Token.deleteMany({ userId: userId });
            return deletedUser; // Assuming deletion success returns no result
        } catch (error) {
            return new DatabaseError('Error deleting tokens by user ID', error);
        }
    }

    async deleteById(id: string): Promise<TokenResult> {
        try {
            const deletedUser = await Token.findByIdAndDelete(id);
            return deletedUser; // Assuming deletion success returns no result
        } catch (error) {
            return new DatabaseError('Error deleting token by ID', error);
        }
    }


    async findAll(): Promise<TokenArrayResult> {
        try {
            const tokens = await Token.find();
            return tokens;
        } catch (error) {
            return new DatabaseError('Error finding all tokens', error);
        }
    }

    async findByToken(token: string): Promise<TokenArrayResult> {
        try {
            const tokens = await Token.find({ token: token });
            return tokens;
        } catch (error) {
            return new DatabaseError('Error finding token by token string', error);
        }
    }

    async findByUserIdAndToken(userId: string, token: string): Promise<TokenArrayResult> {
        try {
            const tokens = await Token.find({ userId: userId, token: token });
            return tokens;
        } catch (error) {
            return new DatabaseError('Error finding token by user ID and token string', error);
        }
    }

    // Removed duplicate deleteById as it's already defined.
}

export default TokenDAO;

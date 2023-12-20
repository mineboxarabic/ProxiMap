import createToken from "../../Controllers/Token/CreateToken";
import jest from "jest-mock";
import mongoose from "mongoose";
import readToken from "../../Controllers/Token/ReadToken";
import updateToken from "../../Controllers/Token/UpdateToken";
import deleteToken from "../../Controllers/Token/DeleteToken";
import dotenv from "dotenv";
import axios from "axios";
import e from "express";
dotenv.config();

let tokenId = "";

const baseURL = process.env.BASE_URL + 'tokens';
beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (err) {
        console.log('Error connecting to database: ' + err);
        throw err; // Rethrow the error to make sure Jest is aware of it
    }
});

afterAll(() => {
    mongoose.disconnect();
});

describe("Token error checking CRUD functions (ENDPOINTS TESTING) ",  () => {


        let token = {
            token: "token",
            userId: "657c2819d06716856bf1cf73",
        }
    
    test("Create a token to a non existant user", async () => {
        const id = '657c2819d06716856bf1cf73'
        token.userId = "657c2819d06f168c6bf1cf73";
        const response = await axios.post(baseURL,token).catch((err)=>{
            console.log("Error:", err.response ? err.response.data : err);
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(404);
        })
       
        expect(response).toBeUndefined();




       return;
    });
    
});
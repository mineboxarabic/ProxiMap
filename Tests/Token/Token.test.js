import createToken from "../../Controllers/Token/CreateToken";
import jest from "jest-mock";
import mongoose from "mongoose";
import readToken from "../../Controllers/Token/ReadToken";
import updateToken from "../../Controllers/Token/UpdateToken";
import deleteToken from "../../Controllers/Token/DeleteToken";
import dotenv from "dotenv";
dotenv.config();
const randomEmail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let tokenId = "";

beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to database');
    }
    ).catch((err) => {
        console.log('Error connecting to database: ' + err);
    }
    );
});

afterAll(() => {
    mongoose.disconnect();
});

describe("Token CRUD functions (NO ENDPOINTS TESTING) ",  () => {
    console.log(randomEmail);
    let req = {
        body:{
            token: "fidjsaoiejro2ij0iej2oie",
            userId: "657c2819d06716856bf1cf73",
        }
    }

    let res = {
        status: jest.fn((statusCode) =>{
            res.statusCode = statusCode;
            return res;
        }),
        json: jest.fn((data) =>{
            res.jsonData = data;
            return res;
        })
    }


    test("Create a new token", async () => {
        await createToken(req, res);
        console.log('\x1b[32m%s\x1b[0m', "Response: " + JSON.stringify(res));
        expect(res.statusCode).toBe(201);
        tokenId = res.jsonData["_id"];
        console.log('\x1b[32m%s\x1b[0m', "Token ID: " + tokenId);
    });

    test("Read a token", async () => {
        req.params = {
            id: tokenId
        }
        await readToken(req, res);
        expect(res.statusCode).toBe(200);
    });

    test("Update a token", async () => {
        let req = {
            body:{
                token: "updatedToken",
                userId: "657c2819d06716856bf1cf73",
            }
        }

        req.params = {
            id: tokenId
        }
        await updateToken(req, res);
        console.log('\x1b[32m%s\x1b[0m', "Response update: " + JSON.stringify(res));
        expect(res.statusCode).toBe(200);
        
    });

    test("Delete a token", async () => {
        req.params = {
            id: tokenId
        }
        await deleteToken(req, res);
        expect(res.statusCode).toBe(200);
    });

    

});
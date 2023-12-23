import createToken from "../../Controllers/Token/CreateToken";
import jest from "jest-mock";
import mongoose from "mongoose";
import readToken from "../../Controllers/Token/ReadToken";
import updateToken from "../../Controllers/Token/UpdateToken";
import deleteToken from "../../Controllers/Token/DeleteToken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

let tokenId = "";

const baseURL = process.env.BASE_URL + 'tokens';
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

describe("Token CRUD functions (ENDPOINTS TESTING) ",  () => {
    let token = {
        token: "token",
        userId: "657c2819d06716856bf1cf73",
    }
    //Create 
    test("Create a new token", async () => {
        const response = await axios.post(baseURL,token).catch((err)=>{
            console.log("Error:", err.response ? err.response.data : err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(201)
        tokenId = response.data._id;
    });

    //Read
    test("Read a token", async () => {
        const response = await axios.get(baseURL + '/' + tokenId).catch(err=>{
            console.log("Error: ", err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(200)
        console.log("The token is: ", response.data);
    });

    //Update
    test("Update a new token", async () =>{
        let token2 = token;
        token2.token = "Updated Tokenname";
        const response = await axios.put(baseURL + '/' + tokenId, token2).catch(err=>{
            console.log("Error: ", err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(200)
        console.log("The token is: ", response.data);
    });

    //Delete
    test("Delete a token", async () =>{
        const response = await axios.delete(baseURL + '/' + tokenId).catch(err=>{
            console.log("Error: ", err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(200)
        console.log("The token is: ", response.data);
    });



    
    
});
import jest from "jest-mock";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import supertest from "supertest";
dotenv.config();

const randomEmail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let userId = "";

const baseURL = process.env.BASE_URL + 'users';
let accessToken = "";   
let refreshToken = "";
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

describe("User CRUD functions (ENDPOINTS TESTING) ",  () => {

    let req = {
        cookie: {
            accessToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg3MmRkZjFjYjkyODYwMmVhNzdhZGYiLCJlbWFpbCI6Im1pbmVib3hhcmFiaWNAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzAzMzY2MTUwLCJleHAiOjE3MDM5NzA5NTB9.92M7SVqlGSP2wjZqBzzkrb_2DiSt69vNzKiJM65YwMw",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg3MmRkZjFjYjkyODYwMmVhNzdhZGYiLCJlbWFpbCI6Im1pbmVib3hhcmFiaWNAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzAzMzY2MTUwLCJleHAiOjE3MDM5NzA5NTB9.92M7SVqlGSP2wjZqBzzkrb_2DiSt69vNzKiJM65YwMw"
        },
        body : {
            "username": "AbuRashedTechxx",
            "email": "aburashedtech@example.com",
            "password": "yassin123",
            "role": "Manager",
            "profile": {
              "bio": "Tech manager with a keen interest in innovative solutions.",
              "profilePicture": "path/to/manager/profile.jpg"
            },
            "createdAt": "2023-12-15T12:00:00Z"
        }
    }
    let user = {
       
    }

    //Login
    test("Login a user", async () => {
        let req = {
                "email": "mineboxarabic@gmail.com",
                "password": "1234"
        }

        const response = await axios.post(process.env.BASE_URL + 'login', req).catch(err=>{
            console.log("Error Login: ", err);
        })
        console.log("The response is: ", response.data.accessToken);
      
        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
        expect(response).toBeDefined();
        expect(response.status).toBe(200)
        console.log("The user is: ", response.data);
    });



    //Create 
    test("Create a new user", async () => {
        req.body.email = randomEmail + "@gmail.com";
        

        //Create cookies
        const cookie = {
            accessToken : accessToken,
            refreshToken: refreshToken
        }

        const response = await axios.post(baseURL,req).catch((err)=>{
            console.log("Error:", err.response ? err.response.data : err);
        })

        expect(response).toBeDefined();
        expect(response.status).toBe(201)
        userId = response.data._id;
    });

    /*//Read
    test("Read a user", async () => {
        const response = await axios.get(baseURL + '/' + userId).catch(err=>{
            console.log("Error: ", err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(200)
        console.log("The user is: ", response.data);
    });

    //Update
    test("Update a new user", async () =>{
        let user2 = user;
        user2.username = "Updated Username";
        const response = await axios.put(baseURL + '/' + userId, user2).catch(err=>{
            console.log("Error: ", err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(200)
        console.log("The user is: ", response.data);
    });

    //Delete
    test("Delete a user", async () =>{
        const response = await axios.delete(baseURL + '/' + userId).catch(err=>{
            console.log("Error: ", err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(200)
        console.log("The user is: ", response.data);
    });
*/


    
    
});
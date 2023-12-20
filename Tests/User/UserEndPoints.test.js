import createUser from "../../Controllers/User/CreateUser";
import jest from "jest-mock";
import mongoose from "mongoose";
import readUser from "../../Controllers/User/ReadUser";
import updateUser from "../../Controllers/User/UpdateUser";
import deleteUser from "../../Controllers/User/DeleteUser";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const randomEmail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let userId = "";

const baseURL = process.env.BASE_URL + 'users';
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
    let user = {
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
    //Create 
    test("Create a new user", async () => {
        const response = await axios.post(baseURL,user).catch((err)=>{
            console.log("Error:", err.response ? err.response.data : err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(201)
        userId = response.data._id;
    });

    //Read
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



    
    
});
import createUser from "../../Controllers/User/CreateUser";
import jest from "jest-mock";
import mongoose from "mongoose";
import readUser from "../../Controllers/User/ReadUser";
import updateUser from "../../Controllers/User/UpdateUser";
import deleteUser from "../../Controllers/User/DeleteUser";
import dotenv from "dotenv";
dotenv.config();
const randomEmail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let userId = "";

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

describe("User CRUD functions (NO ENDPOINTS TESTING) ",  () => {
    console.log(randomEmail);
    let req = {
        body:{
            "username": randomEmail + "AbuRash edTechxx",
            "email":randomEmail +  "aburashedtech@example.com",
            "password": "yassin123",
            "role": "Manager",
            "profile": {
              "bio": "Tech manager with a keen interest in innovative solutions.",
              "profilePicture": "path/to/manager/profile.jpg"
            },
            "createdAt": "2023-12-15T12:00:00Z"
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


    test("Create a new user", async () => {
        await createUser(req, res);
        console.log('\x1b[32m%s\x1b[0m', "Response: " + JSON.stringify(res));
        expect(res.statusCode).toBe(201);
        userId = res.jsonData["_id"];
        console.log('\x1b[32m%s\x1b[0m', "User ID: " + userId);
    });

    test("Read a user", async () => {
        req.params = {
            id: userId
        }
        await readUser(req, res);
        expect(res.statusCode).toBe(200);
    });

    test("Update a user", async () => {
        let req = {
            body:{
                "username": randomEmail + "UpdatedName",
                "email":randomEmail +  "UpdatedEmail@",
                "password": "yassin123",
            "role": "Manager",
            "profile": {
              "bio": "Tech manager with a keen interest in innovative solutions.",
              "profilePicture": "path/to/manager/profile.jpg"
            },
            "createdAt": "2023-12-15T12:00:00Z"
            }
        }

        req.params = {
            id: userId
        }
        await updateUser(req, res);
        console.log('\x1b[32m%s\x1b[0m', "Response update: " + JSON.stringify(res));
        expect(res.statusCode).toBe(200);
        
    });

    test("Delete a user", async () => {
        req.params = {
            id: userId
        }
        await deleteUser(req, res);
        expect(res.statusCode).toBe(200);
    });

    

});
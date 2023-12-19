import createUser from "../../Controllers/User/CreateUser";
import jest from "jest-mock";
import mongoose from "mongoose";
import readUser from "../../Controllers/User/ReadUser";
import updateUser from "../../Controllers/User/UpdateUser";
import deleteUser from "../../Controllers/User/DeleteUser";
const randomEmail = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
let userId = "";
beforeAll(() => {
    mongoose.connect('mongodb://localhost:27017/ProxiMap').then(() => {
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

describe("User error checking CRUD functions (NO ENDPOINTS TESTING) ",  () => {
    console.log(randomEmail);
    let req = {
        body:{
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

    test("Create a user with invalid data", async () => {
        req.body = {
            "username": "", // Missing username
            "email": "invalidemail", // Invalid email format
            "password": "", // Missing password
        };
        await createUser(req, res);
        expect(res.statusCode).toBe(400); // Or appropriate error code
    });
    
    test("Read a non-existent user", async () => {
        req.params = {
            id: "6580af9e19df52bd26facb35"
        };
        await readUser(req, res);
        expect(res.statusCode).toBe(404); // User not found
    });
    

    test("Update a user with invalid data", async () => {
        req.body = {
            "username": "ValidName",
            "email": "invalidemail", // Invalid email format
            "password": "validPassword",
        };
        req.params = { id: userId };
        await updateUser(req, res);
        expect(res.statusCode).toBe(400); // Or appropriate error code
    });
    
    test("Update a non-existent user", async () => {
        req.params = {
            id: "nonexistentUserId"
        };
        req.body.email = randomEmail + "@example.com";
        await updateUser(req, res);
        expect(res.statusCode).toBe(404); // User not found
    });

    test("Delete a non-existent user", async () => {
        req.params = {
            id: "nonexistentUserId"
        };
        await deleteUser(req, res);
        expect(res.statusCode).toBe(404); // User not found
    });

    test("Create a duplicate user", async () => {

        let req2 = {
            body:{
                "username": "ExistingUsername",
                "email": randomEmail + "existingemail@example.com",
                "password": "validPassword123",
                "role": "Manager",
                "profile": {
                  "bio": "Tech manager with a keen interest in innovative solutions.",
                  "profilePicture": "path/to/manager/profile.jpg"
                }
            }
        }


        let res2 = {
            status: jest.fn((statusCode) =>{
                res2.statusCode = statusCode;
                return res2;
            }),
            json: jest.fn((data) =>{
                res2.jsonData = data;
                return res2;
            })
        }

        await createUser(req2, res2);
        console.log('\x1b[32m%s\x1b[0m', "Response: " + JSON.stringify(res2));
        expect(res2.statusCode).toBe(201); // Created
        await createUser(req2, res2);
        expect(res2.statusCode).toBe(409); // Conflict or appropriate error code
    });
    
    
});
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

describe("User error checking CRUD functions (ENDPOINTS TESTING) ",  () => {


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
    
    test("Create a user with invalid data", async () => {
        let userNotGood = user;
        userNotGood.email = "invalidemail";
        userNotGood.username = "x";
        await axios.post(baseURL, userNotGood).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
            userId = err.response.data._id;
        });
    });
    
    test("Read a non-existent user", async () => {

        const id = "6580af9e19df52bd26facb35"

        await axios.get(baseURL + '/' + id).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(404);
        });
    });
    

    test("Update a user with invalid data", async () => {

        let notGoodUser = user;
        notGoodUser.email = "invalidemail";
        notGoodUser.username = "x";


        await axios.put(baseURL + '/' + userId, notGoodUser).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });
 
    test("Update a non-existent user", async () => {
        const id = "notValidId";
      

        await axios.put(baseURL + '/' + id, user).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });
 
    test("Delete a non-existent user", async () => {

        const id = 'nonexistentUserId';
        await axios.delete(baseURL + '/' + id).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });

    test("Create a duplicate user", async () => {

        let secondUser = user;
        secondUser.name = "Second User";



        await axios.post(baseURL, secondUser).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
        
    });
    
    
});
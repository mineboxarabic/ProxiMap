var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
import supertest from 'supertest';
import { connectDB, disconnectDB } from '../database.js';
import application from '../../Application.js';
dotenv.config();
const randomEmail = Math.random().toString(36).substring(2, 15) + '@example.com';
let userId = '';
const agent = supertest.agent(application);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    console.log('Connected to database');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield disconnectDB();
    console.log('Disconnected from database');
}));
describe("Persistent Session Testing", () => {
    it("Should login a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/login')
            .send({
            "email": "mineboxarabic@gmail.com",
            "password": "Zaqwe123"
        })
            .expect(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body).toHaveProperty('user');
    }));
    it("Should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.get('/users')
            .expect(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it("Should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/users')
            .send({
            "username": "Test Userwwssxxxss",
            "email": "mineboxtestxwsssswxxs@gmail.com",
            "role": "User",
            "password": "Zaqwe123"
        })
            .expect(201);
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
        userId = response.body.user._id;
    }));
    it("Should get a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('useriddddd', userId);
        const response = yield agent.get('/users/' + userId)
            .expect(200);
        //it will return only a single user json 
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
    }));
    it("Should update a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.put('/users/' + userId)
            .send({
            "username": "Test User updated",
        }).expect(200);
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('updatedUser');
    }));
    it("Should delete a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.delete('/users/' + userId)
            .expect(200);
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
    }));
    it("Should logout a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/logout')
            .expect(200);
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
    }));
});
describe("Error Testing", () => {
    const checkError = (response, message) => {
        expect(response.body).toHaveProperty("ok");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("status");
        if (message)
            expect(response.body.message).toBe(message);
    };
    it("Should not login a user with invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/login')
            .send({
            "email": "mine@gmail",
            "password": "Zaqwe123"
        }).expect(401);
        //There will success false and message will be invalid credentials
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
    }));
    it("Should login a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/login')
            .send({
            "email": "mineboxarabic@gmail.com",
            "password": "Zaqwe123"
        })
            .expect(200);
        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body).toHaveProperty('user');
    }));
    it("Should no accept the id given to it ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.get('/users/' + "1234567890").expect(400);
        checkError(response, "The id you gave is not a mongoID");
    }));
    it("Should not find the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.get('/users/' + "659fba2f1f253e0e1d5147dd").expect(404);
        checkError(response, "User not found");
    }));
    //Small username
    it("Should not create a user with invalid username", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/users')
            .send({
            "username": "Te",
            "email": "minebox@gmai",
            "role": "User",
            "password": "Zaqwe123"
        })
            .expect(400);
        checkError(response, "Username must be of 3 to 50 characters long");
    }));
    //Long username
    it("Should not create a user with invalid username", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/users')
            .send({
            "username": "Teaidjoisjdoaijdijaosidjoaoaisdjoasdiaiasodjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
            "email": "minebox@gmai",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(400);
        checkError(response, 'Username must be of 3 to 50 characters long');
    }));
    //Not an email
    it("Should not create a user with invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/users')
            .send({
            "username": "Test Userss",
            "email": "minebox",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(400);
        checkError(response, 'Invalid email format');
    }));
    //Small password
    it("Should not create a user with invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/users')
            .send({
            "username": "Test Userss",
            "email": "minebox@gmail.com",
            "role": "User",
            "password": "Zaq"
        }).expect(400);
        checkError(response, 'Password must be of 8 to 50 characters long');
    }));
    //Existing email
    it("Should not create a user with existing email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/users')
            .send({
            "username": "Test Userss",
            "email": "mineboxarabic@gmail.com",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(409);
        checkError(response, 'Email already exists');
    }));
    //Existing username
    it("Should not create a user with existing username", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post('/users')
            .send({
            "username": "yassin",
            "email": "minddddd@gmail.com",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(409);
        checkError(response, 'Username already exists');
    }));
});

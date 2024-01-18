import jest from 'jest-mock';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import supertest from 'supertest';
import { connectDB, disconnectDB } from '../database.js';
import  application  from '../../Application.js';

dotenv.config();

const randomEmail = Math.random().toString(36).substring(2, 15) + '@example.com';
let userId = '';

const agent = supertest.agent(application);

beforeAll(async () => {
    await connectDB();
    console.log('Connected to database');
});

afterAll(async () => {
    await disconnectDB();
    console.log('Disconnected from database');
});

describe("Persistent Session Testing", () => {

    it("Should login a user", async () => {
        const response = await agent.post('/login')
            .send({
                "email": "mineboxarabic@gmail.com",
                "password": "Zaqwe123"
            })
            .expect(200);

        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body).toHaveProperty('user');
        
    });

    it("Should get all users", async () => {
        const response = await agent.get('/users')
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });

    it("Should create a user", async () => {
        const response = await agent.post('/users')
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
    });

    it("Should get a user by id", async () => {
        console.log('useriddddd',userId);
        const response = await agent.get('/users/' + userId)
            .expect(200);

            //it will return only a single user json 

            expect(response.body).toHaveProperty('success');
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('user');

        });

    it("Should update a user by id", async () => {
        const response = await agent.put('/users/' + userId)
            .send({
                "username": "Test User updated",
            }).expect(200);

            
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('updatedUser');
    }
    );

    it("Should delete a user by id", async () => {
        const response = await agent.delete('/users/' + userId)
            .expect(200);

        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
    });


    it("Should logout a user", async () => {
        const response = await agent.post('/logout')
            .expect(200);

        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
    });

});

describe("Error Testing", () => {
    it("Should not login a user with invalid credentials", async () => {
        const response = await agent.post('/login')
            .send({
                "email": "mine@gmail",
                "password": "Zaqwe123"
            }).expect(401);

            //There will success false and message will be invalid credentials
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
    }
    );
        
    it("Should login a user", async () => {
        const response = await agent.post('/login')
            .send({
                "email": "mineboxarabic@gmail.com",
                "password": "Zaqwe123"
            })
            .expect(200);

        expect(response.body).toHaveProperty('accessToken');
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body).toHaveProperty('user');
        
    });


    it("Should no accept the id given to it ", async () => {
        const response = await agent.get('/users/' + "1234567890").expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeInstanceOf(Array);
        expect(response.body.error[0]).toHaveProperty('msg');
        expect(response.body.error[0]['msg']).toBe('The id you gave is not a mongoID');
    }
    );



    it("Should not find the user", async () => {
        const response = await agent.get('/users/' + "659fba2f1f253e0e1d5147dd").expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeInstanceOf(Array);
        expect(response.body.error[0]).toHaveProperty('msg');
        expect(response.body.error[0]['msg']).toBe('User not found');
    }
    );

    //Small username
    it("Should not create a user with invalid username", async () => {
        const response = await agent.post('/users')
            .send({
                "username": "Te",
                "email": "minebox@gmai",
                "role": "User",
                "password": "Zaqwe123"
            })
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeInstanceOf(Array);
        expect(response.body.error[0]).toHaveProperty('msg');
        expect(response.body.error[0]['msg']).toBe('Username must be of 3 to 50 characters long');
    });

    //Long username
    it("Should not create a user with invalid username", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "Teaidjoisjdoaijdijaosidjoaoaisdjoasdiaiasodjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
            "email": "minebox@gmai",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeInstanceOf(Array);
        expect(response.body.error[0]).toHaveProperty('msg');
        expect(response.body.error[0]['msg']).toBe('Username must be of 3 to 50 characters long');


    });

    //Not an email
    it("Should not create a user with invalid email", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "Test Userss",
            "email": "minebox",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeInstanceOf(Array);
        expect(response.body.error[0]).toHaveProperty('msg');
        expect(response.body.error[0]['msg']).toBe('Invalid email format');
    });

    //Small password
    it("Should not create a user with invalid password", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "Test Userss",
            "email": "minebox@gmail.com",
            "role": "User",
            "password": "Zaq"
        }).expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeInstanceOf(Array);
        expect(response.body.error[0]).toHaveProperty('msg');
        expect(response.body.error[0]['msg']).toBe('Password must be of 8 to 50 characters long');
    });


    //Existing email
    it("Should not create a user with existing email", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "Test Userss",
            "email": "mineboxarabic@gmail.com",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(409);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeInstanceOf(Array);
        expect(response.body.error[0]).toHaveProperty('msg');
        expect(response.body.error[0]['msg']).toBe('Email already exists');

    });

    //Existing username
    it("Should not create a user with existing username", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "yassin",
            "email": "minddddd@gmail.com",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(409);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBeInstanceOf(Array);
        expect(response.body.error[0]).toHaveProperty('msg');
        expect(response.body.error[0]['msg']).toBe('Username already exists');

    });  




});
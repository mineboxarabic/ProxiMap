import jest from 'jest-mock';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import supertest from 'supertest';
import { connectDB, disconnectDB } from '../database.js';
import  application  from '../../Application.js';

dotenv.config();

const randomEmail = Math.random().toString(36).substring(2, 15) + '@example.com';
let userId = '';

const agent = supertest.agent(application);

// @ts-expect-error TS(2304): Cannot find name 'beforeAll'.
beforeAll(async () => {
    await connectDB();
    console.log('Connected to database');
});

// @ts-expect-error TS(2304): Cannot find name 'afterAll'.
afterAll(async () => {
    await disconnectDB();
    console.log('Disconnected from database');
});

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Persistent Session Testing", () => {

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should login a user", async () => {
        const response = await agent.post('/login')
            .send({
                "email": "mineboxarabic@gmail.com",
                "password": "Zaqwe123"
            })
            .expect(200);

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('accessToken');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('refreshToken');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('user');
        
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should get all users", async () => {
        const response = await agent.get('/users')
            .expect(200);

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toBeInstanceOf(Array);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should create a user", async () => {
        const response = await agent.post('/users')
            .send({
                "username": "Test Userwwssxxxss",
                "email": "mineboxtestxwsssswxxs@gmail.com",
                "role": "User",
                "password": "Zaqwe123"
            })
            .expect(201);

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('success');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('message');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('user');
            userId = response.body.user._id;
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should get a user by id", async () => {
        console.log('useriddddd',userId);
        const response = await agent.get('/users/' + userId)
            .expect(200);

            //it will return only a single user json 

            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(response.body).toHaveProperty('success');
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(response.body).toHaveProperty('message');
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(response.body).toHaveProperty('user');

        });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should update a user by id", async () => {
        const response = await agent.put('/users/' + userId)
            .send({
                "username": "Test User updated",
            }).expect(200);

            
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('success');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('message');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('updatedUser');
    }
    );

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should delete a user by id", async () => {
        const response = await agent.delete('/users/' + userId)
            .expect(200);

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('success');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('message');
    });


    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should logout a user", async () => {
        const response = await agent.post('/logout')
            .expect(200);

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('success');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('message');
    });

});

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Error Testing", () => {

    
  const checkError = (response: any, message: any) =>{
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("ok");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("status");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    if(message) expect(response.body.message).toBe(message);
  }
  
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should not login a user with invalid credentials", async () => {
        const response = await agent.post('/login')
            .send({
                "email": "mine@gmail",
                "password": "Zaqwe123"
            }).expect(401);

            //There will success false and message will be invalid credentials
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('success');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('message');
    }
    );
        
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should login a user", async () => {
        const response = await agent.post('/login')
            .send({
                "email": "mineboxarabic@gmail.com",
                "password": "Zaqwe123"
            })
            .expect(200);

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('accessToken');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('refreshToken');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(response.body).toHaveProperty('user');

        
    });


    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should no accept the id given to it ", async () => {
        const response = await agent.get('/users/' + "1234567890").expect(400);

    
        checkError(response, "The id you gave is not a mongoID");
    }
    );



    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should not find the user", async () => {
        const response = await agent.get('/users/' + "659fba2f1f253e0e1d5147dd").expect(404);

        checkError(response, "User not found");
    }
    );

    //Small username
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should not create a user with invalid username", async () => {
        const response = await agent.post('/users')
            .send({
                "username": "Te",
                "email": "minebox@gmai",
                "role": "User",
                "password": "Zaqwe123"
            })
            .expect(400);

        checkError(response, "Username must be of 3 to 50 characters long");
    });

    //Long username
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should not create a user with invalid username", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "Teaidjoisjdoaijdijaosidjoaoaisdjoasdiaiasodjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
            "email": "minebox@gmai",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(400);


        checkError(response, 'Username must be of 3 to 50 characters long')


    });

    //Not an email
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should not create a user with invalid email", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "Test Userss",
            "email": "minebox",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(400);


        checkError(response, 'Invalid email format');
    });

    //Small password
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should not create a user with invalid password", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "Test Userss",
            "email": "minebox@gmail.com",
            "role": "User",
            "password": "Zaq"
        }).expect(400);

        checkError(response, 'Password must be of 8 to 50 characters long')
    });


    //Existing email
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should not create a user with existing email", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "Test Userss",
            "email": "mineboxarabic@gmail.com",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(409);


        checkError(response, 'Email already exists');

    });

    //Existing username
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("Should not create a user with existing username", async () => {
        const response = await agent.post('/users')
        .send({
            "username": "yassin",
            "email": "minddddd@gmail.com",
            "role": "User",
            "password": "Zaqwe123"
        }).expect(409);

        checkError(response, 'Username already exists');

    });  




});
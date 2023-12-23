import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.BASE_URL + 'services';

// Improved handling of async operations in beforeAll and afterAll
beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database: ' + err);
        throw err; // Ensure proper error handling
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    console.log('Disconnected from database');
});

describe("Service CRUD functions - Error Check Tests", () => {
    // Invalid Data Template
    const invalidService = {
        partnerId: "invalidId",
        categoryId: "invalidId",
        name: "x",
        description: "Service Description",
        price: "free",
        availability: "yes",
        ratings: []
    };

    test("Create a new service with invalid data", async () => {
        await axios.post(baseUrl, invalidService).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });

    test("Read a service with invalid ID", async () => {
        await axios.get(baseUrl + '/invalidId').catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });

    test("Update a service with invalid ID", async () => {
        await axios.put(baseUrl + '/invalidId', invalidService).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });

    test("Delete service with invalid ID", async () => {
        await axios.delete(baseUrl + '/invalidId').catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });
});

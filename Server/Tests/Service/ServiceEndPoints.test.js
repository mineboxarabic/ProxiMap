import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.BASE_URL + 'services';

// Establishing and closing the database connection
beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database: ' + err);
        throw err;  // Let Jest handle the error
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    console.log('Disconnected from database');
});

describe("Service CRUD functions (ENDPOINTS TESTING)", () => {
    let serviceId = '';
    const service = {
        "partnerId": "60b0f7c5b5f3f63a9c4c9d7a",
        "categoryId": "60b0f7c5b5f3f63a9c4c9d7a",
        "name": "Service Name",
        "description": "Service Description",
        "price": 100,
        "availability": true,
        "ratings": []
    };

    test("Create a new service", async () => {
        const response = await axios.post(baseUrl, service);
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        serviceId = response.data._id;
    });

    test("Read a service", async () => {
        const response = await axios.get(`${baseUrl}/${serviceId}`);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
    });

    test("Update a service", async () => {
        const updatedService = { ...service, name: "Updated Service Name" };
        const response = await axios.put(`${baseUrl}/${serviceId}`, updatedService);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
    });

    test("Delete service", async () => {
        const response = await axios.delete(`${baseUrl}/${serviceId}`);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
    });
});

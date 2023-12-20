import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.BASE_URL + 'services';
let serviceId = '';

beforeAll(() => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to database'))
        .catch(err => console.log('Error connecting to database: ' + err));
});

afterAll(() => {
    mongoose.disconnect();
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
        const response = await axios.post(baseUrl, invalidService).catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
            return;
        });
    });

    test("Read a service with invalid ID", async () => {
        const response = await axios.get(baseUrl + '/invalidId').catch(err => {
            console.log(err.response.data);
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });

    test("Update a service with invalid ID", async () => {
        const response = await axios.put(baseUrl + '/invalidId', invalidService).catch(err => {
            //console.error(err.response.data);
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });

    test("Delete service with invalid ID", async () => {
        const response = await axios.delete(baseUrl + '/invalidId').catch(err => {
            expect(err.response).toBeDefined();
            expect(err.response.status).toBe(400);
        });
    });
});

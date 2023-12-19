import createService from "../../Controllers/Service/createService";
import mongoose from "mongoose";
import jest from "jest-mock";
import readService from "../../Controllers/Service/readService";
import updateService from "../../Controllers/Service/updateService";
import deleteService from "../../Controllers/Service/deleteService";
import axios from "axios";

let serviceId = '';
const baseUrl = 'http://localhost:3001/services';
beforeAll(()=>{
    mongoose.connect('mongodb://localhost:27016/ProxiMap').then(() => {
       // console.log('Connected to database');
    }
    ).catch((err) => {
        console.log('Error connecting to database: ' + err);
    }
    );
})

afterAll(()=>{
    mongoose.disconnect();
})

describe("Service CRUD functions (NO ENDPOINTS TESTING) ",  () => {

    let req = {
        body:{
            "partnerId": "60b0f7c5b5f3f63a9c4c9d7a",
            "categoryId": "60b0f7c5b5f3f63a9c4c9d7a",
            "name": "Service Name",
            "description": "Service Description",
            "price": 100,
            "availability": true,
            "ratings": []
        }
    };

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

    test("Create a new service", async () => {
        const response = await axios.post(baseUrl,{
            "partnerId": "60b0f7c5b5f3f63a9c4c9d7a",
            "categoryId": "60b0f7c5b5f3f63a9c4c9d7a",
            "name": "Service Name",
            "description": "Service Description",
            "price": 100,
            "availability": true,
            "ratings": []
        }).catch((err)=>{
            console.log("Error:", err.response ? err.response.data : err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(201)
        
    });

    test("Read a service", async ()=>{
        req.params = {
            id: serviceId
        }
        await readService(req, res);

        expect(res.statusCode).toBe(200);
    })

    test("Update a new service", async () =>{
        req.params = {
            id : serviceId
        }

        req.body.name = "Changed name"
        await updateService(req, res);
        expect(res.statusCode).toBe(200);

    });

    test("Delete service", async ()=>{
        req.params = {
            id : serviceId
        }

        await deleteService(req, res);
        expect(res.statusCode).toBe(200);
    })

});
import createService from "../../Controllers/Service/createService";
import mongoose from "mongoose";
import jest from "jest-mock";
import readService from "../../Controllers/Service/readService";
import updateService from "../../Controllers/Service/updateService";
import deleteService from "../../Controllers/Service/deleteService";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let serviceId = '';
const baseUrl = process.env.BASE_URL + 'services';
beforeAll(()=>{
    mongoose.connect(process.env.MONGODB_URI).then(() => {
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

describe("Service CRUD functions (ENDPOINTS TESTING) ",  () => {

    let service = {
        "partnerId": "60b0f7c5b5f3f63a9c4c9d7a",
        "categoryId": "60b0f7c5b5f3f63a9c4c9d7a",
        "name": "Service Name",
        "description": "Service Description",
        "price": 100,
        "availability": true,
        "ratings": []
    };


    test("Create a new service", async () => {
        const response = await axios.post(baseUrl,service).catch((err)=>{
            console.log("Error:", err.response ? err.response.data : err);
        })
        expect(response).toBeDefined();
        expect(response.status).toBe(201)

        serviceId = response.data._id;
        
    });

    test("Read a service", async ()=>{
        
        const response = await axios.get(baseUrl + '/' + serviceId).catch(err=>{
            console.log("Error: ", err);
        })
     

        expect(response).toBeDefined();
        expect(response.status).toBe(200)
        console.log("The service is: ", response.data);

    })

    test("Update a new service", async () =>{


        const url = baseUrl + '/' + serviceId;
        service.name = "New name of the service"
        const response = await axios.put(url, service).catch((err)=>{
            console.log("Error:", err.response ? err.response.data : err);
        })

        expect(response).toBeDefined();
        expect(response.status).toBe(200);
    });

    test("Delete service", async ()=>{
       const response = await axios.delete(baseUrl + '/' + serviceId).catch(err=>{
            console.error("Error: ", err);
       })

        expect(response).toBeDefined();
        expect(response.status).toBe(200);
    })
});
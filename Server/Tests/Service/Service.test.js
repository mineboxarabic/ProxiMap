import jest from "jest-mock";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import supertest from "supertest";
import { connectDB, disconnectDB } from "../database.js";
import application from "../../Application.js";

dotenv.config();

const randomEmail =
  Math.random().toString(36).substring(2, 15) + "@example.com";
let serviceId = "";

const agent = supertest.agent(application);

beforeAll(async () => {
  await connectDB();
  console.log("Connected to database");
});

afterAll(async () => {
  await disconnectDB();
  console.log("Disconnected from database");
});

describe("Persistent Session Testing", () => {
  it("Should login a User", async () => {
    const response = await agent
      .post("/login")
      .send({
        email: "mineboxarabic@gmail.com",
        password: "Zaqwe123",
      })
      .expect(200);

    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
    expect(response.body).toHaveProperty("user");
  });

  it("Should get all services", async () => {
    const response = await agent.get("/services").expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it("Should create a service", async () => {
    const response = await agent
      .post("/services")
      .send({
        "partnerId": "659fba2a1f253e0e1d5147dd",
        "categoryId": "65a63a89fc13ae50c9fa2cf1",
        "name": "jwyse16",
        "description": "Corrosion of second degree of neck, initial encounter",
        "price": 64,
        "position": { "lat": 30.6377274, "lng": 73.0947607 },
        "range": 2,
        "ratings": ["659fba2a1f253e0e1d5147dd"],
        "availability": true
      }).expect(201);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("service");
    serviceId = response.body.service._id;
  });

  it("Should get a service by id", async () => {
    console.log("serviceiddddd", serviceId);
    const response = await agent.get("/services/" + serviceId).expect(200);

    //it will return only a single service json

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("service");
  });

  it("Should update a service by id", async () => {
    const response = await agent
      .put("/services/" + serviceId)
      .send({
        name: "Test Service  updated",
      })
      .expect(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("updatedService");
  });

  it("Should delete a service by id", async () => {
    const response = await agent.delete("/services/" + serviceId).expect(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
  });

  it("Should logout a service", async () => {
    const response = await agent.post("/logout").expect(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
  });
});

describe("Error Testing", () => {
  it("Should login a User", async () => {
    const response = await agent
      .post("/login")
      .send({
        email: "mineboxarabic@gmail.com",
        password: "Zaqwe123",
      })
      .expect(200);

    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
    expect(response.body).toHaveProperty("user");
  });

  it("Should no accept the id given to it ", async () => {
    const response = await agent.get("/services/" + "1234567890").expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe(
      "The id you gave is not a mongoID"
    );
  });

  it("Should not find the service", async () => {
    const response = await agent
      .get("/services/" + "659fba2f1f253e0e1d5147dd")
      .expect(404);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe("Service  not found");
  });

  //Small servicename
  it("Should not create a service with invalid servicename", async () => {
    const response = await agent
      .post("/services")
      .send({
        servicename: "Te",
        email: "minebox@gmai",
        role: "Service ",
        password: "Zaqwe123",
      })
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe(
      "Service name must be of 3 to 50 characters long"
    );
  });

  //Long servicename
  it("Should not create a service with invalid servicename", async () => {
    const response = await agent
      .post("/services")
      .send({
        servicename:
          "Teaidjoisjdoaijdijaosidjoaoaisdjoasdiaiasodjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        email: "minebox@gmai",
        role: "Service ",
        password: "Zaqwe123",
      })
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe(
      "Service name must be of 3 to 50 characters long"
    );
  });

  //Not an email
  it("Should not create a service with invalid email", async () => {
    const response = await agent
      .post("/services")
      .send({
        servicename: "Test Servicess",
        email: "minebox",
        role: "Service ",
        password: "Zaqwe123",
      })
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe("Invalid email format");
  });

  //Small password
  it("Should not create a service with invalid password", async () => {
    const response = await agent
      .post("/services")
      .send({
        servicename: "Test Servicess",
        email: "minebox@gmail.com",
        role: "Service ",
        password: "Zaq",
      })
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe(
      "Password must be of 8 to 50 characters long"
    );
  });

  //Existing email
  it("Should not create a service with existing email", async () => {
    const response = await agent
      .post("/services")
      .send({
        servicename: "Test Servicess",
        email: "mineboxarabic@gmail.com",
        role: "Service ",
        password: "Zaqwe123",
      })
      .expect(409);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe("Email already exists");
  });

  //Existing servicename
  it("Should not create a service with existing servicename", async () => {
    const response = await agent
      .post("/services")
      .send({
        servicename: "yassin",
        email: "minddddd@gmail.com",
        role: "Service ",
        password: "Zaqwe123",
      })
      .expect(409);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe("Service name already exists");
  });
});

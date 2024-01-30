import jest from "jest-mock";
import mongoose from "mongoose";
import dotenv from "dotenv";
import supertest from "supertest";
import { connectDB, disconnectDB } from "../database.js";
import application from "../../Application.js";

dotenv.config();

const agent = supertest.agent(application);

let askedServiceId = "";

beforeAll(async () => {
  await connectDB();
  console.log("Connected to database for AskedService tests");
});

afterAll(async () => {
  await disconnectDB();
  console.log("Disconnected from database for AskedService tests");
});

describe("Persistent Session Testing for AskedService", () => {
  it("Should create an askedService", async () => {
    const response = await agent
      .post("/askedservices")
      .send({
        // Replace with valid data for your AskedService
        userId: "validMongoIdForUser",
        categoryId: "validMongoIdForCategory",
        name: "Requested Service",
        description: "Description of the requested service",
        price: 50,
        position: { coordinates: [10, 20] },
        date: new Date(),
        status: 'pending'
      })
      .expect(201);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("askedService");
    askedServiceId = response.body.askedService._id;
  });

  it("Should get all askedServices", async () => {
    const response = await agent
      .get("/askedservices")
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it("Should get an askedService by id", async () => {
    const response = await agent
      .get(`/askedservices/${askedServiceId}`)
      .expect(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("askedService");
  });

  it("Should update an askedService by id", async () => {
    const response = await agent
      .put(`/askedservices/${askedServiceId}`)
      .send({
        name: "Updated Asked Service"
      })
      .expect(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("updatedAskedService");
  });

  it("Should delete an askedService by id", async () => {
    const response = await agent
      .delete(`/askedservices/${askedServiceId}`)
      .expect(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
  });
});

describe("Error Testing for AskedService", () => {
  it("Should not accept an invalid id for retrieval", async () => {
    const response = await agent
      .get("/askedservices/invalidId")
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("Should not find an askedService with a non-existing id", async () => {
    const response = await agent
      .get("/askedservices/nonExistingId")
      .expect(404);

    expect(response.body).toHaveProperty("error");
  });

  it("Should not create an askedService with invalid data", async () => {
    const response = await agent
      .post("/askedservices")
      .send({
        // Some invalid data structure
      })
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("Should not update an askedService with invalid data", async () => {
    const response = await agent
      .put(`/askedservices/${askedServiceId}`)
      .send({
        // Some invalid data for update
      })
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });

  it("Should not delete an askedService with invalid id", async () => {
    const response = await agent
      .delete("/askedservices/invalidId")
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});

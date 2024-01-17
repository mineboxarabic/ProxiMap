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
let categoryId = "";

const agent = supertest.agent(application);

const category = {
    "name": "Test Category",
    "description": "Test Category Description"
}

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

  it("Should get all categorys", async () => {
    const response = await agent.get("/categorys").expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it("Should create a category", async () => {
    const response = await agent
      .post("/categorys")
      .send(category).expect(201);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("category");
    categoryId = response.body.category._id;
  });

  it("Should get a category by id", async () => {
    console.log("categoryiddddd", categoryId);
    const response = await agent.get("/categorys/" + categoryId).expect(200);

    //it will return only a single category json

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("category");
  });

  it("Should update a category by id", async () => {
    const response = await agent
      .put("/categorys/" + categoryId)
      .send({
        name: "Test Category updated",
      })
      .expect(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("updatedCategory");
  });

  it("Should delete a category by id", async () => {
    const response = await agent.delete("/categorys/" + categoryId).expect(200);

    expect(response.body).toHaveProperty("success");
    expect(response.body).toHaveProperty("message");
  });

  it("Should logout a category", async () => {
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
    const response = await agent.get("/categorys/" + "1234567890").expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe(
      "The id you gave is not a mongoID"
    );
  });

  it("Should not find the category", async () => {
    const response = await agent
      .get("/categorys/" + "659fba2f1f253e0e1d5147dd")
      .expect(404);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe("Category not found");
  });

  //Small categoryname
  it("Should not create a category with invalid categoryname", async () => {
    category.name = "j";
    const response = await agent
      .post("/categorys")
      .send(category)
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe(
      "Name must be of 2 to 100 characters long"
    );
  });

  //Long categoryname
  it("Should not create a category with invalid categoryname", async () => {
    const response = await agent
      .post("/categorys")
      .send({
        "partnerId": "60b5c5b4c7a3c0b4e4f0f8c2",
        "categoryId": "65a63a89fc13ae50c9fa2cf1",
        "name": "TeaidjoisjdoaijdijaosidjoaoaiTeaidjoisjdoaijdijaosidjoaoaisdjoasdiaiasddddddddddddddddddddddddodjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjsdjoasdiaiasddddddddddddddddddddddddodjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        "description": "Corrosion of second degree of neck, initial encounter",
        "price": 64,
        "position": { "lat": 30.6377274, "lng": 73.0947607 },
        "range": 2,
        "ratings": ["659fba2a1f253e0e1d5147dd"],
        "availability": true
      })
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe(
      "Name must be of 2 to 100 characters long"
    );
  });

  //Not an email
  it("Should not create a category with invalid email", async () => {
    const response = await agent
      .post("/categorys")
      .send({
        "partnerId": "60b5c5b4c7a3c0bf0f8c2",
        "categoryId": "65a63a89fc13ae50c9fa2cf1",
        "name": "Teaidj",
        "description": "Corrosion of second degree of neck, initial encounter",
        "price": 64,
        "position": { "lat": 30.6377274, "lng": 73.0947607 },
        "range": 2,
        "ratings": ["659fba2a1f253e0e1d5147dd"],
        "availability": true
      })
      .expect(400);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeInstanceOf(Array);
    expect(response.body.error[0]).toHaveProperty("msg");
    expect(response.body.error[0]["msg"]).toBe("partnerid must be a valid mongoId");
  });

});

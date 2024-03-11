import jest from "jest-mock";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import supertest from "supertest";
import { connectDB, disconnectDB } from "../database.js";
import application from "../../Application.js";

dotenv.config();

const randomEmail =Math.random().toString(36).substring(2, 15) + "@example.com";
let categoryId = "";

const agent = supertest.agent(application);

const category = {
    "name": "Test Category" + randomEmail,
    "description": "Test Category Description"
}

// @ts-expect-error TS(2304): Cannot find name 'beforeAll'.
beforeAll(async () => {
  await connectDB();
  console.log("Connected to database");
});

// @ts-expect-error TS(2304): Cannot find name 'afterAll'.
afterAll(async () => {
  await disconnectDB();
  console.log("Disconnected from database");
});

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("Persistent Session Testing", () => {
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should login a User", async () => {
    const response = await agent
      .post("/login")
      .send({
        email: "mineboxarabic@gmail.com",
        password: "Zaqwe123",
      })
      .expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("accessToken");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("refreshToken");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("user");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should get all categorys", async () => {
    const response = await agent.get("/categorys").expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toBeInstanceOf(Array);
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should create a category", async () => {
    const response = await agent
      .post("/categorys")
      .send(category).expect(201);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("category");
    categoryId = response.body.category._id;
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should get a category by id", async () => {
    console.log("categoryiddddd", categoryId);
    const response = await agent.get("/categorys/" + categoryId).expect(200);

    //it will return only a single category json

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("category");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should update a category by id", async () => {
    const response = await agent
      .put("/categorys/" + categoryId)
      .send({
        name: "Test Category updated",
      })
      .expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("updatedCategory");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should delete a category by id", async () => {
    const response = await agent.delete("/categorys/" + categoryId).expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should logout a category", async () => {
    const response = await agent.post("/logout").expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
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
  it("Should login a User", async () => {
    const response = await agent
      .post("/login")
      .send({
        email: "mineboxarabic@gmail.com",
        password: "Zaqwe123",
      })
      .expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("accessToken");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("refreshToken");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("user");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should no accept the id given to it ", async () => {
    const response = await agent.get("/categorys/" + "1234567890").expect(400);


    checkError(response, "The id you gave is not a mongoID");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should not find the category", async () => {
    const response = await agent
      .get("/categorys/" + "659fba2f1f253e0e1d5147dd")
      .expect(404);


    checkError(response, "Category not found");
  });

  //Small categoryname
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should not create a category with invalid categoryname", async () => {
    category.name = "j";
    const response = await agent
      .post("/categorys")
      .send(category)
      .expect(400);

  

    checkError(response, "Name must be of 2 to 100 characters long");
  });

  //Long categoryname
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
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

    checkError(response, "Name must be of 2 to 100 characters long");
  });


});
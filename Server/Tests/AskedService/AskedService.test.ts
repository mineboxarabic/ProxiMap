import dotenv from "dotenv";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import supertest from "supertest";
import { connectDB, disconnectDB } from "../database.js";
import application from "../../Application.js";

dotenv.config();

let askedServiceId = "";

const agent = supertest.agent(application);

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
  it("Should get all askedServices", async () => {
    const response = await agent.get("/askedServices").expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toBeInstanceOf(Array);
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should create a askedService", async () => {
    const response = await agent
      .post("/askedServices")
      .send({
        userId: "60b5c5b4c7a3c0b4e4f0f8c1",  // Replace with an actual User ObjectId
        categoryId: "65a9a3912f10d0a3fd7106cb",  // Replace with an actual Category ObjectId
        name: "Quick IT Support",
        description: "I can help fix your computer issues in no time.",
        price: 50,
        position: {
            type: "Point",
            coordinates: [4.568749743547676,46.0841182620497]
          },
        status: "pending" }
        ).expect(201);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("askedService");
    askedServiceId = response.body.askedService._id;
    console.log(askedServiceId)
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should get a askedService by id", async () => {
    console.log("askedServiceiddddd", askedServiceId);
    const response = await agent.get("/askedServices/" + askedServiceId).expect(200);

    //it will return only a single askedService json

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("askedService");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should update a askedService by id", async () => {
    const response = await agent
      .put("/askedServices/" + askedServiceId)
      .send({
        name: "Test AskedService  updaddted",
      })
      .expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("updatedAskedService");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should delete a askedService by id", async () => {
    const response = await agent.delete("/askedServices/" + askedServiceId).expect(200);

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("success");
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(response.body).toHaveProperty("message");
  });

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should logout a askedService", async () => {
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
    expect(response.body.message).toBe(message);
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
  it("Should not accept the id given to it ", async () => {
    const response = await agent.get("/askedServices/" + "1234567890").expect(400);

    checkError(response, "The id you gave is not a mongoID");
});

  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should not find the askedService", async () => {
    const response = await agent
      .get("/askedServices/" + "659fba2f1f253e0e1d5147dd")
      .expect(404);

    checkError(response, "AskedService not found");
  });

  //Small askedServicename
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should not create a askedService with invalid askedServicename", async () => {
    const response = await agent
      .post("/askedServices")
      .send({
        userId: "60b5c5b4c7a3c0b4e4f0f8c1",  // Replace with an actual User ObjectId
        categoryId: "65a9a3912f10d0a3fd7106cb",  // Replace with an actual Category ObjectId
        name: "Q",
        description: "I can help fix your computer issues in no time.",
        price: 50,
        position: {
            type: "Point",
            coordinates: [4.568749743547676,46.0841182620497]},
        status: "pending" })
      .expect(400);


    checkError(response, "Name must be 2 to 100 characters long");
  });

  //Long askedServicename
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should not create a askedService with invalid askedServicename", async () => {
    const response = await agent
      .post("/askedServices")
      .send({
        userId: "60b5c5b4c7a3c0b4e4f0f8c1",  // Replace with an actual User ObjectId
        categoryId: "65a9a3912f10d0a3fd7106cb",  // Replace with an actual Category ObjectId
        name: "Qfadpsifjio0dsjfiajsdfiidjwijdiwjdiwjdiwjdiwjdijwidjwidjiwjdiwjdiwjdiwjidjwidjwidjiwjdiwjdiwjdiwjjds9i0fjsda9ifjosifjoisajeoijfoidsajfoiejfoijoifjoeifjodijfoiejfoiejfoiejfoiejfoiejfoiejfoiejfoiejfoief",
        description: "I can help fix your computer issues in no time.",
        price: 50,
        position: {
            type: "Point",
            coordinates: [4.568749743547676,46.0841182620497]},
        status: "pending" })
      .expect(400);

    checkError(response, "Name must be 2 to 100 characters long");

  });

  //Not an email
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("Should not create a askedService with invalid email", async () => {
    const response = await agent
      .post("/askedServices")
      .send({
        userId: "60b5c5b4c7add3c0b2e4f0f8c1",  // Replace with an actual User ObjectId
        categoryId: "65a9a3912f10d0a3fd7106cb",  // Replace with an actual Category ObjectId
        name: "fokdijfio oifje oi",
        description: "I can help fix your computer issues in no time.",
        price: 50,
        position: {
            type: "Point",
            coordinates: [4.568749743547676,46.0841182620497]},
        status: "pending" })
      .expect(400);

    checkError(response, "userId must be a valid mongoId");
  });

});

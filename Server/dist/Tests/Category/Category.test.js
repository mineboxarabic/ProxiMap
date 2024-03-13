var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
import supertest from "supertest";
import { connectDB, disconnectDB } from "../database.js";
import application from "../../Application.js";
dotenv.config();
const randomEmail = Math.random().toString(36).substring(2, 15) + "@example.com";
let categoryId = "";
const agent = supertest.agent(application);
const category = {
    "name": "Test Category" + randomEmail,
    "description": "Test Category Description"
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    console.log("Connected to database");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield disconnectDB();
    console.log("Disconnected from database");
}));
describe("Persistent Session Testing", () => {
    it("Should login a User", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent
            .post("/login")
            .send({
            email: "mineboxarabic@gmail.com",
            password: "Zaqwe123",
        })
            .expect(200);
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
        expect(response.body).toHaveProperty("user");
    }));
    it("Should get all categorys", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.get("/categorys").expect(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it("Should create a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent
            .post("/categorys")
            .send(category).expect(201);
        expect(response.body).toHaveProperty("success");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("category");
        categoryId = response.body.category._id;
    }));
    it("Should get a category by id", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("categoryiddddd", categoryId);
        const response = yield agent.get("/categorys/" + categoryId).expect(200);
        //it will return only a single category json
        expect(response.body).toHaveProperty("success");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("category");
    }));
    it("Should update a category by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent
            .put("/categorys/" + categoryId)
            .send({
            name: "Test Category updated",
        })
            .expect(200);
        expect(response.body).toHaveProperty("success");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("updatedCategory");
    }));
    it("Should delete a category by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.delete("/categorys/" + categoryId).expect(200);
        expect(response.body).toHaveProperty("success");
        expect(response.body).toHaveProperty("message");
    }));
    it("Should logout a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.post("/logout").expect(200);
        expect(response.body).toHaveProperty("success");
        expect(response.body).toHaveProperty("message");
    }));
});
describe("Error Testing", () => {
    const checkError = (response, message) => {
        expect(response.body).toHaveProperty("ok");
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("status");
        if (message)
            expect(response.body.message).toBe(message);
    };
    it("Should login a User", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent
            .post("/login")
            .send({
            email: "mineboxarabic@gmail.com",
            password: "Zaqwe123",
        })
            .expect(200);
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
        expect(response.body).toHaveProperty("user");
    }));
    it("Should no accept the id given to it ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent.get("/categorys/" + "1234567890").expect(400);
        checkError(response, "The id you gave is not a mongoID");
    }));
    it("Should not find the category", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent
            .get("/categorys/" + "659fba2f1f253e0e1d5147dd")
            .expect(404);
        checkError(response, "Category not found");
    }));
    //Small categoryname
    it("Should not create a category with invalid categoryname", () => __awaiter(void 0, void 0, void 0, function* () {
        category.name = "j";
        const response = yield agent
            .post("/categorys")
            .send(category)
            .expect(400);
        checkError(response, "Name must be of 2 to 100 characters long");
    }));
    //Long categoryname
    it("Should not create a category with invalid categoryname", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield agent
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
    }));
});

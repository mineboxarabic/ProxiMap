var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
const url = "mongodb://localhost:27017"; // Replace with your MongoDB URL
const dbName = "ProxiMap";
const client = new MongoClient(url);
import USERS_DATA from './USERS_DATA.js';
import CATEGORIES_DATA from './CATEGORIES_DATA.js';
import SERVICES_DATA from './SERVICES_DATA.js';
const createUsers = (db, numberOfUsers) => __awaiter(void 0, void 0, void 0, function* () {
    let users = [];
    const Roles = ['Admin', 'User', 'Partner', 'Manager', 'Staff'];
    const usedUsernames = new Set(); // Keep track of used usernames
    const usedEmails = new Set(); // Keep track of used emails
    while (users.length < numberOfUsers) {
        let username = faker.internet.userName();
        let email = faker.internet.email();
        // Ensure both username and email are unique
        if (!usedUsernames.has(username) && !usedEmails.has(email)) {
            users.push({
                username: username,
                email: email,
                password: faker.internet.password(),
                role: Roles[Math.floor(Math.random() * Roles.length)],
                profile: {
                    address: {
                        street: faker.location.streetAddress(),
                        city: faker.location.city(),
                        state: faker.location.state(),
                        zip: faker.location.zipCode()
                    },
                    bio: faker.lorem.paragraph(),
                    profilePicture: faker.image.avatar() // This gives a more appropriate method for profile pictures
                },
                createdAt: faker.date.recent()
            });
            // Mark these as used
            usedUsernames.add(username);
            usedEmails.add(email);
        }
    }
    yield db.collection('users').insertMany(users); // Now we're sure we're inserting unique usernames and emails
});
const createCategories = (db, numberOfCategories) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = new Set(); // Switch to a Set for simplicity
    const maxAttempts = numberOfCategories * 2; // Just a safeguard against infinite loops
    let attempts = 0;
    while (categories.size < numberOfCategories && attempts < maxAttempts) {
        const ranodmChars = Math.random().toString(36).substring(7);
        const name = faker.commerce.department() + '-' + ranodmChars;
        if (!categories.has(name)) {
            categories.add(name);
        }
        attempts++;
    }
    // In the rare case we didn't get enough unique names, throw an error or handle it as you see fit
    if (categories.size < numberOfCategories) {
        console.error("Couldn't generate the required number of unique category names.");
        // Handle this situation, perhaps by notifying the user or attempting a different strategy
        return;
    }
    const categoriesArray = Array.from(categories).map(name => ({
        name: name,
        description: faker.lorem.sentence(),
    }));
    yield db.collection('categories').insertMany(categoriesArray);
});
/*
const serviceSchema = new mongoose.Schema({
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    name: String,
    description: String,
    price: Number,
    position: {
      type: { type: String,
        enum: ['Point'],default: 'Point' },
      coordinates: { type: [Number], default: [0, 0]}
     },
    range: { type: Number, default: 0 },
     
    availability: Boolean,
    ratings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }],
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },

  }); */
const createServices = (db, numberOfServices, users, categories) => __awaiter(void 0, void 0, void 0, function* () {
    let services = [];
    for (let i = 0; i < numberOfServices; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        console.log(user.username);
        console.log(category.name);
        services.push({
            partnerId: user._id,
            categoryId: category._id,
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            price: parseInt(faker.commerce.price()),
            position: {
                type: 'Point',
                // coordinates: [faker.location.longitude(), faker.location.latitude()]
                coordinates: [
                    faker.number.float({ min: -5.142, max: 9.561, precision: 0.001 }), // Longitude bound for France
                    faker.number.float({ min: 42.331, max: 51.089, precision: 0.001 })
                ]
            },
            range: faker.number.bigInt({ min: 1, max: 4999 }),
            availability: faker.datatype.boolean(),
            status: faker.helpers.arrayElement(['pending', 'accepted', 'rejected']),
            ratings: []
        });
    }
    yield db.collection('services').insertMany(services); // Make sure to await this operation
});
const createAskedServices = (db, numberOfServices, users, categories) => __awaiter(void 0, void 0, void 0, function* () {
    let services = [];
    for (let i = 0; i < numberOfServices; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        console.log(user.username);
        services.push({
            userId: user._id,
            categoryId: category._id,
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            price: parseInt(faker.commerce.price()),
            position: {
                type: 'Point',
                coordinates: [faker.number.float({ min: -5.142, max: 9.561, precision: 0.001 }), // Longitude bound for France
                    faker.number.float({ min: 42.331, max: 51.089, precision: 0.001 })]
            },
            status: faker.helpers.arrayElement(['pending', 'accepted', 'rejected']),
            date: faker.date.recent()
        });
    }
    yield db.collection('askedservices').insertMany(services); // Make sure to await this operation
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to MongoDB server");
            const db = client.db(dbName);
            // Clean up the users collection before inserting new fake users
            yield db.collection('users').deleteMany({});
            yield createUsers(db, 1000); // This now properly awaits the asynchronous operation
            yield db.collection('users').insertMany(USERS_DATA); // Make sure to await this operation
            // Clean up the categories collection before inserting new fake categories
            yield db.collection('categories').deleteMany({});
            yield db.collection('categories').insertMany(CATEGORIES_DATA);
            yield createCategories(db, 50); // This now properly awaits the asynchronous operation
            const users = yield db.collection('users').find().toArray();
            const categories = yield db.collection('categories').find().toArray();
            // Clean up the services collection before inserting new fake services
            yield db.collection('services').deleteMany({});
            yield db.collection('services').insertMany(SERVICES_DATA); // Make sure to await this operation
            yield createServices(db, 100, users, categories); // This now properly awaits the asynchronous operation
            // Clean up the askedServices collection before inserting new fake askedServices
            yield db.collection('askedservices').deleteMany({});
            // await db.collection('askedservices').insertMany(SERVICES_DATA); // Make sure to await this operation
            yield createAskedServices(db, 100, users, categories); // This now properly awaits the asynchronous operation
        }
        catch (e) {
            console.error("An error occurred:", e);
        }
        finally {
            yield client.close();
            console.log("MongoDB connection closed");
        }
    });
}
run().catch(console.error);

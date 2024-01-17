import { MongoClient } from 'mongodb';

const url = "mongodb://localhost:27017"; // Replace with your MongoDB URL
const dbName = "ProxiMap";
const collectionName = "services";

async function run() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        console.log("Connected to MongoDB server");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const services = await collection.find().toArray();

        // Process and update each service
        for (let service of services) {
            if (service.position && typeof service.position.lng === "number" && typeof service.position.lat === "number") {
                const updatedPosition = {
                    type: "Point",
                    coordinates: [service.position.lng, service.position.lat]
                };

                await collection.updateOne({ _id: service._id }, { $set: { position: updatedPosition } });
                console.log(`Updated service with _id: ${service._id}`);
            }
        }

        // Create a 2dsphere index on the 'position' field
        await collection.createIndex({ "position": "2dsphere" });
        console.log("2dsphere index created on 'position' field");

    } catch (e) {
        console.error("An error occurred:", e);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

run().catch(console.error);

import { MongoClient } from 'mongodb';

const url = "mongodb://localhost:27017"; // Replace with your MongoDB URL
const dbName = "ProxiMap";
const collectionName = "services";

async function run() {
    const client = new MongoClient(url);
    
    try {
        await client.connect();
        console.log("Connected to MongoDB server");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        //Create a look up pipeline stage
        const lookupStage = {
            $lookup: {
                from: "users",
                localField: "partnerId",
                foreignField: "_id",
                as: "partnerDetails",
            },
        };


        


    } catch (e) {
        console.error("An error occurred:", e);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

run().catch(console.error);

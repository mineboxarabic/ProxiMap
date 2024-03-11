import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017"; // Replace with your MongoDB URL
const dbName = "ProxiMap";
//const collectionName = "services";







async function run() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB server");

    const db = client.db(dbName);
    // @ts-expect-error TS(2304): Cannot find name 'collectionName'.
    const collection = db.collection(collectionName);

    const services = await collection.find({}).toArray();

    for (let i = 0; i < services.length; i++) {
      const service = services[i];

      const range = Math.floor(Math.random() * 1000) + 1;

      const updatedService = {
        ...service,
        range: range,
      };

      await collection.updateOne(
        { _id: service._id },
        { $set: updatedService }
      );
    }

    console.log("Done");
  } catch (e) {
    console.error("An error occurred:", e);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

run().catch(console.error);

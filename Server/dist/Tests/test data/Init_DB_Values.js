var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017"; // Replace with your MongoDB URL
const dbName = "ProxiMap";
//const collectionName = "services";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new MongoClient(url);
        try {
            yield client.connect();
            console.log("Connected to MongoDB server");
            const db = client.db(dbName);
            // @ts-expect-error TS(2304): Cannot find name 'collectionName'.
            const collection = db.collection(collectionName);
            const services = yield collection.find({}).toArray();
            for (let i = 0; i < services.length; i++) {
                const service = services[i];
                const range = Math.floor(Math.random() * 1000) + 1;
                const updatedService = Object.assign(Object.assign({}, service), { range: range });
                yield collection.updateOne({ _id: service._id }, { $set: updatedService });
            }
            console.log("Done");
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

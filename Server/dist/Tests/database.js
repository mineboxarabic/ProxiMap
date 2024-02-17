var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './Server/.env' });
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        yield mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    }
    catch (err) {
        console.error('Error connecting to database:', err);
        process.exit(1); // Exit the process with failure
    }
});
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.disconnect();
        console.log('Disconnected from database');
    }
    catch (err) {
        console.error('Error disconnecting from database:', err);
        process.exit(1);
    }
});
export { connectDB, disconnectDB };

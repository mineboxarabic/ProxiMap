// database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:'./Server/.env'});

const connectDB = async () => {
    try {
        // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database:', err);
        process.exit(1); // Exit the process with failure
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from database');
    } catch (err) {
        console.error('Error disconnecting from database:', err);
        process.exit(1);
    }
};

export { connectDB, disconnectDB };

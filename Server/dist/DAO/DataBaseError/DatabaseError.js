import { Error } from "mongoose";
// Custom error type for database operations
class DatabaseError extends Error {
    constructor(msg, error) {
        let message;
        if (error instanceof Error.ValidationError) {
            message = "Validation Error: " + error.message;
        }
        else if (error instanceof Error.CastError) {
            message = "Cast Error: " + error.message;
        }
        else if (error instanceof Error) {
            message = "Database Error: " + error.message;
        }
        else if (error.code === 11000) {
            message = "Dublicate key error: " + error.message;
        }
        else {
            message = "Unknown Database Error: " + error.message;
        }
        super(msg + " " + message);
    }
}
export default DatabaseError;

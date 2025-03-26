import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

let isConnected = false;

export const connectDB = async () => {

    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        const { connection } = await mongoose.connect(MONGODB_URI);
        isConnected = connection.readyState === 1;

        if (isConnected) {
            console.log("Successfully connected to MongoDB");
            return Promise.resolve(true);
        }

    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};
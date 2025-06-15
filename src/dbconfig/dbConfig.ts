import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the MONGO_URI environment variable.
 * @return {Promise<void>} - A promise that resolves when the connection is established.
 */
export async function connect(): Promise<void> {
    try {
        // Connect to the MongoDB database
        mongoose.connect(process.env.MONGO_URI!);

        // Get the connection object
        const connection = mongoose.connection;

        // Listen for events on the connection
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        // Handle errors on the connection
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running', err);
            process.exit();
        });

    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}

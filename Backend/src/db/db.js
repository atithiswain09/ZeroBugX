const mongoose = require("mongoose");

async function ConnectDB() {
    try {
        // 1. Check the environment variable first for early error detection
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL environment variable is not set.");
        }

        // 2. Use await directly for cleaner async handling
        await mongoose.connect(process.env.MONGODB_URL);
        
        console.log("Connected To DB Successfully!");

        
    } catch (err) {
        // 3. Log the error and THEN re-throw it so the calling function can catch it
        console.error("Database connection failed:", err.message);
        process.exit(1); 
    }
}

// Export the asynchronous function
module.exports = ConnectDB;